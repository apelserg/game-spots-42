// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

// Глобальные переменные
//

var APELSERG = {};

APELSERG.MAIN = {};
APELSERG.MODEL = {};
APELSERG.CANVA = {};
APELSERG.UI = {};
APELSERG.LANG = {};
APELSERG.CONFIG = {};
APELSERG.CONFIG.KEY = {};
APELSERG.CONFIG.SET = {};
APELSERG.CONFIG.PROC = {};
APELSERG.CONFIG.RESULT = {};

//===
// старт программы (начальная прорисовка)
//===
APELSERG.MAIN.OnLoad = function (initFirst) {

    // определить место загрузки
    //
    window.location.protocol == "file:" ? APELSERG.CONFIG.PROC.LoadFromWeb = false : APELSERG.CONFIG.PROC.LoadFromWeb = true;

    // инициализация данных из localeStorage
    //
    APELSERG.CONFIG.GetConfigOnLoad();
    APELSERG.CONFIG.GetResultOnLoad();

    // звук
    //
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        APELSERG.CONFIG.PROC.AudioCtx = new window.AudioContext();
    }
    catch (e) {
        APELSERG.CONFIG.PROC.AudioCtx = null;
    }

    // канва
    //
    APELSERG.CONFIG.PROC.CanvaID = document.getElementById('APELSERG_CanvasSpots');
    APELSERG.CONFIG.PROC.Ctx = APELSERG.CONFIG.PROC.CanvaID.getContext('2d');
    APELSERG.CONFIG.PROC.CanvaID.width = APELSERG.CONFIG.SET.CourtWidth;
    APELSERG.CONFIG.PROC.CanvaID.height = APELSERG.CONFIG.SET.CourtHeight;
    APELSERG.CONFIG.PROC.CanvaID.style.cursor = "crosshair"; // "none"; // "move"; //"crosshair";

    // инициализация базовых объектов
    //
    APELSERG.CONFIG.PROC.Shooters[0] = new APELSERG.MODEL.Shooter(0);
    APELSERG.CONFIG.PROC.Shooters[1] = new APELSERG.MODEL.Shooter(1);
    APELSERG.MODEL.SetShooterOnStart(0);
    APELSERG.MODEL.SetShooterOnStart(1);

    APELSERG.MAIN.Stop(); // отрисовка наименований кнопок

    // только при начальной инициализации
    //
    if (initFirst) {

        APELSERG.MAIN.Animation(); // пуск анимации

        //===
        // движение мыши
        //===
        APELSERG.CONFIG.PROC.CanvaID.addEventListener('mousemove', function (event) {

            for (var shooterNum = 0; shooterNum < 2; shooterNum++) {

                if (!APELSERG.CONFIG.PROC.GamePause && APELSERG.CONFIG.PROC.Shooters[shooterNum].Device == 3) {

                    APELSERG.CONFIG.PROC.Shooters[shooterNum].X = event.clientX - APELSERG.CONFIG.PROC.CanvaID.offsetLeft;
                    APELSERG.CONFIG.PROC.Shooters[shooterNum].Y = event.clientY - APELSERG.CONFIG.PROC.CanvaID.offsetTop;
                }
            }
        });

        //===
        // клик мыши
        //===
        APELSERG.CONFIG.PROC.CanvaID.addEventListener('click', function (event) {

            for (var shooterNum = 0; shooterNum < 2; shooterNum++) {

                if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GamePause && APELSERG.CONFIG.PROC.Shooters[shooterNum].Device == 3) {

                    APELSERG.CONFIG.PROC.Shooters[shooterNum].ShootX = event.clientX - APELSERG.CONFIG.PROC.CanvaID.offsetLeft;
                    APELSERG.CONFIG.PROC.Shooters[shooterNum].ShootY = event.clientY - APELSERG.CONFIG.PROC.CanvaID.offsetTop;
                    return;
                }
            }
        });

        //===
        // Двойной клик мыши
        //===
        APELSERG.CONFIG.PROC.CanvaID.addEventListener('dblclick', function (event) {
            if (APELSERG.CONFIG.PROC.GameStop) APELSERG.MAIN.Start();
            if (APELSERG.CONFIG.PROC.GamePause) APELSERG.MAIN.Pause();
        });
    }
}

//===
// Обработка нажатий клавиш
//===
window.addEventListener('keydown', function (event) {

    // предотвратить срабатывание при "всплытии" клика (если во время игры щёлкнули по кнопке)
    //
    document.getElementById("APELSERG_InputSettings").blur();
    document.getElementById("APELSERG_InputPoints").blur();
    document.getElementById("APELSERG_InputHelp").blur();
    document.getElementById("APELSERG_InputStartStop").blur();

    // пробел [SPACE]
    //
    if (event.keyCode == APELSERG.CONFIG.KEY.Space && APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.MAIN.Start();
        return;
    }
    if (event.keyCode == APELSERG.CONFIG.KEY.Space && APELSERG.CONFIG.PROC.GamePause) {
        APELSERG.MAIN.Pause();
        return;
    }

    // пауза [P]
    //
    if (event.keyCode == APELSERG.CONFIG.KEY.Pause) {
        APELSERG.MAIN.Pause();
        return;
    }

    // звук [S]
    //
    if (event.keyCode == APELSERG.CONFIG.KEY.Sound) {
        APELSERG.CONFIG.SET.OnSound = !APELSERG.CONFIG.SET.OnSound;
        return;
    }

    // стрелки
    //
    for (var shooterNum = 0; shooterNum < 2; shooterNum++) {

        if (!APELSERG.CONFIG.PROC.GamePause && APELSERG.CONFIG.PROC.Shooters[shooterNum].Device == 1) {

            var shooter = APELSERG.CONFIG.PROC.Shooters[shooterNum];

            // пробел
            //
            if (event.keyCode == APELSERG.CONFIG.KEY.Space) {

                shooter.ShootX = shooter.X;
                shooter.ShootY = shooter.Y;
                return;
            }

            if (event.keyCode == APELSERG.CONFIG.KEY.RightUp) {

                if (shooter.Y > 0) shooter.Y -= shooter.MoveY;
                return;
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightDown) {

                if (shooter.Y < APELSERG.CONFIG.SET.CourtHeight) shooter.Y += shooter.MoveY;
                return;
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightForward) {

                if (shooter.X > 0) shooter.X -= shooter.MoveX;
                return;
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightBack) {

                if (shooter.X < APELSERG.CONFIG.SET.CourtWidth) shooter.X += shooter.MoveX;
                return;
            }
        }
    }
});

//===
// Старт
//===
APELSERG.MAIN.Start = function () {

    // старт
    //
    if (APELSERG.CONFIG.PROC.GameStop) {

        // закрыть окна (если открыты - должны закрыться)
        //
        if (APELSERG.CONFIG.PROC.UiSettings) APELSERG.UI.ShowSettings();
        if (APELSERG.CONFIG.PROC.UiPoints) APELSERG.UI.ShowPoints();
        if (APELSERG.CONFIG.PROC.UiHelp) APELSERG.UI.ShowHelp();

        // кнопки
        //
        document.getElementById('APELSERG_InputSettings').value = '-';
        document.getElementById('APELSERG_InputPoints').value = '-';
        document.getElementById('APELSERG_InputHelp').value = '-';
        document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('STOP');
        document.getElementById("APELSERG_InputStartStop").blur(); // здесь надо

        // инициализация
        //
        APELSERG.CONFIG.PROC.GameStop = false;
        APELSERG.CONFIG.PROC.GamePause = false;
        APELSERG.CONFIG.PROC.CurrTime = 0;
        APELSERG.CONFIG.PROC.StartCnt = APELSERG.CONFIG.SET.StartCnt; // задержка старта

        APELSERG.CONFIG.PROC.Balls = APELSERG.MODEL.GetBalls(); // новый набор шаров
        APELSERG.MODEL.SetShooterOnStart(0); // установка стрелков
        APELSERG.MODEL.SetShooterOnStart(1);
    }
    else {
        // пауза
        //
        if (APELSERG.CONFIG.PROC.GamePause) {
            APELSERG.MAIN.Pause();
        }
    }
}
//===
// Стоп
//===
APELSERG.MAIN.Stop = function () {

    document.getElementById('APELSERG_InputSettings').value = APELSERG.LANG.GetText('CONFIG');
    document.getElementById('APELSERG_InputPoints').value = APELSERG.LANG.GetText('SCORE');
    document.getElementById('APELSERG_InputHelp').value = APELSERG.LANG.GetText('HELP');
    document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('START');

    APELSERG.CONFIG.PROC.GameStop = true;
}

//===
// Старт/Стоп/Продолжить (для кнопки)
//===
APELSERG.MAIN.StartStopContinue = function () {
    if (APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.MAIN.Start();
    }
    else {
        if (APELSERG.CONFIG.PROC.GamePause) {
            APELSERG.MAIN.Pause();
        }
        else {
            APELSERG.MAIN.Stop();
        }
    }
}

//===
// Пауза
//===
APELSERG.MAIN.Pause = function () {
    if (!APELSERG.CONFIG.PROC.GameStop) {
        // снять паузу
        //
        if (APELSERG.CONFIG.PROC.GamePause) {
            document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('STOP');
            APELSERG.CONFIG.PROC.GamePause = false;
        }
        else {
            // встать на паузу
            //
            document.getElementById('APELSERG_InputStartStop').value = APELSERG.LANG.GetText('CONTINUE');
            APELSERG.CONFIG.PROC.GamePause = true;
        }
    }
}

//===
// Рабочий цикл анимации
//===
APELSERG.MAIN.Animation = function () {

    // определить время между циклами
    //
    var prevTime = APELSERG.CONFIG.PROC.CurrTime;

    APELSERG.CONFIG.PROC.CurrTime = new Date().getTime();

    var timeDelta = APELSERG.CONFIG.PROC.CurrTime - prevTime;

    if (timeDelta > 30) timeDelta = 30; // попробовать "скорректировать" лаг (но это не всегда эффективно)

    // перемещение шаров
    //
    if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GamePause) {

        // обратный отсчёт перед стартом
        //
        if (APELSERG.CONFIG.PROC.StartCnt == 0) {

            // определить скорость шарика для текущего цикла
            //
            var speedBallX = timeDelta / APELSERG.CONFIG.SET.Speed[APELSERG.CONFIG.SET.SpeedSelector];
            var speedBallY = speedBallX;

            // установить скорость шаров
            //
            for (var n = 0; n < APELSERG.CONFIG.PROC.Balls.length; n++) {

                var ball = APELSERG.CONFIG.PROC.Balls[n];

                if (ball.DirX > 0) ball.DirX = speedBallX;
                else ball.DirX = -speedBallX;

                if (ball.DirY > 0) ball.DirY = speedBallY;
                else ball.DirY = -speedBallY;
            }

            // пересчитать положение шаров
            //
            APELSERG.MODEL.UpdateBall(); // окончание игры срабатывает здесь

            // играет комп
            //
            APELSERG.MODEL.CompGame(0);
            APELSERG.MODEL.CompGame(1);

        }
    }

    // звук (здесь, чтобы при остановке звук смог прекратиться)
    //
    APELSERG.MODEL.Sound(0);
    APELSERG.MODEL.Sound(1);

    // отрисовка (при паузе и остановке цикл отрисовки не прекращается)
    //
    APELSERG.CANVA.CourtRewrite();

    // следующий цикл
    //
    window.requestAnimationFrame(function () {
        APELSERG.MAIN.Animation();
    });
}
