// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

APELSERG.CONFIG.SET.Version = "0-1-0"
APELSERG.CONFIG.SET.LocalStorageName = "APELSERG-Spots42";

APELSERG.CONFIG.SET.CourtWidth = 400; // ширина корта
APELSERG.CONFIG.SET.CourtHeight = 400; // высота корта

APELSERG.CONFIG.SET.BallSize = 80; // размер шарика (в пикселях)
APELSERG.CONFIG.SET.BallNum = 10; // количество шаров

APELSERG.CONFIG.SET.StartCnt = 50; // задержка подачи (100 ~ 1.3 секунды)
APELSERG.CONFIG.SET.RedCnt = 20; // число циклов красной/белой стрелялки при промахе/попадании
APELSERG.CONFIG.SET.ErrorCnt = 100; // число циклов сообщения об ошибке

APELSERG.CONFIG.SET.AudioCnt = 3; // число циклов звука
APELSERG.CONFIG.SET.AudioToneRed = 1000; // частота герцы
APELSERG.CONFIG.SET.AudioToneShooter = 500;

APELSERG.CONFIG.SET.Speed = [6.0, 5.0, 4.0, 3.0]; // делитель от 3.0 до 6.0 (от 2 до 6 px за ~13-14 мс)
APELSERG.CONFIG.SET.SpeedSelector = 1;

APELSERG.CONFIG.SET.UserName = ["Left", "Right"]; // Только для new Shooter - далее значение хранится в объекте
APELSERG.CONFIG.SET.UserDevice = [10, 3]; // 0 - нет, 1 - клава, 3 - мышь, 10 - комп, 11 - комп(эксперт)

APELSERG.CONFIG.SET.Lang = "EN"; // RU, EN
APELSERG.CONFIG.SET.OnSound = false; // вкл/выкл звук (срабатывает по [S])

APELSERG.CONFIG.KEY.Space = 32;
APELSERG.CONFIG.KEY.Pause = 80;
APELSERG.CONFIG.KEY.Sound = 83;

APELSERG.CONFIG.KEY.RightUp = 38; // 8
APELSERG.CONFIG.KEY.RightDown = 40; // 2
APELSERG.CONFIG.KEY.RightForward = 37; // 4
APELSERG.CONFIG.KEY.RightBack = 39; // 6

APELSERG.CONFIG.PROC.Balls = [];
APELSERG.CONFIG.PROC.Shooters = [{}, {}];

APELSERG.CONFIG.PROC.GameStop = true;
APELSERG.CONFIG.PROC.GamePause = false;

APELSERG.CONFIG.PROC.CurrTime = 0;

APELSERG.CONFIG.PROC.StartCnt = 0;  // в начале партии устанавливается = SET.StartCnt
APELSERG.CONFIG.PROC.ErrorCnt = 0; // при ошибке устанавливается SET.ErrorCnt
APELSERG.CONFIG.PROC.ErrorMsg = ""; // устанавливается при ошибке

APELSERG.CONFIG.PROC.UiSettings = false; // для показа конфигурации
APELSERG.CONFIG.PROC.UiPoints = false; // для показа очков
APELSERG.CONFIG.PROC.UiHelp = false; // для показа помощи

APELSERG.CONFIG.PROC.LoadFromWeb = false; // HTML загружен с сети или локального диска (надо для сохранения результатов и конфигурации)

APELSERG.CONFIG.PROC.CanvaID;
APELSERG.CONFIG.PROC.Ctx;

APELSERG.CONFIG.PROC.AudioCtx = null;
APELSERG.CONFIG.PROC.AudioOsc;

APELSERG.CONFIG.RESULT.Best = []; // 10 лучших
APELSERG.CONFIG.RESULT.Last = []; // 20 последних парных

//===
// Получить имя хранения конфигурации
//===
APELSERG.CONFIG.GetLocalStorageConfigName = function () {
    return APELSERG.CONFIG.SET.LocalStorageName + "-Config-" + APELSERG.CONFIG.SET.Version;
}

//===
// Получить имя хранения результатов
//===
APELSERG.CONFIG.GetLocalStorageResultName = function () {
    return APELSERG.CONFIG.SET.LocalStorageName + "-Results";
}

//===
// Получить результаты
//===
APELSERG.CONFIG.GetResultOnLoad = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var resultName = APELSERG.CONFIG.GetLocalStorageResultName();

        //-- восстановить результаты из хранилища
        //--
        if (localStorage[resultName] !== undefined) {

            APELSERG.CONFIG.RESULT = JSON.parse(localStorage[resultName]);
        }
    }
}

//===
// Получить конфигурацию
//===
APELSERG.CONFIG.GetConfigOnLoad = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

        //-- восстановить конфигурацию из хранилища
        //--
        if (localStorage[configName] !== undefined) {
            APELSERG.CONFIG.SET = JSON.parse(localStorage[configName]);
        }
    }
}

//===
// Сохранить результат
//===
APELSERG.CONFIG.SetResult = function () {

    var dateCurrent = new Date();
    var dateCurrentStr = dateCurrent.toJSON().substring(0, 10);

    // 20 последних результатов
    //
    var resultLast = {};
    resultLast.Date = dateCurrentStr;

    if (APELSERG.CONFIG.PROC.Shooters[0].Device > 0 && APELSERG.CONFIG.PROC.Shooters[1].Device > 0) {

        if(APELSERG.CONFIG.PROC.Shooters[0].Points > APELSERG.CONFIG.PROC.Shooters[1].Points) {

            resultLast.NameWin = APELSERG.CONFIG.PROC.Shooters[0].Name;
            resultLast.PointsWin = APELSERG.CONFIG.PROC.Shooters[0].Points;
            resultLast.NameLost = APELSERG.CONFIG.PROC.Shooters[1].Name;;
            resultLast.PointsLost = APELSERG.CONFIG.PROC.Shooters[1].Points;
        }
        else {
            resultLast.NameWin = APELSERG.CONFIG.PROC.Shooters[1].Name;
            resultLast.PointsWin = APELSERG.CONFIG.PROC.Shooters[1].Points;
            resultLast.NameLost = APELSERG.CONFIG.PROC.Shooters[0].Name;;
            resultLast.PointsLost = APELSERG.CONFIG.PROC.Shooters[0].Points;
        }

        APELSERG.CONFIG.RESULT.Last.unshift(resultLast); //-- вставить в начало
        if (APELSERG.CONFIG.RESULT.Last.length > 20) {
            APELSERG.CONFIG.RESULT.Last.pop(); //-- удалить с конца
        }
    }

    // 10 лучших результатов
    //

    // Добавить последние результаты
    //
    for (var n = 0; n < APELSERG.CONFIG.PROC.Shooters.length; n++) {
        if (APELSERG.CONFIG.PROC.Shooters[n].Points > 0) {

            var resultBest = {};

            resultBest.Name = APELSERG.CONFIG.PROC.Shooters[n].Name;
            resultBest.Points = APELSERG.CONFIG.PROC.Shooters[n].Points;
            resultBest.Date = dateCurrentStr;

            APELSERG.CONFIG.RESULT.Best.push(resultBest);
        }
    }

    // Оставить 10 лучших
    //
    var topBest = [];
    var cntBest = 0;

    while (true) {
        var maxValue = 0;
        var maxIdx = -1;
        for (var n in APELSERG.CONFIG.RESULT.Best) {
            if (APELSERG.CONFIG.RESULT.Best[n] !== undefined) {
                if (APELSERG.CONFIG.RESULT.Best[n].Points >= maxValue) {
                    maxValue = APELSERG.CONFIG.RESULT.Best[n].Points;
                    maxIdx = n;
                }
            }
        }
        if (maxIdx >= 0) {
            topBest.push(APELSERG.CONFIG.RESULT.Best[maxIdx]);
            APELSERG.CONFIG.RESULT.Best.splice(maxIdx, 1);
            cntBest++;
        }
        if (cntBest >= 10 || maxIdx < 0) {
            break;
        }
    }

    APELSERG.CONFIG.RESULT.Best = topBest;

    // сохранить в localStorage
    //
    if (APELSERG.CONFIG.PROC.LoadFromWeb) {
        var resultName = APELSERG.CONFIG.GetLocalStorageResultName();
        localStorage[resultName] = JSON.stringify(APELSERG.CONFIG.RESULT);
    }
}

//===
// Сброс результата
//===
APELSERG.CONFIG.ResetResult = function () {

    var resultName = APELSERG.CONFIG.GetLocalStorageResultName();

    localStorage.removeItem(resultName);

    APELSERG.CONFIG.RESULT.Last = [];
    APELSERG.CONFIG.RESULT.Best = [];

    if (APELSERG.CONFIG.PROC.UiPoints) {
        APELSERG.UI.ShowPoints();
    }
}

//===
// Сброс конфигурации
//===
APELSERG.CONFIG.ResetConfig = function () {

    var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

    localStorage.removeItem(configName);

    if (APELSERG.CONFIG.PROC.UiSettings) {
        APELSERG.UI.ShowSettings();
    }

    document.getElementById('APELSERG_DivCanvas').innerHTML = APELSERG.LANG.GetText('RELOAD_PAGE');
}
