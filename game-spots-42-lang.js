// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Получить текст на выбранном языке
//===
APELSERG.LANG.GetText = function (keyText) {

    if (APELSERG.CONFIG.SET.Lang == "EN") {
        if (keyText == "YES") return "Yes";
        if (keyText == "NO") return "No";
        if (keyText == "CANCEL") return "Cancel";
        if (keyText == "STOP") return "STOP";
        if (keyText == "START") return "START";
        if (keyText == "PAUSE") return "PAUSE";
        if (keyText == "CONTINUE") return "CONTINUE";
        if (keyText == "SAVE") return "Save";
        if (keyText == "RESET") return "Reset";
        if (keyText == "CLOSE") return "Close";
        if (keyText == "RELOAD_PAGE") return "Reload page";
        if (keyText == "NO_DATA") return "No data";
        if (keyText == "CONFIG") return "Config";
        if (keyText == "SCORE") return "Score";
        if (keyText == "HELP") return "Help";
        if (keyText == "KB") return "Kb";
        if (keyText == "MOUSE") return "Mouse";
        if (keyText == "COMP") return "Comp";
        if (keyText == "EXPERT") return "Expert";
        if (keyText == "LAST") return "Last";
        if (keyText == "BEST") return "Best";
        if (keyText == "LABEL_NAME") return "Name";
        if (keyText == "LABEL_NAME_LEFT") return "Left gamer";
        if (keyText == "LABEL_NAME_RIGHT") return "Right gamer";
        if (keyText == "LABEL_LANG") return "Lang";
        if (keyText == "LABEL_COURT_WIDTH") return "Width";
        if (keyText == "LABEL_COURT_HEIGHT") return "Height";
        if (keyText == "LABEL_POINTS") return "Points";
        if (keyText == "LABEL_BALL_SIZE") return "Ball";
        if (keyText == "LABEL_SPEED") return "Speed";
        if (keyText == "LABEL_LEVEL") return "Level";
        if (keyText == "LABEL_NUMBER") return "Number";
        if (keyText == "LABEL_SET") return "Set";
        if (keyText == "ERROR_DEVICE") return "Corrected";
        return "== ? EN ? ==";
    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        if (keyText == "YES") return "Да";
        if (keyText == "NO") return "Нет";
        if (keyText == "CANCEL") return "Отмена";
        if (keyText == "STOP") return "СТОП";
        if (keyText == "START") return "СТАРТ";
        if (keyText == "PAUSE") return "ПАУЗА";
        if (keyText == "CONTINUE") return "ПРОДОЛЖИТЬ";
        if (keyText == "SAVE") return "Сохранить";
        if (keyText == "RESET") return "Сбросить";
        if (keyText == "CLOSE") return "Закрыть";
        if (keyText == "RELOAD_PAGE") return "Перегрузите страницу";
        if (keyText == "NO_DATA") return "Нет данных";
        if (keyText == "CONFIG") return "Настройка";
        if (keyText == "SCORE") return "Очки";
        if (keyText == "HELP") return "Помощь";
        if (keyText == "KB") return "Кл";
        if (keyText == "MOUSE") return "Мышь";
        if (keyText == "COMP") return "Комп";
        if (keyText == "EXPERT") return "Эксперт";
        if (keyText == "LAST") return "Последние";
        if (keyText == "BEST") return "Лучшие";
        if (keyText == "LABEL_NAME") return "Имя";
        if (keyText == "LABEL_NAME_LEFT") return "Игрок слева";
        if (keyText == "LABEL_NAME_RIGHT") return "Игрок справа";
        if (keyText == "LABEL_LANG") return "Язык";
        if (keyText == "LABEL_COURT_WIDTH") return "Ширина";
        if (keyText == "LABEL_COURT_HEIGHT") return "Глубина";
        if (keyText == "LABEL_POINTS") return "Очков";
        if (keyText == "LABEL_BALL_SIZE") return "Мяч";
        if (keyText == "LABEL_SPEED") return "Скорость";
        if (keyText == "LABEL_LEVEL") return "Уровень";
        if (keyText == "LABEL_NUMBER") return "Количество";
        if (keyText == "LABEL_SET") return "Партия";
        if (keyText == "ERROR_DEVICE") return "Исправлено";
        return "== ? RU ? ==";
    }

    return "== ? No lang ? ==";
}

//===
// Получить помощь на выбранном языке
//===
APELSERG.LANG.GetHelp = function () {

    if (APELSERG.CONFIG.SET.Lang == "EN") {

        return "" +
            "<h3>Game</h3>" +
            "<pre>" +
            "Start - [START], space, double click <br/>" +
            "Stop - winning (save result), [STOP], page reload <br/>" +
            "Pause - [P] <br/>" +
            "Cancel pause - [P], [CONTINUE], space, double click <br/>" +
            "Resize mode - Ctrl+, Ctrl- <br/>" +
            "Full screen mode on/off - [F11] <br/>" +
            "On/Off sound - [S] <br/>" +
            "</pre>" +
            "" +
            "<h3>Top buttons</h3>" +
            "<pre>" +
            "Settings, Score (10 best and 20 last results), Help <br/>" +
            "Available when [Stop] <br/>" +
            "When start - windows are closed and game begins <br/>" +
            "</pre>" +
            "" +
            "<h3>Offline mode</h3>" +
            "<pre>" +
            "Load from web server - Offline mode must be already installed <br/>" +
            "Load from local disk - does not work save the settings and results <br/>" +
            "</pre>" +
            "" +
            "<h3>Problems</h3>" +
            "<pre>" +
            "1. Reset settings and score (button [Reset]) <br/>" +
            "2. Reload browser <br/>" +
            "3. Update your browser to the latest version <br/>" +
            "4. Try a different browser <br/>" +
            "</pre>";

    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        return "" +
            "<h3>Игра</h3>" +
            "<pre>" +
            "Старт - [СТАРТ], пробел, двойной клик <br/>" +
            "Стоп - выигрыш (с сохранением результата), [СТОП], перезагрузка страницы <br/>" +
            "Пауза - [P] <br/>" +
            "Отменить паузу - [P], [ПРОДОЛЖИТЬ], пробел, двойной клик <br/>" +
            "Изменение размера - Ctrl+, Ctrl- <br/>" +
            "Полноэкранный режим вкл/выкл - [F11] <br/>" +
            "Вкл/Выкл звук - [S] <br/>" +
            "</pre>" +
            "" +
            "<h3>Кнопки сверху</h3>" +
            "<pre>" +
            "Настройка, очки (10 лучших и 20 последних результатов), помощь <br/>" +
            "Доступны в режиме [Стоп] <br/>" +
            "При старте - окна закрываются, начинается игра <br/>" +
            "</pre>" +
            "" +
            "<h3>Автономная работа</h3>" +
            "<pre>" +
            "С веб-сервера - автономный режим должен быть уже установлен <br/>" +
            "С локального диска - не работает сохранение настроек и результатов <br/>" +
            "</pre>" +
            "" +
            "<h3>Проблемы</h3>" +
            "<pre>" +
            "1. Сбросить настройки и результаты (кнопка [Сбросить]) <br/>" +
            "2. Перезагрузить браузер <br/>" +
            "3. Обновить браузер до последней версии <br/>" +
            "4. Попробовать другой браузер <br/>" +
            "</pre>";
    }

    return "== ? No help ? ==";
}
