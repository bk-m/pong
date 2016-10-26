var can = $("#can");
var W = can.width();
var H = can.height();
var scl = 40;
var rows = W / scl;
var cols = H / scl;
var spdX = 10;
var spdY = 10;
var pSpd1 = 30;
var pSpd2 = 20;
var timer;
var timer2;
var timerOn = 0;
var p1score = 0;
var p2score = 0;
var deg = Math.PI / 180;

function createBall() {
    can.append("<div id='ball'></div>");
    var B = $("#ball");
    B.css("width", scl);
    B.css("height", scl);
    B.css("border-radius", "100%");
    B.css("background-color", "white");
    B.css("position", "absolute");
    B.css("left", (W / 2) - (B.width() / 2));
    B.css("top", (H / 2) - (B.height() / 2));
    B.css("padding", "0");
    B.css("margin", "0");
}

function createPaddles() {
    for (i = 1; i < 3; i++) {
        can.append("<div id='paddle" + i + "'></div>");
        var P = $("#paddle" + i);
        P.css("width", scl / 2);
        P.css("height", scl * 3);
        P.css("background-color", "white");
        P.css("position", "absolute");
        P.css("padding", "0");
        P.css("margin", "0");
    }
    var P1 = $("#paddle1");
    var P2 = $("#paddle2");
    P1.css("left", scl);
    P1.css("top", ((H / 2) - (P1.height() / 2)));
    P2.css("left", ((W - scl) - (P2.width())));
    P2.css("top", ((H / 2) - (P2.height() / 2)));
}

function moveBall() {
    var B = $("#ball");
    var posX = parseInt(B.css("left").replace("px", ""));
    var posY = parseInt(B.css("top").replace("px", ""));
    topBot();
    paddleCol();
    leftRight(timer);
    posX += spdX;
    B.css("left", posX);
    posY += spdY;
    B.css("top", posY);
    if (timerOn) {
        timer = window.setTimeout("moveBall();", 30);
    }
}

function p2AI() {
    var p2 = $("#paddle2");
    var B = $("#ball");
    var posTop = parseInt(B.css("top").replace("px", ""));
    var posBot = parseInt(B.css("top").replace("px", "")) + scl;
    var pT = parseInt(p2.css("top").replace("px", ""));
    var pB = parseInt(p2.css("top").replace("px", "")) + (scl * 3);
    if (pT > posBot * 0.99) {
        p2Up();
    } else if (pB < posTop * 1.01) {
        p2Down();
    }
    if (timerOn) {
        timer2 = window.setTimeout("p2AI();", 50);
    }

}

function start() {
    if (!timerOn) {
        timerOn = 1;
        moveBall();
        p2AI();
    }
}

function stop(time) {
    timerOn = 0;
    clearTimeout(time);
    clearTimeout(timer2);
    $("#ball").remove();
    createBall();
}

function topBot() {
    var B = $("#ball");
    var posTop = parseInt(B.css("top").replace("px", ""));
    var posBot = parseInt(B.css("top").replace("px", "")) + scl;
    if ((posTop === 0) || (posBot === H)) {
        spdY *= -1;
    }
}

function leftRight(time) {
    var B = $("#ball");
    var posLeft = parseInt(B.css("left").replace("px", ""));
    var posRight = parseInt(B.css("left").replace("px", "")) + scl;
    if (posLeft === 0) {
        stop(time);
        p2score += 1;
        $("#score2").html(p2score);
    }
    else if (posRight === W) {
        stop(time);
        p1score += 1;
        $("#score1").html(p1score);
    }
}
function paddleCol() {
    var p1 = $("#paddle1");
    var p2 = $("#paddle2");
    var B = $("#ball");
    var posLeft = parseInt(B.css("left").replace("px", ""));
    var posRight = parseInt(B.css("left").replace("px", "")) + scl;
    var posTop = parseInt(B.css("top").replace("px", ""));
    var posBot = parseInt(B.css("top").replace("px", "")) + scl;
    var p1P = parseInt(p1.css("left").replace("px", "")) + (scl / 2);
    var p1T = parseInt(p1.css("top").replace("px", ""));
    var p1B = parseInt(p1.css("top").replace("px", "")) + (scl * 3);
    var p2P = parseInt(p2.css("left").replace("px", ""));
    var p2T = parseInt(p2.css("top").replace("px", ""));
    var p2B = parseInt(p2.css("top").replace("px", "")) + (scl * 3);
    if (((p1P == posLeft) && (p1T < posBot) && (p1B > posTop)) || ((p2P == posRight) && (p2T < posBot) && (p2B > posTop))) {
        spdX *= -1;
    }
/*        var temp1 = spdX * Math.cos(90 * deg);
        spdX = temp1;
        var temp2 = spdY * Math.sin(90 * deg);
        spdY = temp2;
    } else if ((p2P == posRight) && (p2T < posBot) && (p2B > posTop)) {
        var temp3 = spdX * Math.cos(-90 * deg);
        spdX = temp3;
        var temp4 = spdY * Math.sin(-90 * deg);
        spdY = temp4;
    }*/
}

function p1Up() {
    var P = $("#paddle1");
    var pY = parseInt(P.css("top").replace("px", ""));
    if (pY > 0) {
        pY -= pSpd1;
        P.css("top", pY);
    } else {
        P.css("top", 0);
    }
}

function p1Down() {
    var P = $("#paddle1");
    var pY = parseInt(P.css("top").replace("px", ""));
    if (pY < (H - scl * 3)) {
        pY += pSpd1;
        P.css("top", pY);
    } else {
        P.css("top", H - scl * 3)
    }
}

function p2Up() {
    var P = $("#paddle2");
    var pY = parseInt(P.css("top").replace("px", ""));
    if (pY > 0) {
        pY -= pSpd2;
        P.css("top", pY);
    } else {
        P.css("top", 0);
    }
}

function p2Down() {
    var P = $("#paddle2");
    var pY = parseInt(P.css("top").replace("px", ""));
    if (pY < (H - scl * 3)) {
        pY += pSpd2;
        P.css("top", pY);
    } else {
        P.css("top", H - scl * 3)
    }
}