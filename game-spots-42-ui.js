// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Применить изменения
//===
APELSERG.UI.ApplySettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {

            APELSERG.CONFIG.SET.BallSize = parseInt(document.getElementById('APELSERG_BallSize').value);
            APELSERG.CONFIG.SET.CourtWidth = parseInt(document.getElementById('APELSERG_CourtWidth').value);
            APELSERG.CONFIG.SET.CourtHeight = parseInt(document.getElementById('APELSERG_CourtHeight').value);
            APELSERG.CONFIG.SET.SpeedSelector = parseInt(document.getElementById('APELSERG_Level').value);
            APELSERG.CONFIG.SET.BallNum = parseInt(document.getElementById('APELSERG_Number').value);
            APELSERG.CONFIG.SET.Lang = document.getElementById('APELSERG_Lang').value;

            APELSERG.CONFIG.SET.UserName[0] = document.getElementById('APELSERG_UserNameL').value;
            APELSERG.CONFIG.SET.UserName[1] = document.getElementById('APELSERG_UserNameR').value;

            APELSERG.CONFIG.SET.UserDevice[0] = parseInt(document.getElementById('APELSERG_UserDeviceL').value);
            APELSERG.CONFIG.SET.UserDevice[1] = parseInt(document.getElementById('APELSERG_UserDeviceR').value);

            // коррекция одинаковых устройств
            //
            if (APELSERG.CONFIG.SET.UserDevice[0] == APELSERG.CONFIG.SET.UserDevice[1]
                && APELSERG.CONFIG.SET.UserDevice[0] < 10) {

                APELSERG.CONFIG.PROC.ErrorCnt = APELSERG.CONFIG.SET.ErrorCnt;
                APELSERG.CONFIG.PROC.ErrorMsg = APELSERG.LANG.GetText('ERROR_DEVICE');

                if (APELSERG.CONFIG.SET.UserDevice[0] == 0) APELSERG.CONFIG.SET.UserDevice[1] = 3;
                if (APELSERG.CONFIG.SET.UserDevice[0] == 1) APELSERG.CONFIG.SET.UserDevice[1] = 3;
                if (APELSERG.CONFIG.SET.UserDevice[0] == 3) APELSERG.CONFIG.SET.UserDevice[1] = 1;
            }
            
            //-- закрыть окно
            //--
            document.getElementById('APELSERG_DivSettings').innerHTML = "";
            APELSERG.CONFIG.PROC.UiSettings = false;

            //-- сохранить новую конфигурацию
            //--
            var configName = APELSERG.CONFIG.GetLocalStorageConfigName();
            localStorage[configName] = JSON.stringify(APELSERG.CONFIG.SET);

            //-- переинициализация
            //--
            APELSERG.MAIN.OnLoad(false);
        }
    }
}

//===
// Показать окно настроек
//===
APELSERG.UI.ShowSettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {
            document.getElementById('APELSERG_DivSettings').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivSettings').innerHTML = APELSERG.UI.GetHtmlDivSettings();

            document.getElementById('APELSERG_BallSize').value = APELSERG.CONFIG.SET.BallSize;
            document.getElementById('APELSERG_CourtWidth').value = APELSERG.CONFIG.SET.CourtWidth;
            document.getElementById('APELSERG_CourtHeight').value = APELSERG.CONFIG.SET.CourtHeight;
            document.getElementById('APELSERG_Level').value = APELSERG.CONFIG.SET.SpeedSelector;
            document.getElementById('APELSERG_Number').value = APELSERG.CONFIG.SET.BallNum;
            document.getElementById('APELSERG_Lang').value = APELSERG.CONFIG.SET.Lang;
            document.getElementById('APELSERG_UserNameL').value = APELSERG.CONFIG.SET.UserName[0];
            document.getElementById('APELSERG_UserNameR').value = APELSERG.CONFIG.SET.UserName[1];
            document.getElementById('APELSERG_UserDeviceL').value = APELSERG.CONFIG.SET.UserDevice[0];
            document.getElementById('APELSERG_UserDeviceR').value = APELSERG.CONFIG.SET.UserDevice[1];
        }
        APELSERG.CONFIG.PROC.UiSettings = !APELSERG.CONFIG.PROC.UiSettings;
    }
}

//===
// Показать окно очков
//===
APELSERG.UI.ShowPoints = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiPoints) {
            document.getElementById('APELSERG_DivPoints').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivPoints').innerHTML = APELSERG.UI.GetHtmlDivPoints();
        }
    }
    APELSERG.CONFIG.PROC.UiPoints = !APELSERG.CONFIG.PROC.UiPoints;
}

//===
// Показать окно помощи
//===
APELSERG.UI.ShowHelp = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiHelp) {
            document.getElementById('APELSERG_DivHelp').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivHelp').innerHTML = APELSERG.UI.GetHtmlDivHelp();
        }
    }
    APELSERG.CONFIG.PROC.UiHelp = !APELSERG.CONFIG.PROC.UiHelp;
}


//===
// HTML помощи
//===
APELSERG.UI.GetHtmlDivHelp = function () {

    return APELSERG.LANG.GetHelp() +
    "<input type='button' value='" + APELSERG.LANG.GetText("CLOSE") + "' onclick='APELSERG.UI.ShowHelp();' />" +
    "<hr />";
}


//===
// HTML очков
//===
APELSERG.UI.GetHtmlDivPoints = function () {

    var tableHtml = APELSERG.LANG.GetText('NO_DATA');

    if (APELSERG.CONFIG.RESULT.Best[0] !== undefined) {

        tableHtml = APELSERG.LANG.GetText("BEST") + " 10 <table>";
        for (var n = 0; APELSERG.CONFIG.RESULT.Best.length > n; n++) {
            tableHtml += "<tr>";
            tableHtml += "<td>";
            tableHtml += (n + 1).toString();
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].Name;
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].Points;
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].Date;
            tableHtml += "</td>";
            tableHtml += "</tr>";
        }
        tableHtml += "</table>";

        if (APELSERG.CONFIG.RESULT.Last[0] !== undefined) {
            tableHtml += "<br/>";

            tableHtml += APELSERG.LANG.GetText("LAST") + " 20 <table>";
            for (var n = 0; APELSERG.CONFIG.RESULT.Last.length > n; n++) {
                tableHtml += "<tr>";
                tableHtml += "<td>";
                tableHtml += (n + 1).toString();
                tableHtml += "</td>";
                tableHtml += "<td>";
                tableHtml += APELSERG.CONFIG.RESULT.Last[n].NameWin + " : " + APELSERG.CONFIG.RESULT.Last[n].PointsWin;
                tableHtml += "</td>";
                tableHtml += "<td>";
                tableHtml += APELSERG.CONFIG.RESULT.Last[n].NameLost + " : " + APELSERG.CONFIG.RESULT.Last[n].PointsLost;
                tableHtml += "</td>";
                tableHtml += "<td>";
                tableHtml += APELSERG.CONFIG.RESULT.Last[n].Date;
                tableHtml += "</td>";
                tableHtml += "</tr>";
            }
            tableHtml += "</table>";
        }
        tableHtml += "<br/>";
        tableHtml += "<input type='button' value='" + APELSERG.LANG.GetText("CLOSE") + "' onclick='APELSERG.UI.ShowPoints();' />"
        tableHtml += "<input type='button' value='" + APELSERG.LANG.GetText("RESET") + "' onclick='APELSERG.CONFIG.ResetResult();' />";
    }

    return tableHtml + "<hr/>";
}


//===
// HTML настроек
//===
APELSERG.UI.GetHtmlDivSettings = function () {

    return "" +
    APELSERG.LANG.GetText("LABEL_NAME_LEFT") +
    " " +
    "<input type='text' id='APELSERG_UserNameL' maxlength='10' size='10' />" +
    " " +
    "<select id='APELSERG_UserDeviceL'>" +
    "  <option value='0'>" + APELSERG.LANG.GetText("NO") + "</option>" +
    "  <option value='1'>" + APELSERG.LANG.GetText("KB") + "</option>" +
    "  <option value='3'>" + APELSERG.LANG.GetText("MOUSE") + "</option>" +
    "  <option value='10'>" + APELSERG.LANG.GetText("COMP") + "</option>" +
    "  <option value='11'>" + APELSERG.LANG.GetText("COMP") + "(" + APELSERG.LANG.GetText("EXPERT") + ")</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_NAME_RIGHT") +
    " " +
    "<input type='text' id='APELSERG_UserNameR' value='Noname' maxlength='10' size='10' />" +
    " " +
    "<select id='APELSERG_UserDeviceR'>" +
    "  <option value='0'>" + APELSERG.LANG.GetText("NO") + "</option>" +
    "  <option value='1'>" + APELSERG.LANG.GetText("KB") + "</option>" +
    "  <option value='3'>" + APELSERG.LANG.GetText("MOUSE") + "</option>" +
    "  <option value='10'>" + APELSERG.LANG.GetText("COMP") + "</option>" +
    "  <option value='11'>" + APELSERG.LANG.GetText("COMP") + "(" + APELSERG.LANG.GetText("EXPERT") + ")</option>" +
    "</select>" +
    "<br />" +
    "<br />" +
    " " +
    APELSERG.LANG.GetText("LABEL_COURT_WIDTH") +
    " " +
    "<select id='APELSERG_CourtWidth'>" +
    "  <option value='400'>400</option>" +
    "  <option value='500'>500</option>" +
    "  <option value='600'>600</option>" +
    "  <option value='700'>700</option>" +
    "  <option value='800'>800</option>" +
    "  <option value='900'>900</option>" +
    "  <option value='1000'>1000</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_COURT_HEIGHT") +
    " " +
    "<select id='APELSERG_CourtHeight'>" +
    "  <option value='400'>400</option>" +
    "  <option value='500'>500</option>" +
    "  <option value='600'>600</option>" +
    "  <option value='700'>700</option>" +
    "  <option value='800'>800</option>" +
    "  <option value='900'>900</option>" +
    "  <option value='1000'>1000</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_BALL_SIZE") +
    " " +
    "<select id='APELSERG_BallSize'>" +
    "  <option value='40'>40</option>" +
    "  <option value='50'>50</option>" +
    "  <option value='60'>60</option>" +
    "  <option value='70'>70</option>" +
    "  <option value='80'>80</option>" +
    "</select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_NUMBER") +
    " " +
    "<select id='APELSERG_Number'>" +
    "  <option value='10'>10</option>" +
    "  <option value='20'>20</option>" +
    "  <option value='30'>30</option>" +
    "  <option value='40'>40</option>" +
    "  <option value='50'>50</option>" +
    "  </select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_LEVEL") +
    " " +
    "<select id='APELSERG_Level'>" +
    "  <option value='0'>1</option>" +
    "  <option value='1'>2</option>" +
    "  <option value='2'>3</option>" +
    "  <option value='3'>4</option>" +
    "  </select>" +
    " " +
    APELSERG.LANG.GetText("LABEL_LANG") +
    " " +
    "<select id='APELSERG_Lang'>" +
    "  <option value='EN'>EN</option>" +
    "  <option value='RU'>RU</option>" +
    "</select>" +
    "<br />" +
    "<br />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("CLOSE") + "' onclick='APELSERG.UI.ShowSettings();' />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("SAVE") + "' onclick='APELSERG.UI.ApplySettings();' />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("RESET") + "' onclick='APELSERG.CONFIG.ResetConfig();' />" +
    "<hr />";
}