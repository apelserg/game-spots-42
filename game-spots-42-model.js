// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Базовый объект - стрелок
//===
APELSERG.MODEL.Shooter = function (shooterNum) {

    this.Device = APELSERG.CONFIG.SET.UserDevice[shooterNum];

    if (this.Device == 10) this.Name = "COMP";
    else if (this.Device == 11) this.Name = "COMP Exp";
    else this.Name = APELSERG.CONFIG.SET.UserName[shooterNum];

    if (shooterNum == 0) this.Color = "white";
    else this.Color = "cyan";

    this.Points = 0;
    this.X = 0;
    this.Y = 0;
    this.MoveX = 10; // шаг перемещения клавиатуры
    this.MoveY = 10;
    this.ShootX = -999;
    this.ShootY = -999;
    this.HitCnt = 0;
    this.MissCnt = 0;
    this.CompCnt = 0;
    this.AudioCnt = 0;
    this.AudioTone = 0;
    this.AudioOsc;
}

//===
// Установка стрелка на начальной позиции
//===
APELSERG.MODEL.SetShooterOnStart = function (shooterNum) {

    var shooterX = (APELSERG.CONFIG.SET.CourtWidth / 2) - 100;
    var shooterY = APELSERG.CONFIG.SET.CourtHeight / 2;

    if (shooterNum == 1) {
        shooterX = (APELSERG.CONFIG.SET.CourtWidth / 2) + 100;
    }

    APELSERG.CONFIG.PROC.Shooters[shooterNum].Points = 0;
    APELSERG.CONFIG.PROC.Shooters[shooterNum].X = shooterX;
    APELSERG.CONFIG.PROC.Shooters[shooterNum].Y = shooterY;
}

//===
// Базовый объект - мяч
//===
APELSERG.MODEL.Ball = function (ballX, ballY, dirX, dirY, upX, upY, ballPoint, ballColor) {
    this.X = ballX;
    this.Y = ballY;
    this.Radius = APELSERG.CONFIG.SET.BallSize / 2;
    this.DirX = dirX; //-- направление и скорость по X
    this.DirY = dirY; //-- направление и скорость по Y
    this.DirXSpeedUp = upX; //-- ускорение по X
    this.DirYSpeedUp = upY; //-- ускорение по Y
    this.Point = ballPoint;
    this.Color = ballColor;
}

//===
// Новый мяч
//===
APELSERG.MODEL.GetBall = function () {

    var ballX = APELSERG.CONFIG.PROC.CanvaID.width / 2;
    var ballY = APELSERG.CONFIG.PROC.CanvaID.height / 2;

    var dirX = APELSERG.MODEL.GetRandomDir();
    var dirY = APELSERG.MODEL.GetRandomDir();

    var upX = APELSERG.MODEL.GetRandomSpeedUp();
    var upY = APELSERG.MODEL.GetRandomSpeedUp();
    var ballColor = APELSERG.MODEL.GetColor();
    var ballPoint = APELSERG.MODEL.GetRandomNumber(APELSERG.CONFIG.SET.BallNum);

    return new APELSERG.MODEL.Ball(ballX, ballY, dirX, dirY, upX, upY, ballPoint, ballColor);
}

//===
// Новый набор мячей
//===
APELSERG.MODEL.GetBalls = function () {
    var balls = [];
    for(var n = 0; n < APELSERG.CONFIG.SET.BallNum; n++) {
        balls.push(APELSERG.MODEL.GetBall());
    }
    return balls;
}

//===
// Cлучайное целое число в диапазоне от 0 до max
//===
APELSERG.MODEL.GetRandomNumber = function (max) {

    if (max < 100) return Math.round(Math.random() * 100) % max;
    else return Math.round(Math.random() * max);
}

//===
// Случайное направление
//===
APELSERG.MODEL.GetRandomDir = function () {
    if (Math.round(Math.random() * 10) % 2 == 0) return 1;
    else return -1;
}

//===
// Случайное ускорение
//===
APELSERG.MODEL.GetRandomSpeedUp = function () {
    return (APELSERG.CONFIG.SET.SpeedSelector + 2) * Math.random() * APELSERG.MODEL.GetRandomDir();
}

//===
// Случайный цвет из списка
//===
APELSERG.MODEL.GetColor = function () {
    var colors = ['#CC3300', '#FF9900', '#660033', '#009933', '#3399FF', '#0033CC', '#9900CC'];
    return colors[APELSERG.MODEL.GetRandomNumber(colors.length)];
}

//===
// Переместить мяч
//===
APELSERG.MODEL.UpdateBall = function () {

    if (APELSERG.CONFIG.PROC.GameStop || APELSERG.CONFIG.PROC.GamePause)
        return;

    //-- сперва проверка промахов и попаданий
    //--
    for (var shooterIdx = 0; shooterIdx < APELSERG.CONFIG.PROC.Shooters.length; shooterIdx++) {

        var shooter = APELSERG.CONFIG.PROC.Shooters[shooterIdx];

        if (shooter.ShootX > 0) { // был выстрел

            for (var n = 0; n < APELSERG.CONFIG.PROC.Balls.length; n++) {

                var ball = APELSERG.CONFIG.PROC.Balls[n];

                //-- попадание
                //--
                if ((ball.X >= (shooter.ShootX - ball.Radius))
                    && (ball.X <= (shooter.ShootX + ball.Radius))
                    && (ball.Y >= (shooter.ShootY - ball.Radius))
                    && (ball.Y <= (shooter.ShootY + ball.Radius))) {

                    APELSERG.CONFIG.PROC.Balls.splice(n, 1); // удалить мяч

                    shooter.HitCnt = APELSERG.CONFIG.SET.RedCnt;
                    shooter.ShootX = -999;
                    shooter.ShootY = -999;

                    shooter.Points +=  Math.round((APELSERG.CONFIG.SET.SpeedSelector * 3) + (100 - APELSERG.CONFIG.SET.BallSize)) + ball.Point;

                    // звук
                    //
                    if (shooter.AudioCnt == 0) {
                        shooter.AudioCnt = APELSERG.CONFIG.SET.AudioCnt;
                        shooter.AudioTone = APELSERG.CONFIG.SET.AudioToneShooter;
                    }

                    break; //--  за раз удаляется только один мяч
                }
            }

            //-- промах
            //--
            if (shooter.ShootX > 0) {

                shooter.MissCnt = APELSERG.CONFIG.SET.RedCnt;
                shooter.ShootX = -999;
                shooter.ShootY = -999;

                shooter.Points -= Math.round((4 - APELSERG.CONFIG.SET.SpeedSelector) + (APELSERG.CONFIG.SET.BallSize / 5));

                // звук
                //
                if (shooter.AudioCnt == 0) {
                    shooter.AudioCnt = APELSERG.CONFIG.SET.AudioCnt;
                    shooter.AudioTone = APELSERG.CONFIG.SET.AudioToneRed;
                }
            }
        }
    }

    //-- движение мяча
    //--
    for (var n = 0; n < APELSERG.CONFIG.PROC.Balls.length; n++) {

        var ball = APELSERG.CONFIG.PROC.Balls[n];

        if (ball.X < APELSERG.CONFIG.PROC.CanvaID.width / 2) {

            //--  Отскок от левой стороны корта
            //--
            if (ball.X <= ball.Radius) {
                ball.X = ball.Radius;
                ball.DirX *= -1;

                ball.DirYSpeedUp = APELSERG.MODEL.GetRandomSpeedUp(); //-- ускорение по Y
                ball.DirY *= APELSERG.MODEL.GetRandomDir();
            }
        }
        else {
            //--  Отскок от правой стороны корта
            //--
            if (ball.X >= (APELSERG.CONFIG.PROC.CanvaID.width - ball.Radius)) {
                ball.X = APELSERG.CONFIG.PROC.CanvaID.width - ball.Radius;
                ball.DirX *= -1;

                ball.DirYSpeedUp = APELSERG.MODEL.GetRandomSpeedUp(); //-- ускорение по Y
                ball.DirY *= APELSERG.MODEL.GetRandomDir();
            }
        }

        if (ball.Y < APELSERG.CONFIG.PROC.CanvaID.height / 2) {

            //--  Отскок от верха корта
            //--
            if (ball.Y <= ball.Radius) {
                ball.Y = ball.Radius;
                ball.DirY *= -1;

                ball.DirXSpeedUp = APELSERG.MODEL.GetRandomSpeedUp(); //-- ускорение по X
                ball.DirX *= APELSERG.MODEL.GetRandomDir();
            }
        }
        else {

            //--  Отскок от низа корта
            //--
            if (ball.Y >= (APELSERG.CONFIG.PROC.CanvaID.height - ball.Radius)) {

                ball.Y = APELSERG.CONFIG.PROC.CanvaID.height - ball.Radius;
                ball.DirY *= -1;

                ball.DirXSpeedUp = APELSERG.MODEL.GetRandomSpeedUp(); //-- ускорение по X
                ball.DirX *= APELSERG.MODEL.GetRandomDir();
            }
        }

        //-- движение мяча
        //--
        if (ball.DirX > 0) {
            ball.X += ball.DirX + ball.DirXSpeedUp;
        }
        else {
            ball.X += ball.DirX - ball.DirXSpeedUp;
        }

        if (ball.DirY > 0) {
            ball.Y += ball.DirY + ball.DirYSpeedUp;
        }
        else {
            ball.Y += ball.DirY - ball.DirYSpeedUp;
        }
    }

    //-- игра завершена (если не осталось мячей)
    //--
    if (APELSERG.CONFIG.PROC.Balls.length == 0) {

        APELSERG.MAIN.Stop();
        APELSERG.CONFIG.SetResult();
    }
}

//===
// Звук
//===
APELSERG.MODEL.Sound = function (shooterNum) {

    if (APELSERG.CONFIG.PROC.Shooters[shooterNum].AudioCnt == 0)
        return;

    if (!APELSERG.CONFIG.SET.OnSound)
        return;

    if (APELSERG.CONFIG.PROC.AudioCtx == null)
        return;

    var shooter = APELSERG.CONFIG.PROC.Shooters[shooterNum];

    if (shooter.AudioCnt == APELSERG.CONFIG.SET.AudioCnt) {

        shooter.AudioOsc = APELSERG.CONFIG.PROC.AudioCtx.createOscillator();
        shooter.AudioOsc.frequency.value = shooter.AudioTone;
        shooter.AudioOsc.connect(APELSERG.CONFIG.PROC.AudioCtx.destination);
        shooter.AudioOsc.start();

    }
    if (shooter.AudioCnt == 1) {
        shooter.AudioOsc.stop();
    }

    shooter.AudioCnt--;
}

//===
// Играет комп
//===
APELSERG.MODEL.CompGame = function (shooterNum) {

    if (APELSERG.CONFIG.PROC.Shooters[shooterNum].Device < 10)
        return;

    var shooter = APELSERG.CONFIG.PROC.Shooters[shooterNum];

    if (shooter.CompCnt > 0) shooter.CompCnt--;

    var distanceX = 10000.0;
    var distanceY = 10000.0;
    var ballPoint = -999;

    var distanceXCurr = 0.0;
    var distanceYCurr = 0.0;

    for (var n = 0; n < APELSERG.CONFIG.PROC.Balls.length; n++) {

        var ball = APELSERG.CONFIG.PROC.Balls[n];

        distanceXCurr = shooter.X - ball.X;
        distanceYCurr = shooter.Y - ball.Y;

        // Выстрел
        //
        if (shooter.CompCnt == 0
            && Math.abs(distanceXCurr) < APELSERG.CONFIG.SET.BallSize / 2
            && Math.abs(distanceYCurr) < APELSERG.CONFIG.SET.BallSize / 2) {

            shooter.ShootX = shooter.X;
            shooter.ShootY = shooter.Y;

            // после попадания задержка на стрельбу (чтобы можно было играть человеку)
            //
            if (shooter.Device == 10) shooter.CompCnt = 200;
            else shooter.CompCnt = 100;
        }

        if (shooter.Device == 10) {
            if (Math.abs(distanceXCurr) < Math.abs(distanceX)) distanceX = distanceXCurr;
            if (Math.abs(distanceYCurr) < Math.abs(distanceY)) distanceY = distanceYCurr;
        }
        else { // в сторону больших очков
            if (ballPoint < ball.Point) {
                distanceX = distanceXCurr;
                distanceY = distanceYCurr;
                ballPoint = ball.Point;
            }
        }
    }

    var addMove = 2 + shooterNum; // shooterNum - защита от слипаний
    if (shooter.Device == 10) addMove = 1 + shooterNum;  // shooterNum - защита от слипаний

    if (distanceX > 0) shooter.X -= addMove;
    else shooter.X += addMove;

    if (distanceY > 0) shooter.Y -= addMove;
    else shooter.Y += addMove;
}