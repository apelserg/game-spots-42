// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Полная отрисовка
//===
APELSERG.CANVA.CourtRewrite = function () {
    
    var ctx = APELSERG.CONFIG.PROC.Ctx;

    //-- Поле (очистка)
    //--
    ctx.fillStyle = '#516A51';
    ctx.fillRect(0, 0, APELSERG.CONFIG.PROC.CanvaID.width, APELSERG.CONFIG.PROC.CanvaID.height);

    //-- Мячи
    //--
    for (var n = 0; n < APELSERG.CONFIG.PROC.Balls.length; n++) {
        var ball = APELSERG.CONFIG.PROC.Balls[n];
        APELSERG.CANVA.BallRewrite(ctx, ball);
    }
     
    //-- Стрелялки
    //--
    APELSERG.CANVA.ShooterRewrite(ctx,0);
    APELSERG.CANVA.ShooterRewrite(ctx,1);

    //-- Пауза
    //--
    if (APELSERG.CONFIG.PROC.GamePause && !APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("PAUSE"));
    }

    //-- Стоп
    //--
    if (APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("STOP"));
    }

    //-- Инфо
    //--
    APELSERG.CANVA.InfoRewrite(ctx);

    //-- Обратный отсчёт задаржки
    //--
    if (APELSERG.CONFIG.PROC.StartCnt > 0) {

        //ctx.font = (40).toString() + "px Arial"; //ctx.font = "30px Arial";
        ctx.font = "40px Arial"; //ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText(APELSERG.CONFIG.PROC.StartCnt.toString(), APELSERG.CONFIG.SET.CourtWidth / 2, APELSERG.CONFIG.SET.CourtHeight / 2 + 10);

        APELSERG.CONFIG.PROC.StartCnt--;
    }

    //-- Обратный отсчёт сообщения об ошибке
    //--
    if (APELSERG.CONFIG.PROC.ErrorCnt > 0) {

        //ctx.font = (30).toString() + "px Arial"; //ctx.font = "30px Arial";
        ctx.font = "30px Arial"; //ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(APELSERG.CONFIG.PROC.ErrorMsg, APELSERG.CONFIG.SET.CourtWidth / 2, APELSERG.CONFIG.SET.CourtHeight / 2 + 10);

        APELSERG.CONFIG.PROC.ErrorCnt--;
        if (APELSERG.CONFIG.PROC.ErrorCnt == 0) APELSERG.CONFIG.PROC.ErrorMsg = "";
    }

    //-- Бордюрная рамка (рисовать в конце)
    //--
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'gray'; //'silver';
    ctx.strokeRect(0, 0, APELSERG.CONFIG.SET.CourtWidth, APELSERG.CONFIG.SET.CourtHeight);
}

//===
// Мяч
//===
APELSERG.CANVA.BallRewrite = function (ctx, ball) {

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = ball.Color;

    ctx.beginPath();
    ctx.arc(ball.X, ball.Y, ball.Radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();

    ctx.font = ball.Radius.toString() + "px Arial"; //ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(ball.Point.toString(), ball.X, ball.Y);
}

//===
// Стрелялки
//===
APELSERG.CANVA.ShooterRewrite = function (ctx, shooterIdx) {
    
    var shooter = APELSERG.CONFIG.PROC.Shooters[shooterIdx];

    if (shooter.Device > 0) {

        ctx.lineWidth = 3;
        ctx.strokeStyle = shooter.Color;

        if (shooter.MissCnt > 0) {
            shooter.MissCnt--;
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'red';
        }
        if (shooter.HitCnt > 0) {
            shooter.HitCnt--;
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'lightgreen';
        }
        
        ctx.beginPath();
        ctx.arc(shooter.X, shooter.Y, 10, 0, 2 * Math.PI, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(shooter.X, shooter.Y, 30, 0, 2 * Math.PI, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(shooter.X, shooter.Y, 50, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}

//===
// Текст
//===
APELSERG.CANVA.TextRewrite = function (ctx, strText) {

    //var fontHight = 20; //APELSERG.CONFIG.SET.BallSize;

    //if (fontHight < 20) fontHight = 20;
    //if (fontHight > 30) fontHight = 30;

    //ctx.font = fontHight.toString() + "px Arial"; //ctx.font = "30px Arial";
    ctx.font = "30px Arial"; //ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(strText, APELSERG.CONFIG.PROC.CanvaID.width / 2, APELSERG.CONFIG.PROC.CanvaID.height / 2);
}

//===
// Инфо
//===
APELSERG.CANVA.InfoRewrite = function (ctx) {

    //var fontHight = 20; //APELSERG.CONFIG.SET.BallSize;

    //if (fontHight < 20) fontHight = 20;
    //if (fontHight > 30) fontHight = 30;

    var strText = APELSERG.CONFIG.PROC.Shooters[0].Name + " : " +  APELSERG.CONFIG.PROC.Shooters[0].Points.toString() +
    "   |   " +
    APELSERG.CONFIG.PROC.Shooters[1].Name +  " : " +  APELSERG.CONFIG.PROC.Shooters[1].Points.toString();

    //ctx.font = fontHight.toString() + "px Arial";
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(strText, APELSERG.CONFIG.PROC.CanvaID.width / 2, APELSERG.CONFIG.PROC.CanvaID.height - 10);
}
