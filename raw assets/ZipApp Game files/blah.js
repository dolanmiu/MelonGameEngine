/*
 VIBRANT RECYCLING
 Copyright (C) 2012 - 2013, Andre Antonio Schmitz
 All Rights Reserved

 http://www.ciangames.com

*/
var BrowserAux = {};
(function (u) {
    function w(c, a, b, d, g, v) {
        c.beginPath();
        c.moveTo(a + 20, b);
        c.lineTo(a + d - 20, b);
        c.quadraticCurveTo(a + d, b, a + d, b + 20);
        c.lineTo(a + d, b + g - 20);
        c.quadraticCurveTo(a + d, b + g, a + d - 20, b + g);
        c.lineTo(a + 20, b + g);
        c.quadraticCurveTo(a, b + g, a, b + g - 20);
        c.lineTo(a, b + 20);
        c.quadraticCurveTo(a, b, a + 20, b);
        c.closePath();
        c.fillStyle = v;
        c.fill()
    }

    function s(c, a, b, d, g, v, h, f) {
        c.beginPath();
        c.moveTo(a + 20, b);
        c.lineTo(a + d - 20, b);
        c.quadraticCurveTo(a + d, b, a + d, b + 20);
        c.lineTo(a + d, b + g - 20);
        c.quadraticCurveTo(a + d, b + g, a + d - 20, b + g);
        c.lineTo(a +
            20, b + g);
        c.quadraticCurveTo(a, b + g, a, b + g - 20);
        c.lineTo(a, b + 20);
        c.quadraticCurveTo(a, b, a + 20, b);
        c.closePath();
        c.fillStyle = v;
        c.strokeStyle = h;
        c.lineWidth = f;
        c.fill();
        c.stroke()
    }

    function l(c, a, b, d, g) {
        c.save();
        c.beginPath();
        c.translate(a, b);
        c.moveTo(0, -d);
        for (a = 0; 5 > a; a++) c.rotate(0.63), c.lineTo(0, -(0.5 * d)), c.rotate(0.63), c.lineTo(0, -d);
        c.closePath();
        c.fillStyle = g;
        c.fill();
        c.restore()
    }

    function p(c, a, b, d, g, v, h) {
        c.font = "" + a + "px 'Galindo'";
        c.fillStyle = b;
        c.textAlign = d;
        c.textBaseline = "middle";
        c.fillText(g, v, h)
    }

    function h(c,
        a, b, d, g, h, f, k) {
        c.font = "" + a + "px 'Galindo'";
        c.textAlign = g;
        c.textBaseline = "middle";
        c.fillStyle = b;
        c.fillText(h, f + 1, k + 2);
        c.fillStyle = d;
        c.fillText(h, f, k)
    }

    function q(c, a) {
        return (a + c).slice(-a.length)
    }

    function D(c) {
        var a = "",
            b = "",
            d = "",
            g = "",
            h = "",
            f = b = "",
            k = "",
            l = 0;
        c = escape(c);
        do b = c.charCodeAt(l++), d = c.charCodeAt(l++), g = c.charCodeAt(l++), h = b >> 2, b = (b & 3) << 4 | d >> 4, f = (d & 15) << 2 | g >> 6, k = g & 63, isNaN(d) ? f = k = 64 : isNaN(g) && (k = 64), a = a + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b) +
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k); while (l < c.length);
        return a
    }

    function x(c) {
        var a = "",
            b = "",
            d = "",
            g = "",
            h = d = b = "",
            f = "",
            k = 0;
        if (!c) return "";
        /[^A-Za-z0-9\+\/\=]/g.exec(c) && console.log("Decode Errors!");
        c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)),
        h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(k++)), b = b << 2 | d >> 4, d = (d & 15) << 4 | h >> 2, g = (h & 3) << 6 | f, a += String.fromCharCode(b), 64 != h && (a += String.fromCharCode(d)), 64 != f && (a += String.fromCharCode(g));
        while (k < c.length);
        return unescape(a)
    }

    function t(c, a, b, d, g, h) {
        for (var f = 0; f < d; f++) switch (b) {
            case "droplet":
                me.game.add(new E(c, a, g, h), 9);
                break;
            case "starbin":
                me.game.add(new F(c,
                    a, g, h), 9);
                break;
            case "starscr":
                me.game.add(new G(c, a, g, h), 1020)
        }
        me.game.sort()
    }
    var b = {
        Version: "1.0.9",
        Level: {},
        Water: {},
        Language: {},
        Bin: {},
        Audio: {},
        Hud: {},
        Menu: null,
        init: function () {
            me.sys.localStorage && localStorage.getItem("LANGUAGE") && b.Language.setLang(localStorage.getItem("LANGUAGE"));
            b.Language.getLang || b.Language.setLang(window.navigator.userLanguage || window.navigator.language || "en");
            me.sys.dirtyRegion = !0;
            me.sys.pauseOnBlur = !1;
            me.sys.scalingInterpolation = !0;
            if (navigator.isCocoonJS) me.video.init(null,
                1024, 768, !0, "auto", !1);
            else {
                document.getElementById("canvasGame").style.cursor = "wait";
                window.addEventListener("resize", this.onResize, !1);
                window.addEventListener("orientationchange", this.onResize, !1);
                this.onResize();
                if (!me.video.init("canvasGame", 1024, 768, !0, "auto", !1)) {
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("noCanvas").innerHTML = a.MSG_NO_HTML5;
                    return
                }
                me.video.onresize();
                me.sys.touch && (window.document.addEventListener("touchmove", function (c) {
                    c.preventDefault();
                    window.scroll(0, 0);
                    return !1
                }, !1), function () {
                    window.scrollTo(0, 1)
                }.defer(), me.event.subscribe(me.event.WINDOW_ONRESIZE, function (c) {
                    window.scrollTo(0, 1)
                }), 1 < window.devicePixelRatio && document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no"))
            }
            me.audio.init("ogg, m4a");
            me.sys.gravity = 0.98;
            me.state.set(me.state.LOADING, new H);
            me.state.change(me.state.LOADING)
        },
        start: function () {
            me.sys.localStorage && localStorage.getItem("AUDIO") &&
                ("on" === localStorage.getItem("AUDIO") ? b.Audio.enable() : b.Audio.disable());
            me.state.LEVELS = me.state.USER + 0;
            me.state.SUCCESS = me.state.USER + 1;
            me.state.FAILED = me.state.USER + 2;
            me.state.SCENERY = me.state.USER + 3;
            me.state.set(me.state.PLAY, new I);
            me.state.set(me.state.MENU, new J);
            me.state.set(me.state.LEVELS, new K);
            me.state.set(me.state.SUCCESS, new L);
            me.state.set(me.state.FAILED, new M);
            me.state.set(me.state.SCENERY, new N);
            me.state.transition("fade", "#FFFFFF", 250);
            me.state.setTransition(me.state.SUCCESS, !1);
            me.state.setTransition(me.state.FAILED, !1);
            me.entityPool.add("BIN1", O, !0);
            me.entityPool.add("BIN2", P, !0);
            me.entityPool.add("BIN3", Q, !0);
            me.entityPool.add("BIN4", R, !0);
            me.entityPool.add("BIN5", S, !0);
            me.entityPool.add("WASTES", T, !0);
            me.entityPool.add("CLOUDS", U, !0);
            me.gamestat.add("score", 0);
            me.gamestat.add("stars", 0);
            me.gamestat.add("discarded", 0);
            me.gamestat.add("collected", 0);
            me.gamestat.add("generated", 0);
            b.Menu = new V;
            b.Level.Manager = new W;
            navigator.isCocoonJS || (me.state.onPause = this.onPause, window.addEventListener("blur",
                function () {
                    me.state.onPause();
                    me.state.pause(!0)
                }, !1), document.getElementById("canvasGame").style.cursor = "default");
            me.state.change(me.state.MENU)
        },
        onPause: function () {
            if (!b.Menu.btnContinue.visible) {
                var c = me.video.getSystemContext(),
                    a = me.video.applyRGBFilter(me.video.getSystemCanvas(), "brightness", 0.4);
                b.Menu.show(!0);
                var e = setInterval(function () {
                    me.state.isRunning() ? clearInterval(e) : b.Menu.refresh(c, a)
                }, me.sys.fps)
            }
        },
        onResize: function () {
            var c = document.getElementById("contentGame"),
                a = document.getElementById("canvasGame"),
                b = window.innerWidth - 550,
                d = window.innerHeight - 62,
                g = 4;
            document.getElementById("leftBanner") || (a.style.border = "none", b = window.innerWidth, d = window.innerHeight, g = 0);
            1.33 < b / d ? b = ~~(1.33 * d) : d = ~~(b / 1.33);
            if (1024 < b || 768 < d) b = 1024, d = 768;
            c.style.height = d + "px";
            c.style.width = b + "px";
            c.style.marginLeft = -b / 2 - g + "px";
            c.style.marginTop = -d / 2 - g / 2 + "px";
            a.width = b;
            a.height = d
        }
    }, X = [{
        name: "SCR_TITLE",
        type: "image",
        src: "./graphics/ui/SCR_TITLE.png"
    }, {
        name: "LGO_GAME",
        type: "image",
        src: "./graphics/ui/LGO_GAME.png"
    }, {
        name: "SCR_FOOTER",
        type: "image",
        src: "./graphics/ui/SCR_FOOTER.png"
    }, {
        name: "SCR_LEVELS",
        type: "image",
        src: "./graphics/ui/SCR_LEVELS.png"
    }, {
        name: "BTN_TEXT_BG",
        type: "image",
        src: "./graphics/ui/BTN_TEXT_BG.png"
    }, {
        name: "BTN_TEXT_SM",
        type: "image",
        src: "./graphics/ui/BTN_TEXT_SM.png"
    }, {
        name: "BTN_IMAGE_48",
        type: "image",
        src: "./graphics/ui/BTN_IMAGE_48.png"
    }, {
        name: "BTN_IMAGE_64",
        type: "image",
        src: "./graphics/ui/BTN_IMAGE_64.png"
    }, {
        name: "BTN_IMAGE_72",
        type: "image",
        src: "./graphics/ui/BTN_IMAGE_72.png"
    }, {
        name: "BTN_LEVELS",
        type: "image",
        src: "./graphics/ui/BTN_LEVELS.png"
    }, {
        name: "BTN_HUD",
        type: "image",
        src: "./graphics/ui/BTN_HUD.png"
    }, {
        name: "INTRO",
        type: "audio",
        src: "./audio/music/",
        channel: 1
    }, {
        name: "WATER",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "LAUNCH",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "CLICK",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "SLIDE",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "SHAKE",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "YEEHA",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "WOW",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "AHH",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "PAPER",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "PLASTIC",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "ORGANIC",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "METAL",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "GLASS",
        type: "audio",
        src: "./audio/",
        channel: 1
    }, {
        name: "S001_B01",
        type: "image",
        src: "./graphics/backgrounds/S001_B01.png"
    }, {
        name: "S001_B02",
        type: "image",
        src: "./graphics/backgrounds/S001_B02.png"
    }, {
        name: "S001_B03",
        type: "image",
        src: "./graphics/backgrounds/S001_B03.png"
    }, {
        name: "S001_B04",
        type: "image",
        src: "./graphics/backgrounds/S001_B04.png"
    }, {
        name: "S001_B05",
        type: "image",
        src: "./graphics/backgrounds/S001_B05.png"
    }, {
        name: "CLOUDS",
        type: "image",
        src: "./graphics/backgrounds/CLOUDS.png"
    }, {
        name: "S001_T01",
        type: "image",
        src: "./graphics/tilesets/S001_T01.png"
    }, {
        name: "BIN_PAPER",
        type: "image",
        src: "./graphics/sprites/BIN_PAPER.png"
    }, {
        name: "BIN_PLASTIC",
        type: "image",
        src: "./graphics/sprites/BIN_PLASTIC.png"
    }, {
        name: "BIN_ORGANIC",
        type: "image",
        src: "./graphics/sprites/BIN_ORGANIC.png"
    }, {
        name: "BIN_METAL",
        type: "image",
        src: "./graphics/sprites/BIN_METAL.png"
    }, {
        name: "BIN_GLASS",
        type: "image",
        src: "./graphics/sprites/BIN_GLASS.png"
    }, {
        name: "BIN_HAND",
        type: "image",
        src: "./graphics/sprites/BIN_HAND.png"
    }, {
        name: "BIN_EYES",
        type: "image",
        src: "./graphics/sprites/BIN_EYES.png"
    }, {
        name: "BIN_MOUTH",
        type: "image",
        src: "./graphics/sprites/BIN_MOUTH.png"
    }, {
        name: "BIN_CURSOR",
        type: "image",
        src: "./graphics/sprites/BIN_CURSOR.png"
    }, {
        name: "WASTE_PAPER",
        type: "image",
        src: "./graphics/sprites/WASTE_PAPER.png"
    }, {
        name: "WASTE_PLASTIC",
        type: "image",
        src: "./graphics/sprites/WASTE_PLASTIC.png"
    }, {
        name: "WASTE_ORGANIC",
        type: "image",
        src: "./graphics/sprites/WASTE_ORGANIC.png"
    }, {
        name: "WASTE_METAL",
        type: "image",
        src: "./graphics/sprites/WASTE_METAL.png"
    }, {
        name: "WASTE_GLASS",
        type: "image",
        src: "./graphics/sprites/WASTE_GLASS.png"
    }, {
        name: "PARTICLES",
        type: "image",
        src: "./graphics/sprites/PARTICLES.png"
    }, {
        name: "S001_L01",
        type: "tmx",
        src: "./levels/S001_L01.json"
    }, {
        name: "S001_L02",
        type: "tmx",
        src: "./levels/S001_L02.json"
    }, {
        name: "S001_L03",
        type: "tmx",
        src: "./levels/S001_L03.json"
    }, {
        name: "S001_L04",
        type: "tmx",
        src: "./levels/S001_L04.json"
    }, {
        name: "S001_L05",
        type: "tmx",
        src: "./levels/S001_L05.json"
    }, {
        name: "S001_L06",
        type: "tmx",
        src: "./levels/S001_L06.json"
    }, {
        name: "S001_L07",
        type: "tmx",
        src: "./levels/S001_L07.json"
    }, {
        name: "S001_L08",
        type: "tmx",
        src: "./levels/S001_L08.json"
    }, {
        name: "S001_L09",
        type: "tmx",
        src: "./levels/S001_L09.json"
    }, {
        name: "S001_L10",
        type: "tmx",
        src: "./levels/S001_L10.json"
    }, {
        name: "S001_L11",
        type: "tmx",
        src: "./levels/S001_L11.json"
    }, {
        name: "S001_L12",
        type: "tmx",
        src: "./levels/S001_L12.json"
    }, {
        name: "S001_L13",
        type: "tmx",
        src: "./levels/S001_L13.json"
    }, {
        name: "S001_L14",
        type: "tmx",
        src: "./levels/S001_L14.json"
    }, {
        name: "S001_L15",
        type: "tmx",
        src: "./levels/S001_L15.json"
    }, {
        name: "S001_L16",
        type: "tmx",
        src: "./levels/S001_L16.json"
    }, {
        name: "S001_L17",
        type: "tmx",
        src: "./levels/S001_L17.json"
    }, {
        name: "S001_L18",
        type: "tmx",
        src: "./levels/S001_L18.json"
    }, {
        name: "S001_L19",
        type: "tmx",
        src: "./levels/S001_L19.json"
    }, {
        name: "S001_L20",
        type: "tmx",
        src: "./levels/S001_L20.json"
    }, {
        name: "S001_L21",
        type: "tmx",
        src: "./levels/S001_L21.json"
    }, {
        name: "S001_L22",
        type: "tmx",
        src: "./levels/S001_L22.json"
    }, {
        name: "S001_L23",
        type: "tmx",
        src: "./levels/S001_L23.json"
    }],
        a = [];
    b.Language.setLang = function (c) {
        b.Language.getLang = c.substring(0, 2);
        me.sys.localStorage && localStorage.setItem("LANGUAGE", b.Language.getLang);
        "pt" === b.Language.getLang ? (a.LANGUAGE = "Portugu\u00eas", a.SCENERY_S001 = "Rio da Floresta", a.SCENERY_S002 = "Em Breve...", a.SCORE =
            "Pontua\u00e7\u00e3o", a.MENU = "Menu", a.COLLECTED = "Coletados", a.OF = "de", a.PLAY = "Jogar", a.REPLAY = "Repetir", a.HELP = "Ajuda", a.HINTS = "Dicas", a.LEVEL = "N\u00edvel", a.COMPLETED = "Completado!", a.CONTINUE = "Continuar", a.RESTART = "Reiniciar", a.CLOSE = "Fechar", a.NEXT = "Pr\u00f3ximo", a.FONT = "Fonte", a.IDIOM = "Idioma", a.CREDITS = "Cr\u00e9ditos", a.THANKS = "Agradecimentos", a.PAPER = "Papel", a.PLASTIC = "Pl\u00e1stico", a.ORGANIC = "Org\u00e2nico", a.METAL = "Metal", a.GLASS = "Vidro", a.SPANISH = "Espanhol", a.LOADING = "C a r r e g a n d o  . . .",
            a.PAUSE = "P A U S A", a.CONGRATULATIONS = "P A R A B \u00c9 N S !", a.HIGH_SCORE = "Pontua\u00e7\u00e3o M\u00e1xima", a.NEW_HISCORE = "Nova Pontua\u00e7\u00e3o M\u00e1xima!", a.YOU_KNOW = "Voc\u00ea Sabia?", a.SELECT_SCENERY = "Selecione Cen\u00e1rio", a.SELECT_LEVEL = "Selecione N\u00edvel", a.LEVEL_SUCCESS = "N\u00edvel Completado!", a.LEVEL_FAILED = "N\u00edvel Fracassado!", a.SPECIAL_THANKS = "Agradecimento Especial", a.MANY_THANKS = "Muito Obrigado!", a.TERMS_USE = "Termos de Uso", a.MORE_INFO = "Mais Informa\u00e7\u00f5es", a.CREDITS_DESIGN =
            "Game Design", a.CREDITS_DEVELOPER = "Programa\u00e7\u00e3o, Arte e M\u00fasica", a.CREDITS_ENGINE = "Motor HTML5", a.CREDITS_TILES = "Editor de N\u00edveis", a.CREDITS_AUDIO = "Efeitos Sonoros", a.CREDITS_FONTS = "Fontes Web", a.CREDITS_RECYCLE = "Reciclagem e Dicas", a.CREDITS_TRANSLATIONS = "Tradu\u00e7\u00f5es", a.CREDITS_YOU = "V O C \u00ca !", a.CREDITS_COPYRIGHT = "Copyright \u00a9 2012 - 2013", a.CREDITS_ALLRIGHTS = "Todos Direitos Reservados", a.MSG_NO_HTML5 = "Desculpe mas seu navegador web n\u00e3o suporta HTML5 Canvas, tente com outro navegador.",
            a.MSG_GAMEHELP_01 = "Ol\u00e1, me ajude a reciclar os res\u00edduos de PAPEL:", a.MSG_GAMEHELP_01A = "Folhas, Folhetos, Rascunhos e Envelopes.", a.MSG_GAMEHELP_01B = "Jornais e Revistas.", a.MSG_GAMEHELP_01C = "Caixas em Geral.", a.MSG_GAMEHELP_02 = "Ol\u00e1, me ajude a reciclar os res\u00edduos PL\u00c1STICOS:", a.MSG_GAMEHELP_02A = "Garrafas PET, Potes e Baldes.", a.MSG_GAMEHELP_02B = "Embalagens de Limpeza e Higiene.", a.MSG_GAMEHELP_02C = "Sacos Pl\u00e1sticos e Tampas de Embalagens.", a.MSG_GAMEHELP_03 = "Ol\u00e1, me ajude a reciclar os res\u00edduos ORG\u00c2NICOS:",
            a.MSG_GAMEHELP_03A = "Cascas e Restos de Frutas, Legumes e Verduras.", a.MSG_GAMEHELP_03B = "Flores, Folhas, Grama e Arbustos.", a.MSG_GAMEHELP_03C = "Restos de Comida.", a.MSG_GAMEHELP_04 = "Ol\u00e1, me ajude a reciclar os res\u00edduos de METAL:", a.MSG_GAMEHELP_04A = "Latas de Alimentos e Bebidas.", a.MSG_GAMEHELP_04B = "Utens\u00edlios Dom\u00e9sticos e Ferramentas.", a.MSG_GAMEHELP_04C = "Tampas de Garrafa e Papel Alum\u00ednio.", a.MSG_GAMEHELP_05 = "Ol\u00e1, me ajude a reciclar os res\u00edduos de VIDRO:", a.MSG_GAMEHELP_05A =
            "Garrafas de Bebidas e Potes de Alimentos.", a.MSG_GAMEHELP_05B = "Frascos de Rem\u00e9dios e Produtos de Higiene.", a.MSG_GAMEHELP_05C = "Cacos de Vidros.", a.MSG_GAMEHELP_06 = "Ol\u00e1, ajude-nos a reciclar os res\u00edduos:", a.MSG_GAMEHELP_06A = "Res\u00edduos de Papel na Lixeira Azul.", a.MSG_GAMEHELP_06B = "Res\u00edduos Pl\u00e1sticos na Lixeira Vermelha.", a.MSG_GAMEHELP_06C = "Em caso de D\u00favidas, Clique no ? no Topo da Tela.", a.MSG_GAMEHINT_01 = "Aponte e clique em um res\u00edduo para a lixeira colet\u00e1-lo!",
            a.MSG_GAMEHINT_02 = "Evite que os res\u00edduos sejam levados pela \u00e1gua!", a.MSG_GAMEHINT_03 = "Colete os res\u00edduos no ar para pontua\u00e7\u00e3o extra!", a.MSG_GAMEHINT_04 = "Clique na lixeira desejada para selecion\u00e1-la!", a.MSG_GAMEHINT_05 = "Recicle o res\u00edduo corretamente conforme o tipo da lixeira!", a.MSG_ECOHINT_01 = ["A energia economizada com a reciclagem de uma s\u00f3 lata de alum\u00ednio \u00e9 suficiente para manter ligada uma TV por tr\u00eas horas.", "www.amigosdofuturo.org.br"],
            a.MSG_ECOHINT_02 = ["A reciclagem de uma tonelada de pl\u00e1stico economiza 16 barris de petr\u00f3leo.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_03 = ["A energia economizada com a reciclagem de uma garrafa de vidro d\u00e1 para manter uma l\u00e2mpada de 100 watts ligada por quatro horas.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_04 = ["O vidro \u00e9 100% recicl\u00e1vel.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_05 = ["A reciclagem de uma tonelada de papel salva 17 \u00e1rvores da derrubada.", "www.amigosdofuturo.org.br"],
            a.MSG_ECOHINT_06 = ["Uma lata de alum\u00ednio pode ser reciclada infinitas vezes sem perder suas caracter\u00edsticas originais.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_07 = ["Uma tonelada de papel reciclado economiza 2,5 barris de petr\u00f3leo usados em sua fabrica\u00e7\u00e3o.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_08 = ["De 12 a 24 \u00e1rvores devem ser cortadas para fazer uma tonelada de papel.", "www.ecocycle.org"], a.MSG_ECOHINT_09 = ["Os pa\u00edses industrializados, com 20% da popula\u00e7\u00e3o mundial, consomem 87% do papel do mundo com impress\u00e3o e escrita.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_10 = ["A reciclagem economiza de 3 a 5 vezes a energia necess\u00e1ria nas instala\u00e7\u00f5es de incinera\u00e7\u00e3o.", "www.ecocycle.org"], a.MSG_ECOHINT_11 = ["A reciclagem economiza 40-75% da energia necess\u00e1ria para produzir a\u00e7o puro.", "www.ecocycle.org"], a.MSG_ECOHINT_12 = ["Pap\u00e9is de impress\u00e3o e escrita podem ser reciclados de 7 a 12 vezes antes que as fibras se tornam muito finas para usar.", "www.ecocycle.org"], a.MSG_ECOHINT_13 = ["O a\u00e7o \u00e9 o material mais reciclado no mundo.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_14 = ["Leva apenas cerca de 6 semanas no total para fabricar, preencher, vender, reciclar e remanufaturar uma lata de alum\u00ednio.", "www.ecocycle.org"], a.MSG_ECOHINT_15 = ["A reciclagem de uma tonelada de papel pode economizar 26.000 litros de \u00e1gua.", "www.ecocycle.org"], a.MSG_ECOHINT_16 = ["Mais de 40% da produ\u00e7\u00e3o de madeira industrial \u00e9 atualmente utilizada para produzir papel.", "www.ecocycle.org"], a.MSG_ECOHINT_17 = ["Quase 90% do que jogamos fora poderiam ser recuperados atrav\u00e9s da reutiliza\u00e7\u00e3o, reciclagem ou compostagem.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_18 = ["Usando latas recicladas em vez de extrair min\u00e9rio para fazer as latas de alum\u00ednio produzimos 95% menos polui\u00e7\u00e3o do ar e 97% menos polui\u00e7\u00e3o da \u00e1gua.", "www.ecocycle.org"]) : "es" === b.Language.getLang ? (a.LANGUAGE = "Span\u00f5l", a.SCENERY_S001 = "Rio en el Bosque", a.SCENERY_S002 = "Muy Pronto...", a.MENU = "Men\u00fa", a.SCORE = "Puntaje", a.COLLECTED = "Recolectados", a.OF = "de", a.PLAY = "Jugar", a.REPLAY = "Repetici\u00f3n", a.HELP = "Ayuda", a.HINTS = "Sugerencias",
            a.LEVEL = "Nivel", a.COMPLETED = "Completado!", a.CONTINUE = "Continuar", a.RESTART = "Reiniciar", a.CLOSE = "Cerrar", a.NEXT = "Siguiente", a.FONT = "Fuente", a.CREDITS = "Cr\u00e9ditos", a.THANKS = "Gracias", a.PAPER = "Papel", a.PLASTIC = "Pl\u00e1stico", a.ORGANIC = "Org\u00e1nico", a.METAL = "Metal", a.GLASS = "Vidrio", a.SPANISH = "Span\u00f5l", a.LOADING = "C a r g a n d o  . . .", a.PAUSE = "P A U S A R", a.CONGRATULATIONS = "F E L I C I T A C I O N E S !", a.HIGH_SCORE = "M\u00e1ximo Puntaje", a.NEW_HISCORE = "Nuevo M\u00e1ximo Puntaje!", a.YOU_KNOW =
            "Sabias que?", a.SELECT_SCENERY = "Seleccionar Escenario", a.SELECT_LEVEL = "Seleccionar Nivel", a.LEVEL_SUCCESS = "Nivel Superado!", a.LEVEL_FAILED = "Nivel Fallido!", a.SPECIAL_THANKS = "Agradecimientos Especiales", a.MANY_THANKS = "Muchas Gracias!", a.TERMS_USE = "T\u00e9rminos de Uso", a.MORE_INFO = "M\u00e1s Informaci\u00f3n", a.CREDITS_DESIGN = "Dise\u00f1o de Juego", a.CREDITS_DEVELOPER = "Programaci\u00f3n, Arte y M\u00fasica", a.CREDITS_ENGINE = "Motor HTML5", a.CREDITS_TILES = "Editor de Niveles", a.CREDITS_AUDIO = "Efectos de Sonido",
            a.CREDITS_FONTS = "Fuentes Web", a.CREDITS_RECYCLE = "Recliclaje y Sugerencias", a.CREDITS_TRANSLATIONS = "Traducciones", a.CREDITS_YOU = "T U !", a.CREDITS_COPYRIGHT = "Copyright \u00a9 2012 - 2013", a.CREDITS_ALLRIGHTS = "Todos los Derechos Reservados", a.MSG_NO_HTML5 = "Disculpa pero tu navegador no soporta canvas HTML5, intenta con otro navegador.", a.MSG_GAMEHELP_01 = "Hola, ayudame a reciclar los desechos de PAPEL:", a.MSG_GAMEHELP_01A = "Hojas, Folletos, Sobres y Borradores.", a.MSG_GAMEHELP_01B = "Peri\u00f3dicos y Revistas.",
            a.MSG_GAMEHELP_01C = "Cajas en General.", a.MSG_GAMEHELP_02 = "Hola, ayudame a reciclar los desechos PL\u00c1STICOS:", a.MSG_GAMEHELP_02A = "Botellas Pl\u00e1sticas, Frascos  y Cubetas.", a.MSG_GAMEHELP_02B = "Empaques de Limpieza e Higiene.", a.MSG_GAMEHELP_02C = "Bolsas Pl\u00e1sticas y Empaques.", a.MSG_GAMEHELP_03 = "Hola, ayudame a reciclar desechos ORG\u00c1NICOS:", a.MSG_GAMEHELP_03A = "Cortezas y Restos de Frutas y Vegetales.", a.MSG_GAMEHELP_03B = "Flores, Hojas, Grama y Arbustos.", a.MSG_GAMEHELP_03C = "Sobras de Comida.",
            a.MSG_GAMEHELP_04 = "Hola, ayudame a reciclar desechos de METAL:", a.MSG_GAMEHELP_04A = "Latas de Comida y Bebida.", a.MSG_GAMEHELP_04B = "Utensilios y Herramientas Caseras.", a.MSG_GAMEHELP_04C = "Tapas de Botella y L\u00e1minas de Aluminio.", a.MSG_GAMEHELP_05 = "Hola, ayudame a reciclar desechos de VIDRIO:", a.MSG_GAMEHELP_05A = "Contenedores de Bebidas y Comidas Embotelladas.", a.MSG_GAMEHELP_05B = "Botellas de Medicina y Productos de Higiene.", a.MSG_GAMEHELP_05C = "Fragmentos de Vidrio.", a.MSG_GAMEHELP_06 = "Hola, ayudanos a reciclar los desechos:",
            a.MSG_GAMEHELP_06A = "Desechos de Papel en la Papelera Azul.", a.MSG_GAMEHELP_06B = "Desechos de Pl\u00e1stico en la Papelera Roja.", a.MSG_GAMEHELP_06C = "En caso de dudas, haz click ? arriba de la pantalla.", a.MSG_GAMEHINT_01 = "Apunta y haz click un desecho a la papelera para recolectarlo!", a.MSG_GAMEHINT_02 = "No permitas que los desechos desaparezcan en el agua!", a.MSG_GAMEHINT_03 = "Recolecta los desechos en el aire y gana m\u00e1s puntos!", a.MSG_GAMEHINT_04 = "Haz click en la papelera para seleccionarla!",
            a.MSG_GAMEHINT_05 = "Recicla el desecho apropiadamente deacuerdo al tipo de papelera!", a.MSG_ECOHINT_01 = ["Reciclar una sola lata de aluminio podria hacer funcionar un TV por tres horas.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_02 = ["Reciclar una tonelada de pl\u00e1stico ahorra 16 barriles de petr\u00f3leo.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_03 = ["La energ\u00eda ahorrada de reciclar una botella de vidrio operar\u00eda una bombilla de 100 watios por cuatro horas.", "www.amigosdofuturo.org.br"],
            a.MSG_ECOHINT_04 = ["El vidrio es 100% reciclable.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_05 = ["Reciclar una tonelada de papel evita talar 17 \u00e1rboles.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_06 = ["Una lata de aluminio puede ser reciclada innumerables veces sin perder sus propiedades originales.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_07 = ["Una tonelada de papel reciclado ahorra 2.5 barriles de petr\u00f3leo usados en su manufactura.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_08 = ["Doce de 24 \u00e1rboles deben ser talados para hacer una tonelada de papel.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_09 = ["Los paises industrializados, con 20% de la poblaci\u00f3n mundial, consumen el 87% del papel para impresi\u00f3n y escritura del mundo.", "www.ecocycle.org"], a.MSG_ECOHINT_10 = ["Reciclar ahorra de 3 a 5 veces la energ\u00eda requerida para las plantas de incineraci\u00f3n.", "www.ecocycle.org"], a.MSG_ECOHINT_11 = ["Reclicar ahorra de 40 a 75% de la energ\u00eda necesarias para producir acero puro.", "www.ecocycle.org"], a.MSG_ECOHINT_12 = ["El papel impreso y escrito puede ser reciclado de 7 a 12 veces antes que las fibras se vuelvan  muy cortas para usarlas.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_13 = ["El acero es el material m\u00e1s reciclado en el mundo.", "www.ecocycle.org"], a.MSG_ECOHINT_14 = ["S\u00f3lo toma alrededor de 6 semanas en total para manufacturar, llenar, vender, reciclar y luego remanufacturar una lata de bebida en aluminio.", "www.ecocycle.org"], a.MSG_ECOHINT_15 = ["Reciclar una tonelada de papel puede ahorrar 7000 galones de agua.", "www.ecocycle.org"], a.MSG_ECOHINT_16 = ["M\u00e1s del 40% de la recolecci\u00f3n de madera industrial  es actualmente usada para hacer papel.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_17 = ["Cerca del 90% de lo que desechamos podria potencialmente ser recuperado atrav\u00e9s de reuso, reciclaje o compostaje.", "www.ecocycle.org"], a.MSG_ECOHINT_18 = ["Usar latas recicladas en vez del proceso de extracci\u00f3n para hacer latas de aluminio produce 95% menos poluci\u00f3n en el aire y 97% menos poluci\u00f3n en el agua.", "www.ecocycle.org"]) : (a.LANGUAGE = "English", a.SCENERY_S001 = "Forest River", a.SCENERY_S002 = "Coming Soon...", a.MENU = "Menu", a.SCORE = "Score",
            a.COLLECTED = "Collected", a.OF = "of", a.PLAY = "Play", a.REPLAY = "Replay", a.HELP = "Help", a.HINTS = "Hints", a.LEVEL = "Level", a.COMPLETED = "Completed!", a.CONTINUE = "Continue", a.RESTART = "Restart", a.CLOSE = "Close", a.NEXT = "Next", a.FONT = "Font", a.CREDITS = "Credits", a.THANKS = "Thanks", a.PAPER = "Paper", a.PLASTIC = "Plastic", a.ORGANIC = "Organic", a.METAL = "Metal", a.GLASS = "Glass", a.SPANISH = "Spanish", a.LOADING = "L o a d i n g  . . .", a.PAUSE = "P A U S E", a.CONGRATULATIONS = "C O N G R A T U L A T I O N S !", a.HIGH_SCORE = "High Score", a.NEW_HISCORE =
            "New High Score!", a.YOU_KNOW = "Did You Know?", a.SELECT_SCENERY = "Select Scenery", a.SELECT_LEVEL = "Select Level", a.LEVEL_SUCCESS = "Level Success!", a.LEVEL_FAILED = "Level Failed!", a.SPECIAL_THANKS = "Special Thanks", a.MANY_THANKS = "Many Thanks!", a.TERMS_USE = "Terms of Use", a.MORE_INFO = "More Info", a.CREDITS_DESIGN = "Game Design", a.CREDITS_DEVELOPER = "Programming, Art and Music", a.CREDITS_ENGINE = "Engine HTML5", a.CREDITS_TILES = "Level Editor", a.CREDITS_AUDIO = "Sound Effects", a.CREDITS_FONTS = "Web Fonts", a.CREDITS_RECYCLE =
            "Recycling and Hints", a.CREDITS_TRANSLATIONS = "Translations", a.CREDITS_YOU = "Y O U !", a.CREDITS_COPYRIGHT = "Copyright \u00a9 2012 - 2013", a.CREDITS_ALLRIGHTS = "All Rights Reserved", a.MSG_NO_HTML5 = "Sorry but your web browser does not support HTML5 Canvas, try with another browser.", a.MSG_GAMEHELP_01 = "Hello, help me to recycle the PAPER wastes:", a.MSG_GAMEHELP_01A = "Sheets, Brochures, Envelopes and Drafts.", a.MSG_GAMEHELP_01B = "Newspapers and Magazines.", a.MSG_GAMEHELP_01C = "Boxes in General.", a.MSG_GAMEHELP_02 =
            "Hello, help me to recycle the PLASTIC wastes:", a.MSG_GAMEHELP_02A = "PET Bottles, Jars and Buckets.", a.MSG_GAMEHELP_02B = "Packaging Cleaning and Hygiene.", a.MSG_GAMEHELP_02C = "Plastic Bags and Packaging Closures.", a.MSG_GAMEHELP_03 = "Hello, help me to recycle the ORGANIC wastes:", a.MSG_GAMEHELP_03A = "Peel and Remains of Fruits and Vegetables.", a.MSG_GAMEHELP_03B = "Flowers, Leaves, Grass and Shrubs.", a.MSG_GAMEHELP_03C = "Leftover Food.", a.MSG_GAMEHELP_04 = "Hello, help me to recycle the METAL wastes:", a.MSG_GAMEHELP_04A =
            "Food and Beverage Cans.", a.MSG_GAMEHELP_04B = "Household Utensils and Tools.", a.MSG_GAMEHELP_04C = "Bottle Caps and Aluminium Foil.", a.MSG_GAMEHELP_05 = "Hello, help me to recycle the GLASS wastes:", a.MSG_GAMEHELP_05A = "Bottled Drinks and Food Containers.", a.MSG_GAMEHELP_05B = "Bottles of Medicine and Hygiene Products.", a.MSG_GAMEHELP_05C = "Shards of Glass.", a.MSG_GAMEHELP_06 = "Hello, help us to recycle the wastes:", a.MSG_GAMEHELP_06A = "Paper wastes in the Blue Bin.", a.MSG_GAMEHELP_06B = "Plastic wastes in the Red Bin.",
            a.MSG_GAMEHELP_06C = "In case of doubts, click ? in top of the screen.", a.MSG_GAMEHINT_01 = "Point and click a waste to the bin collect it!", a.MSG_GAMEHINT_02 = "Prevent wastes are taken by water!", a.MSG_GAMEHINT_03 = "Collect the waste in the air for extra score!", a.MSG_GAMEHINT_04 = "Click the bin want to select it!", a.MSG_GAMEHINT_05 = "Recycle the waste properly according to the type of bin!", a.MSG_ECOHINT_01 = ["Recycling a single aluminum can would run a TV for three hours.", "www.amigosdofuturo.org.br"],
            a.MSG_ECOHINT_02 = ["Recycling one ton of plastic saves 16 barrels of oil.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_03 = ["The energy saved from recycling one glass bottle will operate a 100-watt light bulb for four hours.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_04 = ["Glass is 100% recyclable.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_05 = ["Recycling one ton of paper saves 17 trees from felling.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_06 = ["An aluminum can be recycled countless times without losing its original properties.",
                "www.amigosdofuturo.org.br"
            ], a.MSG_ECOHINT_07 = ["One ton of recycled paper saves 2.5 barrels of oil used in its manufacture.", "www.amigosdofuturo.org.br"], a.MSG_ECOHINT_08 = ["Twelve to 24 trees must be cut down to make one ton of paper.", "www.ecocycle.org"], a.MSG_ECOHINT_09 = ["Industrialized countries, with 20% of the world\u2019s population, consume 87% of the world\u2019s printing and writing paper.", "www.ecocycle.org"], a.MSG_ECOHINT_10 = ["Recycling saves 3-5 times the power required at incineration plants.",
                "www.ecocycle.org"
            ], a.MSG_ECOHINT_11 = ["Recycling saves 40-75% of the energy needed to produce pure steel.", "www.ecocycle.org"], a.MSG_ECOHINT_12 = ["Printing and writing papers can be recycled 7-12 times before the fibers become too short to use.", "www.ecocycle.org"], a.MSG_ECOHINT_13 = ["Steel is the most recycled material worldwide.", "www.ecocycle.org"], a.MSG_ECOHINT_14 = ["It only takes about 6 weeks total to manufacture, fill, sell, recycle, and then remanufacture an aluminum beverage can.", "www.ecocycle.org"],
            a.MSG_ECOHINT_15 = ["Recycling one ton of paper can save 7000 gallons of water.", "www.ecocycle.org"], a.MSG_ECOHINT_16 = ["More than 40% of the industrial wood harvest is currently used to make paper.", "www.ecocycle.org"], a.MSG_ECOHINT_17 = ["Nearly 90% of what we throw away could potentially be recovered through reuse, recycling or composting.", "www.ecocycle.org"], a.MSG_ECOHINT_18 = ["Using recycled cans instead of extracting ore to make aluminum cans produces 95% less air pollution and 97% less water pollution.",
                "www.ecocycle.org"
            ]);
        navigator.isCocoonJS || (document.getElementById("contentSiteEN") && (document.getElementById("contentSiteEN").style.display = "none"), document.getElementById("contentSitePT") && (document.getElementById("contentSitePT").style.display = "none"), document.getElementById("contentSiteES") && (document.getElementById("contentSiteES").style.display = "none"), document.getElementById("footerMore") && (footerMore.innerHTML = "| " + a.MORE_INFO + " |"))
    };
    b.Audio.isPlayback = !1;
    b.Audio.playMusic = function (c) {
        me.sys.sound &&
            me.audio.isAudioEnable() && !b.Audio.isPlayback && (b.Audio.isPlayback = !0, me.audio.playTrack(c))
    };
    b.Audio.stopMusic = function (c) {
        b.Audio.isPlayback = !1;
        me.audio.stopTrack(c)
    };
    b.Audio.enable = function () {
        me.audio.enable();
        b.Audio.playMusic("INTRO");
        me.sys.localStorage && localStorage.setItem("AUDIO", "on")
    };
    b.Audio.disable = function () {
        b.Audio.stopMusic("INTRO");
        me.audio.disable();
        me.sys.localStorage && localStorage.setItem("AUDIO", "off")
    };
    u = me.ObjectEntity.extend({
        init: function (c, a, b) {
            b.image = "BIN_" + b.wastetype;
            b.spritewidth = 64;
            b.spriteheight = 128;
            this.parent(c, a, b);
            this.selected = !1;
            this.wasteType = b.wastetype;
            this.status = "IDLE";
            this.specialFps = this.animFps = this.animPos = 1;
            this.origPos = new me.Vector2d(c, a);
            this.coverPos = new me.Vector2d(this.pos.x + this.hWidth, this.pos.y + 20);
            this.eyesPos = new me.Vector2d(this.coverPos.x - 24, this.pos.y + 50);
            this.mouthPos = new me.Vector2d(this.coverPos.x - 12, this.pos.y + 80);
            this.handRightPos = new me.Vector2d(this.coverPos.x - 60, this.coverPos.y + 58);
            this.handLeftPos = new me.Vector2d(this.coverPos.x +
                35, this.coverPos.y + 58);
            this.scorePos = new me.Vector2d(this.pos.x + this.hWidth, ~~(this.pos.y - this.height / 4));
            this.collidable = !1;
            this.renderable.animationspeed = 6;
            this.renderable.addAnimation("normal", [0]);
            this.renderable.addAnimation("open", [1, 1, 1]);
            this.renderable.addAnimation("crazy", [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
            this.renderable.setCurrentAnimation("normal");
            this.cursor = new Y(this.coverPos.x - 16, this.pos.y - 56);
            me.game.add(this.cursor, 4);
            this.score = new Z(this.coverPos.x, this.pos.y -
                62);
            me.game.add(this.score, 4);
            this.eyes = new $(this.eyesPos.x, this.eyesPos.y);
            me.game.add(this.eyes, 5);
            this.mouth = new aa(this.mouthPos.x, this.mouthPos.y);
            me.game.add(this.mouth, 5);
            this.handRight = new z(this.coverPos.x, this.coverPos.y, this.handRightPos, this.name, -1, b.wastetype);
            me.game.add(this.handRight, 6);
            this.handLeft = new z(this.coverPos.x, this.coverPos.y, this.handLeftPos, this.name, 1, b.wastetype);
            me.game.add(this.handLeft, 6)
        },
        update: function () {
            switch (this.status) {
                case "IDLE":
                    this.doAnimRandom();
                    break;
                case "STUCK":
                    this.doAnimStuck();
                    break;
                case "CRAZY":
                    this.doAnimCrazy()
            }
            this.parent();
            return !0
        },
        draw: function (c) {
            b.Level.showHelp && h(c, 22, "#000000", "#FFFFFF", "center", a[this.wasteType], this.origPos.x + this.hWidth, this.origPos.y + 160);
            this.parent(c)
        },
        doSelect: function (c) {
            this.selected = c;
            this.cursor.visible = c && 5 < b.Level.getLevel;
            this.handRight.z = c ? this.handLeft.z = 7 : this.handLeft.z = 6;
            me.game.sort()
        },
        doAnimSelect: function () {
            this.animFps = 1;
            this.status = "BUSY";
            this.renderable.setCurrentAnimation("open", "normal");
            this.eyes.setCurrentAnimation("top", "normal");
            this.mouth.setCurrentAnimation("happy", "normal");
            me.audio.play(this.wasteType);
            this.status = "IDLE"
        },
        doAnimArm: function () {
            this.animFps = 1;
            this.status = "MOVE";
            this.renderable.setCurrentAnimation("normal");
            this.mouth.setCurrentAnimation("happy", "normal");
            "IDLE" !== this.handLeft.status ? this.handLeft.clickPos.y < this.pos.y - 100 ? this.eyes.setCurrentAnimation("blink", "up") : this.handLeft.clickPos.y > this.pos.y + 200 ? this.eyes.setCurrentAnimation("blink", "down") : this.eyes.setCurrentAnimation("blink",
                "left") : this.handRight.clickPos.y < this.pos.y - 100 ? this.eyes.setCurrentAnimation("blink", "up") : this.handRight.clickPos.y > this.pos.y + 200 ? this.eyes.setCurrentAnimation("blink", "down") : this.eyes.setCurrentAnimation("blink", "right");
            me.audio.play("SLIDE")
        },
        doAnimRandom: function () {
            if (0 === this.animFps++ % 400) switch (this.animFps = 1, Number.prototype.random(0, 4)) {
                case 1:
                    this.eyes.setCurrentAnimation("blink", "normal");
                    break;
                case 2:
                    this.eyes.setCurrentAnimation("leftright", "normal");
                    this.mouth.setCurrentAnimation("serious",
                        "normal");
                    break;
                case 3:
                    this.eyes.setCurrentAnimation("updown", "normal");
                    this.mouth.setCurrentAnimation("serious", "normal");
                    break;
                case 4:
                    this.eyes.setCurrentAnimation("blink", "normal")
            }
        },
        doAnimScore: function (c) {
            this.status = "BUSY";
            this.animFps = 1;
            var a = this;
            this.renderable.setCurrentAnimation("open", function () {
                a.renderable.setCurrentAnimation("normal");
                a.status = "IDLE"
            });
            this.eyes.setCurrentAnimation("top", "normal");
            this.mouth.setCurrentAnimation("happy", "normal");
            this.score.start("#52C407", 500, 0.6);
            b.Level.Manager.addScore(500);
            me.audio.play(this.wasteType)
        },
        doAnimCrazy: function () {
            this.animFps = 1;
            "CRAZY" !== this.status && (this.status = "CRAZY", this.score.start("#E10D0D", 5E3, 1.2), b.Level.Manager.addScore(5E3), t(this.coverPos.x, this.coverPos.y, "starbin", 20, 5, 25), me.audio.play("YEEHA"));
            0 !== this.specialFps++ % 180 ? (this.renderable.setCurrentAnimation("crazy"), this.eyes.setCurrentAnimation("crazy"), this.mouth.setCurrentAnimation("crazy"), this.animPos = 0 < this.animPos ? -2 : 2, this.pos.y += this.animPos, this.eyes.pos.y +=
                this.animPos, this.mouth.pos.y += this.animPos, this.handLeft.binPos.y += this.animPos, this.handLeft.pos.y += this.animPos, this.handRight.binPos.y += this.animPos, this.handRight.pos.y += this.animPos) : this.doAnimReset()
        },
        doAnimStuck: function () {
            this.animFps = 1;
            "STUCK" !== this.status && (this.status = "STUCK", me.audio.play("SHAKE"));
            0 !== this.specialFps++ % 300 ? (this.renderable.setCurrentAnimation("open"), this.eyes.setCurrentAnimation("leftright"), this.mouth.setCurrentAnimation("scare"), this.animPos = 0 < this.animPos ? -2 : 2,
                this.pos.x += this.animPos, this.eyes.pos.x += this.animPos, this.mouth.pos.x += this.animPos, this.handLeft.binPos.x += this.animPos, this.handLeft.pos.x += this.animPos, this.handRight.binPos.x += this.animPos, this.handRight.pos.x += this.animPos) : this.doAnimReset()
        },
        doAnimReset: function () {
            this.specialFps = 1;
            this.status = "IDLE";
            this.renderable.setCurrentAnimation("normal");
            this.eyes.setCurrentAnimation("blink", "normal");
            this.mouth.setCurrentAnimation("normal");
            this.pos.x = this.origPos.x;
            this.pos.y = this.origPos.y;
            this.eyes.pos.x =
                this.eyesPos.x;
            this.eyes.pos.y = this.eyesPos.y;
            this.mouth.pos.x = this.mouthPos.x;
            this.mouth.pos.y = this.mouthPos.y;
            this.handLeft.binPos.x = this.coverPos.x + 30;
            this.handLeft.binPos.y = this.coverPos.y + 56;
            this.handLeft.pos.x = this.handLeftPos.x;
            this.handLeft.pos.y = this.handLeftPos.y;
            this.handRight.binPos.x = this.coverPos.x - 30;
            this.handRight.binPos.y = this.coverPos.y + 56;
            this.handRight.pos.x = this.handRightPos.x;
            this.handRight.pos.y = this.handRightPos.y
        },
        onDestroyEvent: function () {
            this.cursor = this.score = this.eyes =
                this.mouth = this.handRight = this.handLeft = null
        }
    });
    var $ = me.AnimationSheet.extend({
        init: function (c, a) {
            this.parent(c, a, me.loader.getImage("BIN_EYES"), 48);
            this.animationspeed = 6;
            this.addAnimation("normal", [0]);
            this.addAnimation("up", [2]);
            this.addAnimation("down", [3]);
            this.addAnimation("left", [4]);
            this.addAnimation("right", [5]);
            this.addAnimation("top", [2, 2, 2, 1, 1, 1]);
            this.addAnimation("blink", [1, 1, 1]);
            this.addAnimation("leftright", [4, 4, 4, 5, 5, 5]);
            this.addAnimation("updown", [2, 2, 2, 3, 3, 3]);
            this.addAnimation("crazy", [4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 2, 5, 3]);
            this.setCurrentAnimation("normal")
        }
    }),
        aa = me.AnimationSheet.extend({
            init: function (c, a) {
                this.parent(c, a, me.loader.getImage("BIN_MOUTH"), 24);
                this.animationspeed = 6;
                this.addAnimation("normal", [0]);
                this.addAnimation("happy", [1, 1, 1, 1, 1, 1]);
                this.addAnimation("serious", [2, 2, 2, 2, 2, 2]);
                this.addAnimation("scare", [3, 3, 3, 3, 3, 3]);
                this.addAnimation("crazy", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
                this.setCurrentAnimation("normal")
            }
        }),
        Y = me.AnimationSheet.extend({
            init: function (c,
                a) {
                this.parent(c, a, me.loader.getImage("BIN_CURSOR"), 32, 64);
                this.visible = !1;
                this.animationspeed = 8;
                this.addAnimation("idle", [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1]);
                this.setCurrentAnimation("idle")
            }
        }),
        Z = me.Renderable.extend({
            init: function (c, a) {
                this.pos = new me.Vector2d(c, a);
                this.posText = a;
                this.score = 0;
                this.fps = 1;
                this.fpsTime = 0;
                this.visible = !1;
                this.style = null;
                this.parent(this.pos, 300, 80)
            },
            update: function () {
                this.visible && (0 === this.fps++ % (60 * this.fpsTime) ? this.visible = !1 : this.posText--);
                return !0
            },
            draw: function (c) {
                h(c,
                    26, "#000000", this.style, "center", this.score, this.pos.x, this.posText)
            },
            start: function (c, a, b) {
                this.score = a;
                this.style = c;
                this.posText = this.pos.y;
                this.visible = !0;
                this.fpsTime = b;
                this.fps = 1
            }
        }),
        z = me.ObjectEntity.extend({
            init: function (c, a, e, d, g, h) {
                this.parent(c, a, {
                    image: "BIN_HAND",
                    spritewidth: 24,
                    spriteheight: 24
                });
                this.wasteType = h;
                this.binName = d;
                this.armStep = this.armDist = this.armRatio = 0;
                this.idleAngle = 0 < g ? 0.8 : 2.2;
                this.idlePos = new me.Vector2d(e.x, e.y);
                this.idleOrig = new me.Vector2d(e.x, e.y);
                this.binPos = new me.Vector2d(c +
                    30 * g, a + 56);
                this.coverPos = new me.Vector2d(c, a);
                this.clickPos = new me.Vector2d(0, 0);
                this.armDelta = new me.Vector2d(0, 0);
                this.armVel = ~~(b.Level.getCurrent().discardSpeed / 2) + 5;
                this.status = "IDLE";
                this.collidable = this.armWater = !1;
                this.renderable.animationspeed = 6;
                this.renderable.addAnimation("idle", [0]);
                this.renderable.addAnimation("move", [0, 1, 2]);
                this.renderable.addAnimation("take", [2]);
                this.renderable.setCurrentAnimation("idle");
                this.pos.x = this.idlePos.x;
                this.pos.y = this.idlePos.y;
                this.renderable.angle = this.idleAngle
            },
            update: function () {
                switch (this.status) {
                    case "MOVE":
                        this.move();
                        break;
                    case "BACK":
                        this.back();
                        break;
                    case "TAKE":
                        this.take()
                }
                this.parent();
                return !0
            },
            draw: function (c) {
                c.strokeStyle = "#000000";
                c.lineWidth = 5;
                c.beginPath();
                c.moveTo(this.binPos.x, this.binPos.y);
                c.lineTo(this.pos.x + this.hWidth, this.pos.y + this.hHeight);
                c.stroke();
                this.parent(c)
            },
            start: function (c, a) {
                this.clickPos.x = c;
                this.clickPos.y = a;
                this.armDelta.x = this.clickPos.x - this.pos.x;
                this.armDelta.y = this.clickPos.y - this.pos.y;
                this.armDist = Math.sqrt(this.armDelta.x *
                    this.armDelta.x + this.armDelta.y * this.armDelta.y);
                this.renderable.angle = Math.atan2(this.armDelta.y, this.armDelta.x);
                this.armWater = !1;
                this.status = "MOVE";
                this.renderable.setCurrentAnimation("move");
                b.Bin[this.binName].doAnimArm()
            },
            move: function () {
                this.pos.x >= this.clickPos.x - this.armVel && this.pos.x <= this.clickPos.x + this.armVel && (this.pos.y >= this.clickPos.y - this.armVel && this.pos.y <= this.clickPos.y + this.armVel) && (this.status = "TAKE");
                this.armStep += this.armVel;
                this.armRatio = this.armStep / this.armDist;
                this.pos.x = ~~(this.idlePos.x + this.armRatio * this.armDelta.x);
                this.pos.y = ~~(this.idlePos.y + this.armRatio * this.armDelta.y);
                this.checkWater()
            },
            back: function () {
                this.pos.x >= this.idlePos.x - this.armVel && this.pos.x <= this.idlePos.x + this.armVel && (this.pos.y >= this.idlePos.y - this.armVel && this.pos.y <= this.idlePos.y + this.armVel) && (this.idlePos.x = this.idleOrig.x, this.idlePos.y = this.idleOrig.y, this.pos.x = this.idlePos.x, this.pos.y = this.idlePos.y, this.renderable.angle = this.idleAngle, this.status = "IDLE", this.renderable.setCurrentAnimation("idle"),
                    "MOVE" === b.Bin[this.binName].status && b.Bin[this.binName].doAnimReset());
                this.armStep -= this.armVel;
                this.armRatio = this.armStep / this.armDist;
                this.pos.x = ~~(this.idlePos.x + this.armRatio * this.armDelta.x);
                this.pos.y = ~~(this.idlePos.y + this.armRatio * this.armDelta.y);
                this.checkWater()
            },
            take: function () {
                null !== me.game.collide(this) && (this.armDelta.x = this.clickPos.x - this.coverPos.x, this.armDelta.y = this.clickPos.y - this.coverPos.y, this.armDist = Math.sqrt(this.armDelta.x * this.armDelta.x + this.armDelta.y * this.armDelta.y),
                    this.idlePos.x = this.coverPos.x, this.idlePos.y = this.coverPos.y, this.renderable.setCurrentAnimation("take"));
                this.armWater = !1;
                this.status = "BACK"
            },
            checkWater: function () {
                var c = b.Water.wavesField[~~(this.pos.y / b.Water.getWidth)];
                !this.armWater && (this.pos.y >= c.posY - this.hHeight && this.pos.y <= c.posY + this.hHeight) && (b.Water.wavesField[~~(this.pos.x / b.Water.getWidth) + 1].vel = 15, t(this.pos.x, c.posY - this.hHeight, "droplet", 8, 5, 8), this.armWater = !0)
            }
        }),
        O = u.extend({
            init: function (c, a, b) {
                this.parent(c, a, b);
                this.doSelect(!0)
            }
        }),
        P = u.extend({
            init: function (c, a, b) {
                this.parent(c, a, b)
            }
        }),
        Q = u.extend({
            init: function (c, a, b) {
                this.parent(c, a, b)
            }
        }),
        R = u.extend({
            init: function (c, a, b) {
                this.parent(c, a, b)
            }
        }),
        S = u.extend({
            init: function (c, a, b) {
                this.parent(c, a, b)
            }
        }),
        ba = Object.extend({
            init: function () {
                this.selectedBin = b.Bin.bin1;
                me.input.registerMouseEvent("mousedown", me.game.viewport, this.onMouseDown.bind(this))
            },
            destroy: function () {
                this.onDestroyEvent.apply(this, arguments)
            },
            update: function () {
                return !1
            },
            onMouseDown: function () {
                if (me.state.isRunning()) {
                    if (!b.Hud.Menu.containsPoint(me.input.mouse.pos) &&
                        (!b.Hud.Help || !b.Hud.Help.containsPoint(me.input.mouse.pos))) {
                        for (var c = 1; 6 > c; c++)
                            if (void 0 !== b.Bin["bin" + c]) {
                                if (b.Bin["bin" + c].collisionBox.containsPoint(me.input.mouse.pos) && "IDLE" === b.Bin["bin" + c].status) return this.selectedBin = b.Bin["bin" + c], b.Bin.bin1.doSelect(!1), void 0 !== b.Bin.bin2 && b.Bin.bin2.doSelect(!1), void 0 !== b.Bin.bin3 && b.Bin.bin3.doSelect(!1), void 0 !== b.Bin.bin4 && b.Bin.bin4.doSelect(!1), void 0 !== b.Bin.bin5 && b.Bin.bin5.doSelect(!1), this.selectedBin.doSelect(!0), this.selectedBin.doAnimSelect(), !0
                            } else break;
                        if ("IDLE" === this.selectedBin.status && 0 < me.input.mouse.pos.x) return me.input.mouse.pos.x <= this.selectedBin.pos.x + this.selectedBin.hWidth ? this.selectedBin.handRight.start(me.input.mouse.pos.x, me.input.mouse.pos.y) : this.selectedBin.handLeft.start(me.input.mouse.pos.x, me.input.mouse.pos.y), !0
                    }
                } else return !0;
                return !1
            },
            onDestroyEvent: function () {
                me.input.releaseMouseEvent("mousedown", me.game.viewport);
                this.selectedBin = null
            }
        }),
        y = {
            TYPES: ["PAPER", "PLASTIC", "ORGANIC", "METAL", "GLASS"],
            PAPER: [{
                name: "A01",
                sink: !1,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "A02",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "A03",
                sink: !1,
                weight: 1,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "A04",
                sink: !1,
                weight: 2,
                collision: {
                    x: 2,
                    w: 60,
                    y: 2,
                    h: 60
                }
            }, {
                name: "A05",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "A06",
                sink: !1,
                weight: 1,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "A07",
                sink: !1,
                weight: 1,
                collision: {
                    x: 12,
                    w: 40,
                    y: 12,
                    h: 40
                }
            }, {
                name: "A08",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }],
            PLASTIC: [{
                name: "B01",
                sink: !1,
                weight: 2,
                collision: {
                    x: 4,
                    w: 56,
                    y: 4,
                    h: 56
                }
            }, {
                name: "B02",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "B03",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "B04",
                sink: !1,
                weight: 1,
                collision: {
                    x: 4,
                    w: 56,
                    y: 4,
                    h: 56
                }
            }, {
                name: "B05",
                sink: !1,
                weight: 1,
                collision: {
                    x: 12,
                    w: 40,
                    y: 12,
                    h: 40
                }
            }, {
                name: "B06",
                sink: !1,
                weight: 1,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "B07",
                sink: !1,
                weight: 1,
                collision: {
                    x: 12,
                    w: 40,
                    y: 12,
                    h: 40
                }
            }, {
                name: "B08",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "B09",
                sink: !1,
                weight: 2,
                collision: {
                    x: 2,
                    w: 60,
                    y: 2,
                    h: 60
                }
            }],
            ORGANIC: [{
                name: "C01",
                sink: !1,
                weight: 1,
                collision: {
                    x: 14,
                    w: 36,
                    y: 14,
                    h: 36
                }
            }, {
                name: "C02",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "C03",
                sink: !0,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "C04",
                sink: !1,
                weight: 1,
                collision: {
                    x: 16,
                    w: 32,
                    y: 16,
                    h: 32
                }
            }, {
                name: "C05",
                sink: !0,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "C06",
                sink: !0,
                weight: 2,
                collision: {
                    x: 12,
                    w: 40,
                    y: 12,
                    h: 40
                }
            }, {
                name: "C07",
                sink: !1,
                weight: 1,
                collision: {
                    x: 14,
                    w: 36,
                    y: 14,
                    h: 36
                }
            }, {
                name: "C08",
                sink: !1,
                weight: 1,
                collision: {
                    x: 8,
                    w: 48,
                    y: 8,
                    h: 48
                }
            }],
            METAL: [{
                name: "D01",
                sink: !1,
                weight: 1,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "D02",
                sink: !1,
                weight: 1,
                collision: {
                    x: 8,
                    w: 48,
                    y: 8,
                    h: 48
                }
            }, {
                name: "D03",
                sink: !0,
                weight: 1,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "D04",
                sink: !1,
                weight: 1,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "D05",
                sink: !0,
                weight: 1,
                collision: {
                    x: 8,
                    w: 48,
                    y: 8,
                    h: 48
                }
            }, {
                name: "D06",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "D07",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "D08",
                sink: !0,
                weight: 1,
                collision: {
                    x: 8,
                    w: 48,
                    y: 8,
                    h: 48
                }
            }, {
                name: "D09",
                sink: !0,
                weight: 3,
                collision: {
                    x: 2,
                    w: 60,
                    y: 2,
                    h: 60
                }
            }],
            GLASS: [{
                name: "E01",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "E02",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "E03",
                sink: !0,
                weight: 2,
                collision: {
                    x: 4,
                    w: 56,
                    y: 4,
                    h: 56
                }
            }, {
                name: "E04",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }, {
                name: "E05",
                sink: !0,
                weight: 2,
                collision: {
                    x: 4,
                    w: 56,
                    y: 4,
                    h: 56
                }
            }, {
                name: "E06",
                sink: !0,
                weight: 3,
                collision: {
                    x: 2,
                    w: 60,
                    y: 2,
                    h: 60
                }
            }, {
                name: "E07",
                sink: !0,
                weight: 2,
                collision: {
                    x: 10,
                    w: 44,
                    y: 10,
                    h: 44
                }
            }, {
                name: "E08",
                sink: !0,
                weight: 2,
                collision: {
                    x: 6,
                    w: 52,
                    y: 6,
                    h: 52
                }
            }]
        }, T = me.ObjectEntity.extend({
            init: function (c, a, b, d, g, h, f, k) {
                var l = {};
                l.image = "WASTE_" + f;
                l.spritewidth = 64;
                l.spriteheight = 64;
                this.parent(c, a, l);
                this.alwaysUpdate = !0;
                this.waste = y[f][k];
                this.wasteType = f;
                this.hand = null;
                this.status = "AIR";
                this.fps = 0;
                this.round = Math.round;
                this.calcTrajectory(b, d, g, h);
                this.updateColRect(this.waste.collision.x, this.waste.collision.w, this.waste.collision.y, this.waste.collision.h);
                this.collidable = !0;
                this.renderable.addAnimation("waste", [k]);
                this.renderable.setCurrentAnimation("waste")
            },
            update: function () {
                if (this.pos.y > me.game.viewport.getHeight() || this.pos.x > me.game.viewport.getWidth() || -50 > this.pos.x) return me.game.remove(this), me.gamestat.updateValue("discarded", 1), b.Level.Manager.checkEndLevel(), !1;
                switch (this.status) {
                    case "AIR":
                        this.moveAir();
                        break;
                    case "WATER":
                        this.moveWater();
                        break;
                    case "BIN_AIR":
                        this.moveBin(!0);
                        break;
                    case "BIN_WATER":
                        this.moveBin(!1);
                        break;
                    case "THROW":
                        this.throwOff()
                }
                this.parent();
                return !0
            },
            onCollision: function (c,
                a) {
                this.hand = a;
                this.collidable = !1;
                this.status = "BIN_" + this.status
            },
            calcTrajectory: function (c, a, e, d) {
                this.vel.x = -Math.sin(Number.prototype.degToRad(e)) * c * d;
                this.vel.y = -Math.cos(Number.prototype.degToRad(e)) * a;
                this.rotation = 16 - 2 * this.waste.weight;
                this.flowSpeed = 2 * (this.waste.weight / 5 + b.Level.getCurrent().discardSpeed / 10)
            },
            moveAir: function () {
                var c = b.Water.wavesField[~~(this.pos.x / b.Water.getWidth)];
                !c || this.pos.y < c.posY - this.hHeight ? 0 === this.fps++ % 3 && (this.fps = 1, this.vel.y += this.gravity, this.pos.x += this.vel.x,
                    this.pos.y += this.vel.y, this.renderable.angle += Number.prototype.degToRad(this.rotation)) : (b.Water.wavesField[~~(this.pos.x / b.Water.getWidth) + 1].vel = 5 * this.waste.weight + 30, t(this.pos.x + this.hWidth, c.posY - 16, "droplet", 2 * this.waste.weight + 10, this.waste.weight + 4, 2 * this.waste.weight + 10), me.audio.play("WATER"), this.status = "WATER")
            },
            moveWater: function () {
                var c = b.Water.wavesField[~~(this.pos.x / b.Water.getWidth)];
                this.waste.sink ? this.pos.y += this.flowSpeed : (this.pos.x += this.flowSpeed, this.pos.y = this.round(c.posY -
                    this.hHeight))
            },
            moveBin: function (c) {
                "BACK" === this.hand.status ? (this.pos.x = this.hand.pos.x + this.hand.hWidth - this.hWidth, this.pos.y = this.hand.pos.y + this.hand.hHeight - this.hHeight) : this.wasteType === this.hand.wasteType ? (c ? b.Bin[this.hand.binName].doAnimCrazy() : b.Bin[this.hand.binName].doAnimScore(), this.status = "REMOVE", me.game.remove(this)) : this.status = "THROW"
            },
            throwOff: function () {
                this.calcTrajectory(50, 20, 20, this.pos.x < me.game.viewport.getWidth() / 2 ? 1 : -1);
                this.status = "AIR";
                b.Bin[this.hand.binName].doAnimStuck()
            },
            onDestroyEvent: function () {
                this.hand = null
            }
        }),
        ca = Object.extend({
            init: function () {
                this.alwaysUpdate = !0;
                this.wasteItem = this.lastItem = this.fps = 0;
                this.wasteType = null;
                this.throwTime = 60 * b.Level.getCurrent().throwTime;
                this.wasteGenerated = b.Level.getCurrent().wasteGenerated
            },
            update: function () {
                if (me.gamestat.getItemValue("generated") < this.wasteGenerated) {
                    if (0 === this.fps++ % this.throwTime) {
                        me.gamestat.updateValue("generated", 1);
                        for (this.wasteType = y.TYPES[b.Level.getCurrent().bins[Number.prototype.random(0, b.Level.getCurrent().bins.length -
                            1)]]; this.wasteItem === this.lastItem;) this.wasteItem = Number.prototype.random(0, y[this.wasteType].length - 1);
                        this.lastItem = this.wasteItem;
                        3 < [Number.prototype.random(1, 6)] ? me.game.add(me.entityPool.newInstanceOf("WASTES", 1E3, 300, Number.prototype.random(30, 50), Number.prototype.random(20, 25), Number.prototype.random(18, 22), 1, this.wasteType, this.wasteItem), 8) : me.game.add(me.entityPool.newInstanceOf("WASTES", -50, 300, Number.prototype.random(10, 30), Number.prototype.random(15, 20), Number.prototype.random(18, 22), -1, this.wasteType, this.wasteItem), 8);
                        me.game.sort();
                        me.audio.play("LAUNCH");
                        this.fps = 1;
                        return !0
                    }
                } else me.game.remove(this, !0);
                return !1
            }
        }),
        f = {
            S001: [
                [0], {
                    name: "L01",
                    bins: [0],
                    wasteCollected: 10,
                    wasteGenerated: 25,
                    throwTime: 5,
                    discardSpeed: 0.5,
                    waterPos: 460
                }, {
                    name: "L02",
                    bins: [1],
                    wasteCollected: 12,
                    wasteGenerated: 25,
                    throwTime: 5,
                    discardSpeed: 0.5,
                    waterPos: 460
                }, {
                    name: "L03",
                    bins: [2],
                    wasteCollected: 14,
                    wasteGenerated: 28,
                    throwTime: 5,
                    discardSpeed: 0.5,
                    waterPos: 460
                }, {
                    name: "L04",
                    bins: [3],
                    wasteCollected: 16,
                    wasteGenerated: 32,
                    throwTime: 5,
                    discardSpeed: 0.5,
                    waterPos: 460
                }, {
                    name: "L05",
                    bins: [4],
                    wasteCollected: 18,
                    wasteGenerated: 36,
                    throwTime: 5,
                    discardSpeed: 0.5,
                    waterPos: 460
                }, {
                    name: "L06",
                    bins: [0, 1],
                    wasteCollected: 20,
                    wasteGenerated: 36,
                    throwTime: 4.5,
                    discardSpeed: 1,
                    waterPos: 460
                }, {
                    name: "L07",
                    bins: [0, 2],
                    wasteCollected: 22,
                    wasteGenerated: 36,
                    throwTime: 4.5,
                    discardSpeed: 1,
                    waterPos: 460
                }, {
                    name: "L08",
                    bins: [1, 3],
                    wasteCollected: 24,
                    wasteGenerated: 40,
                    throwTime: 4.5,
                    discardSpeed: 1,
                    waterPos: 460
                }, {
                    name: "L09",
                    bins: [2, 4],
                    wasteCollected: 26,
                    wasteGenerated: 43,
                    throwTime: 4.5,
                    discardSpeed: 1,
                    waterPos: 460
                }, {
                    name: "L10",
                    bins: [3, 4],
                    wasteCollected: 28,
                    wasteGenerated: 46,
                    throwTime: 4.5,
                    discardSpeed: 1,
                    waterPos: 460
                }, {
                    name: "L11",
                    bins: [0, 1, 3],
                    wasteCollected: 30,
                    wasteGenerated: 46,
                    throwTime: 4,
                    discardSpeed: 1.5,
                    waterPos: 460
                }, {
                    name: "L12",
                    bins: [0, 2, 4],
                    wasteCollected: 32,
                    wasteGenerated: 49,
                    throwTime: 4,
                    discardSpeed: 1.5,
                    waterPos: 460
                }, {
                    name: "L13",
                    bins: [1, 2, 3],
                    wasteCollected: 34,
                    wasteGenerated: 52,
                    throwTime: 4,
                    discardSpeed: 1.5,
                    waterPos: 460
                }, {
                    name: "L14",
                    bins: [0, 1, 4],
                    wasteCollected: 36,
                    wasteGenerated: 55,
                    throwTime: 4,
                    discardSpeed: 1.5,
                    waterPos: 460
                }, {
                    name: "L15",
                    bins: [2, 3, 4],
                    wasteCollected: 38,
                    wasteGenerated: 58,
                    throwTime: 4,
                    discardSpeed: 1.5,
                    waterPos: 460
                }, {
                    name: "L16",
                    bins: [0, 1, 3, 4],
                    wasteCollected: 40,
                    wasteGenerated: 58,
                    throwTime: 3.5,
                    discardSpeed: 2,
                    waterPos: 524
                }, {
                    name: "L17",
                    bins: [0, 1, 2, 3],
                    wasteCollected: 43,
                    wasteGenerated: 61,
                    throwTime: 3.5,
                    discardSpeed: 2,
                    waterPos: 524
                }, {
                    name: "L18",
                    bins: [1, 2, 3, 4],
                    wasteCollected: 46,
                    wasteGenerated: 64,
                    throwTime: 3.5,
                    discardSpeed: 2,
                    waterPos: 524
                }, {
                    name: "L19",
                    bins: [0, 1, 2, 4],
                    wasteCollected: 49,
                    wasteGenerated: 67,
                    throwTime: 3.5,
                    discardSpeed: 2,
                    waterPos: 524
                }, {
                    name: "L20",
                    bins: [0, 2, 3, 4],
                    wasteCollected: 52,
                    wasteGenerated: 70,
                    throwTime: 3.5,
                    discardSpeed: 2,
                    waterPos: 524
                }, {
                    name: "L21",
                    bins: [0, 1, 2, 3, 4],
                    wasteCollected: 60,
                    wasteGenerated: 75,
                    throwTime: 3,
                    discardSpeed: 2.5,
                    waterPos: 524
                }, {
                    name: "L22",
                    bins: [0, 1, 2, 3, 4],
                    wasteCollected: 80,
                    wasteGenerated: 92,
                    throwTime: 2.5,
                    discardSpeed: 2.5,
                    waterPos: 524
                }, {
                    name: "L23",
                    bins: [0, 1, 2, 3, 4],
                    wasteCollected: 100,
                    wasteGenerated: 110,
                    throwTime: 2.5,
                    discardSpeed: 3,
                    waterPos: 524
                }
            ],
            S002: []
        },
        W = Object.extend({
            init: function () {
                this.alwaysUpdate = !0;
                this.fps = this.scoreNew = this.scoreCount = this.scoreInc = 0;
                this.stats = null;
                this.newScore = !1;
                b.Level.getCurrent = function () {
                    return f[b.Level.getScenery][b.Level.getLevel]
                };
                b.Level.showHelp = !1;
                b.Level.lastHint = "00";
                this.changeScenery("S001")
            },
            update: function () {
                return 0 < this.scoreNew && 0 === this.fps++ % 2 ? (this.fps = 1, (this.scoreCount += this.scoreInc) <= this.scoreNew ? me.game.HUD.updateItemValue("score", this.scoreInc) : (this.scoreCount = this.scoreNew = 0, this.checkEndLevel()), !0) : !1
            },
            addScore: function (c) {
                this.scoreNew += c;
                this.scoreInc = 1E3 < this.scoreNew ? 100 : 25;
                me.game.HUD.updateItemValue("collected", 1);
                me.gamestat.updateValue("collected", 1);
                me.gamestat.updateValue("score", c)
            },
            checkEndLevel: function () {
                me.gamestat.getItemValue("collected") >= b.Level.getCurrent().wasteCollected ? (this.statsLevel(), this.resetLevel(), me.state.change(me.state.SUCCESS)) : me.gamestat.getItemValue("collected") + me.gamestat.getItemValue("discarded") >= b.Level.getCurrent().wasteGenerated && (this.resetStats(),
                    this.resetLevel(), me.state.change(me.state.FAILED))
            },
            statsLevel: function () {
                var c = b.Level.getCurrent().bins.length,
                    a = 500 * b.Level.getCurrent().wasteCollected,
                    e = 100 * (b.Level.getCurrent().wasteGenerated - b.Level.getCurrent().wasteCollected),
                    d = 100 * (b.Level.getCurrent().wasteGenerated - b.Level.getCurrent().wasteCollected - me.gamestat.getItemValue("discarded")) + me.gamestat.getItemValue("score"),
                    g = 0;
                a + e + (1E4 * c - 1E3 * c) <= d ? g = 3 : a + e + (5E3 * c - 500 * c) <= d ? g = 2 : a + e <= d && (g = 1);
                me.gamestat.setValue("score", d);
                me.gamestat.setValue("stars",
                    g);
                b.Level.newScore = !1;
                d > f[b.Level.getScenery][0][b.Level.getLevel][0] && (0 < f[b.Level.getScenery][0][b.Level.getLevel][0] && (b.Level.newScore = !0), f[b.Level.getScenery][0][b.Level.getLevel][0] = d, f[b.Level.getScenery][0][b.Level.getLevel][1] = g, this.setLocalStats(b.Level.getScenery))
            },
            resetLevel: function () {
                me.game.disableHUD();
                b.Level.showHelp = !1;
                b.Hud.Menu && me.game.remove(b.Hud.Menu);
                b.Hud.Help && me.game.remove(b.Hud.Help)
            },
            resetStats: function () {
                me.gamestat.reset();
                b.Level.newScore = !1
            },
            changeScenery: function (c) {
                b.Level.getScenery =
                    c;
                b.Level.getLevel = 1;
                this.getLocalStats(c)
            },
            getSceneryStats: function (c) {
                this.stats = [0, 0];
                for (var a = 1; a < f[c].length; a++) this.stats[0] += f[c][0][a][0], this.stats[1] += f[c][0][a][1];
                return this.stats
            },
            getLocalStats: function (a) {
                this.stats = null;
                f[a][0].length = 0;
                f[a][0].push([]);
                me.sys.localStorage && localStorage.getItem(a) && (this.stats = JSON.parse(x(localStorage.getItem(a))));
                for (var b = 1; b < f[a].length; b++) this.stats && this.stats[b] && 0 < this.stats[b][0] ? f[a][0].push(this.stats[b]) : f[a][0].push([0, 0])
            },
            setLocalStats: function (a) {
                me.sys.localStorage &&
                    localStorage.setItem(a, D(JSON.stringify(f[a][0])))
            }
        }),
        U = me.AnimationSheet.extend({
            init: function (a, b, e, d) {
                this.parent(a, b, me.loader.getImage("CLOUDS"), 128);
                this.alwaysUpdate = !0;
                this.vel = e;
                this.fps = 0;
                this.resize(d / 10);
                this.addAnimation("clouds", [0]);
                this.setCurrentAnimation("clouds")
            },
            update: function () {
                return 0 === this.fps++ % this.vel ? (this.pos.x++, this.pos.x > me.game.viewport.getWidth() && me.game.remove(this, !0), this.fps = 1, this.parent(), !0) : !1
            }
        }),
        A = Object.extend({
            init: function (a, b) {
                this.alwaysUpdate = !0;
                this.fps = this.nextCloud = 1;
                this.pos = a;
                this.zorder = b
            },
            update: function () {
                return 0 === this.fps++ % this.nextCloud ? (me.game.add(me.entityPool.newInstanceOf("CLOUDS", -128, this.pos + 30 * Number.prototype.random(-1, 1), Number.prototype.random(1, 4), Number.prototype.random(5, 10)), this.zorder), me.game.sort(), this.nextCloud = 60 * Number.prototype.random(5, 15), this.fps = 1, !0) : !1
            }
        }),
        da = me.Renderable.extend({
            init: function () {
                this.parent(new me.Vector2d(0, 0), 1, 1);
                this.waveCount = this.waveDir = 1;
                this.gradient = null;
                b.Water.WAVES =
                    64;
                b.Water.getWidth = ~~(me.game.viewport.getWidth() / b.Water.WAVES);
                b.Water.wavesField = [b.Water.WAVES + 1];
                this.waterPos = b.Level.getCurrent().waterPos;
                for (var a = 0; a <= b.Water.WAVES; a++) b.Water.wavesField[a] = {
                    posX: b.Water.getWidth * a,
                    posY: this.waterPos + Number.prototype.random(1E-4, 2E-4),
                    vel: 0
                }
            },
            destroy: function () {
                this.onDestroyEvent.apply(this, arguments)
            },
            update: function () {
                return !0
            },
            draw: function (a) {
                null === this.gradient && (this.gradient = a.createLinearGradient(0, this.waterPos, 0, me.game.viewport.getHeight()),
                    this.gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)"), this.gradient.addColorStop(0.05, "rgba(180, 200, 255, 0.3)"));
                a.fillStyle = this.gradient;
                a.beginPath();
                a.moveTo(0, this.waterPos);
                for (var m = 1; m < b.Water.WAVES; m++) b.Water.wavesField[m].vel += (b.Water.wavesField[m - 1].posY + b.Water.wavesField[m + 1].posY + this.waterPos) / 3 - b.Water.wavesField[m].posY, b.Water.wavesField[m].vel *= 0.71, b.Water.wavesField[m].posY += b.Water.wavesField[m].vel + Number.prototype.random(1E-4, 2E-4), a.quadraticCurveTo(b.Water.wavesField[m -
                    1].posX, b.Water.wavesField[m - 1].posY, (b.Water.wavesField[m - 1].posX + b.Water.wavesField[m].posX) / 2, (b.Water.wavesField[m - 1].posY + b.Water.wavesField[m].posY) / 2);
                a.quadraticCurveTo(b.Water.wavesField[b.Water.WAVES - 1].posX, b.Water.wavesField[b.Water.WAVES - 1].posY, b.Water.wavesField[b.Water.WAVES].posX, b.Water.wavesField[b.Water.WAVES].posY);
                b.Water.wavesField[0].posY = b.Water.wavesField[1].posY;
                b.Water.wavesField[b.Water.WAVES].posY = b.Water.wavesField[b.Water.WAVES - 1].posY;
                a.lineTo(me.game.viewport.getWidth(),
                    me.game.viewport.getHeight());
                a.lineTo(0, me.game.viewport.getHeight());
                a.closePath();
                a.fill();
                return !0
            },
            onDestroyEvent: function () {
                this.gradient = null
            }
        }),
        E = me.AnimationSheet.extend({
            init: function (a, m, e, d) {
                this.parent(a, m, me.loader.getImage("PARTICLES"), 16, 16);
                a = Number.prototype.random(30, 50);
                this.vel = new me.Vector2d(-Math.sin(Number.prototype.degToRad(a)) * e * Number.prototype.random(-2, 2), -Math.cos(Number.prototype.degToRad(a)) * d);
                this.resize(Number.prototype.random(3, 5) / 10);
                this.addAnimation("particle", [0]);
                this.setCurrentAnimation("particle");
                this.waterLayer = b.Water.wavesField[~~(this.pos.y / b.Water.getWidth)]
            },
            update: function () {
                if (0 < this.pos.y && this.pos.y < this.waterLayer.posY && 0 < this.pos.x && this.pos.x < me.game.viewport.getWidth()) return this.vel.y += me.sys.gravity, this.pos.x += this.vel.x, this.pos.y += this.vel.y, this.parent(), !0;
                me.game.remove(this, !0);
                return !1
            }
        }),
        F = me.AnimationSheet.extend({
            init: function (a, m, e, d) {
                this.parent(a, m, me.loader.getImage("PARTICLES"), 16, 16);
                a = Number.prototype.random(30, 50);
                this.vel = new me.Vector2d(-Math.sin(Number.prototype.degToRad(a)) * e * Number.prototype.random(-3, 3), -Math.cos(Number.prototype.degToRad(a)) * d);
                this.resize(Number.prototype.random(6, 10) / 10);
                this.addAnimation("particle", [Number.prototype.random(1, 3)]);
                this.setCurrentAnimation("particle");
                this.waterLayer = b.Water.wavesField[~~(this.pos.y / b.Water.getWidth)]
            },
            update: function () {
                if (0 < this.pos.y && this.pos.y < this.waterLayer.posY && 0 < this.pos.x && this.pos.x < me.game.viewport.getWidth()) return this.vel.y += me.sys.gravity,
                this.pos.x += this.vel.x, this.pos.y += this.vel.y, this.parent(), !0;
                me.game.remove(this, !0);
                return !1
            }
        }),
        G = me.AnimationSheet.extend({
            init: function (a, b, e, d) {
                this.parent(a, b, me.loader.getImage("PARTICLES"), 16, 16);
                a = Number.prototype.random(30, 50);
                this.vel = new me.Vector2d(-Math.sin(Number.prototype.degToRad(a)) * e * Number.prototype.random(-5, 5), -Math.cos(Number.prototype.degToRad(a)) * d);
                this.addAnimation("particle", [Number.prototype.random(1, 3)]);
                this.setCurrentAnimation("particle")
            },
            update: function () {
                if (0 < this.pos.y &&
                    this.pos.y < me.game.viewport.getHeight() && 0 < this.pos.x && this.pos.x < me.game.viewport.getWidth()) return this.vel.y += me.sys.gravity, this.pos.x += this.vel.x, this.pos.y += this.vel.y, this.parent(), !0;
                me.game.remove(this, !0);
                return !1
            }
        }),
        k = me.AnimationSheet.extend({
            init: function (a, b, e, d, g, h, f, k, l, n, p) {
                this.parent(a, b, me.loader.getImage(e), d);
                this.visible = !0;
                this.focus = !1;
                this.mouse = this.localText = this.spritePos = null;
                this.spriteIndexes = g;
                this.onClick = h || null;
                this.text = f || null;
                this.textTranslate = k || !1;
                this.fontSize =
                    l || 0;
                this.fontSizeOrig = l;
                this.fontColor = n || "#FFFFFF";
                this.updatePause = p || !1;
                if (1 < g.length) {
                    for (a = 0; a < g.length; a++) this.addAnimation("normal" + a, [g[a]]), this.addAnimation("hover" + a, [g[a] + 1]);
                    this.spritePos = 0
                } else this.addAnimation("normal0", [g]), this.addAnimation("hover0", [g + 1]);
                this.setCurrentAnimation("normal0");
                me.input.registerMouseEvent("mousemove", this, this.onMouseOver.bind(this));
                me.input.registerMouseEvent("mousedown", this, this.onMouseDown.bind(this))
            },
            refresh: function (a) {
                this.update();
                this.draw(a)
            },
            update: function () {
                return this.focus && this.onClick && this.visible ? (this.containsPoint(me.input.mouse.pos) ? (null != this.spritePos ? this.setCurrentAnimation("hover" + this.spritePos) : this.setCurrentAnimation("hover0"), this.fontSize = this.fontSizeOrig + 2, this.mouse.target.style.cursor = "pointer") : (null != this.spritePos ? this.setCurrentAnimation("normal" + this.spritePos) : this.setCurrentAnimation("normal0"), this.fontSize = this.fontSizeOrig, this.mouse.target.style.cursor = "default", this.focus = !1), this.parent(), !0) : !1
            },
            draw: function (c) {
                this.visible && (this.parent(c), this.text && (this.textTranslate ? this.localText = a[this.text] : this.localText = this.text, h(c, this.fontSize, "#000000", this.fontColor, "center", this.localText, this.pos.x + this.hWidth, this.pos.y + this.hHeight)))
            },
            onMouseOver: function (a) {
                if (this.visible && this.onClick && (me.state.isRunning() || this.updatePause)) this.focus = !0, null === this.mouse && (this.mouse = a);
                return !0
            },
            onMouseDown: function () {
                if (this.visible && this.onClick && (me.state.isRunning() || this.updatePause))
                    if (null !=
                        this.spritePos ? (this.spritePos < this.spriteIndexes.length - 1 ? this.spritePos++ : this.spritePos = 0, this.setCurrentAnimation("normal" + this.spritePos)) : (null !== this.mouse && (this.mouse.target.style.cursor = "default"), this.focus = !1), me.audio.play("CLICK"), "function" === typeof this.onClick) this.onClick();
                return !0
            },
            onDestroyEvent: function () {
                me.input.releaseMouseEvent("mousemove", this);
                me.input.releaseMouseEvent("mousedown", this);
                this.onClick = this.mouse = this.spriteIndexes = null
            }
        }),
        r = me.AnimationSheet.extend({
            init: function (a,
                b, e, d, g) {
                this.parent(a, b, me.loader.getImage("BTN_LEVELS"), 128);
                this.visible = !0;
                this.focus = !1;
                this.mouse = null;
                this.fontSize = 30;
                this.onClick = e || null;
                this.spriteIndex = d;
                this.text = g || null;
                this.addAnimation("normal", [d]);
                this.addAnimation("hover", [d + 1]);
                this.setCurrentAnimation("normal");
                me.input.registerMouseEvent("mousemove", this, this.onMouseOver.bind(this));
                me.input.registerMouseEvent("mousedown", this, this.onMouseDown.bind(this))
            },
            update: function () {
                return this.focus && this.onClick && this.visible ? (this.containsPoint(me.input.mouse.pos) &&
                    me.input.mouse.pos.x < this.pos.x + this.width - 28 ? (this.setCurrentAnimation("hover"), this.fontSize = 32, this.mouse.target.style.cursor = "pointer") : (this.setCurrentAnimation("normal"), this.fontSize = 30, this.mouse.target.style.cursor = "default", this.focus = !1), this.parent(), !0) : !1
            },
            draw: function (a) {
                this.visible && (this.parent(a), null != this.text && h(a, this.fontSize, "#000000", "#FFFFFF", "center", this.text, this.pos.x + this.hWidth - 14, this.pos.y + this.hHeight))
            },
            onMouseOver: function (a) {
                this.visible && (this.onClick && me.state.isRunning()) &&
                    (this.focus = !0, null === this.mouse && (this.mouse = a));
                return !0
            },
            onMouseDown: function () {
                if (this.visible && (this.onClick && me.input.mouse.pos.x < this.pos.x + this.width - 28 && me.state.isRunning()) && (null !== this.mouse && (this.mouse.target.style.cursor = "default"), this.focus = !1, me.audio.play("CLICK"), "function" === typeof this.onClick)) this.onClick();
                return !0
            },
            onDestroyEvent: function () {
                me.input.releaseMouseEvent("mousemove", this);
                me.input.releaseMouseEvent("mousedown", this);
                this.onClick = this.mouse = this.spriteIndex =
                    null
            }
        }),
        n = me.Rect.extend({
            init: function (a, b, e, d, g, h) {
                this.parent(new me.Vector2d(a, b), e.length * (d / 2) + d, d);
                this.visible = !0;
                this.focus = !1;
                this.text = e || h;
                this.link = h || e;
                this.fontSize = d || 0;
                this.fontColor = g || "#EA1515";
                this.fontSizeOrig = d;
                this.mouse = null;
                this.pos.x -= this.hWidth;
                me.input.registerMouseEvent("mousemove", this, this.onMouseOver.bind(this));
                me.input.registerMouseEvent("mousedown", this, this.onMouseDown.bind(this))
            },
            destroy: function () {
                this.onDestroyEvent.apply(this, arguments)
            },
            refresh: function (a) {
                this.update();
                this.draw(a)
            },
            update: function () {
                return this.focus ? (this.containsPoint(me.input.mouse.pos) ? (this.fontSize = this.fontSizeOrig + 2, this.mouse.target.style.cursor = "pointer") : (this.fontSize = this.fontSizeOrig, this.mouse.target.style.cursor = "default", this.focus = !1), !0) : !1
            },
            draw: function (a) {
                this.parent(a, "rgba(0, 0, 0, 0)");
                p(a, this.fontSize, this.fontColor, "center", this.text, this.pos.x + this.hWidth, this.pos.y + this.hHeight)
            },
            onMouseOver: function (a) {
                this.visible && me.state.isRunning() && (this.focus = !0, null === this.mouse &&
                    (this.mouse = a));
                return !0
            },
            onMouseDown: function () {
                this.visible && me.state.isRunning() && (me.audio.play("CLICK"), this.focus = !1, null !== this.mouse && (this.mouse.target.style.cursor = "default"), navigator.isCocoonJS ? CocoonJS.App.openURL("http://" + this.link.replace("http://", "")) : window.open("http://" + this.link.replace("http://", "")));
                return !0
            },
            onDestroyEvent: function () {
                me.input.releaseMouseEvent("mousemove", this);
                me.input.releaseMouseEvent("mousedown", this);
                this.mouse = null
            }
        }),
        B = me.Renderable.extend({
            init: function (a,
                b, e, d, g, h) {
                this.pos = new me.Vector2d(a, b);
                this.value = e;
                this.fontSize = d;
                this.fontColor = g;
                this.valueMask = h;
                this.fps = this.score = 0;
                this.parent(this.pos, 300, 80)
            },
            update: function () {
                return this.score < this.value && 0 === this.fps++ % 2 ? (this.score = this.score + 1E3 < this.value ? this.score + 1E3 : this.value, this.fps = 1, !0) : !1
            },
            draw: function (a) {
                h(a, this.fontSize, "#000000", this.fontColor, "center", q(this.score, this.valueMask), this.pos.x, this.pos.y)
            }
        }),
        C = me.Renderable.extend({
            init: function (a, b, e, d, g) {
                this.pos = new me.Vector2d(a,
                    b);
                this.width = e;
                this.textPos = this.height = d;
                this.visible = g;
                this.credits = [];
                this.parent(this.pos, this.width, this.height);
                this.tween = new me.Tween(this);
                g && this.show()
            },
            destroy: function () {
                this.onDestroyEvent.apply(this, arguments)
            },
            update: function () {
                return !0
            },
            draw: function (a) {
                var b = 0,
                    e = 0;
                s(a, this.pos.x, this.pos.y, this.width, this.height, "#0088AA", "#005469", 4);
                for (b = 0; b < this.credits.length; b++)
                    if (e = this.textPos + 32 * b, e > this.pos.y + 25 && e < this.height + this.pos.y - 25) switch (this.credits[b][0]) {
                        case "T":
                            h(a, 30,
                                "#000000", "#F0A818", "center", this.credits[b][1], 512, e);
                            break;
                        case "S":
                            h(a, 24, "#000000", "#FFFF00", "center", this.credits[b][1], 512, e);
                            break;
                        case "N":
                            p(a, 22, "#FFFFFF", "center", this.credits[b][1], 512, e);
                            break;
                        case "L":
                            this.credits[b][1].pos.y = e - 12, this.credits[b][1].refresh(a)
                    }
            },
            show: function () {
                this.build();
                this.visible = !0;
                this.tweenAnimate(this.height + this.pos.y);
                this.tween.start()
            },
            hide: function () {
                this.clean();
                this.tween.stop();
                this.visible = !1
            },
            tweenAnimate: function (a) {
                this.textPos = a;
                this.tween.to({
                    textPos: this.pos.y - 30 * this.credits.length - 20
                }, 5E4).onComplete(this.tweenAnimate.bind(this, a)).start()
            },
            build: function () {
                this.credits.length = 0;
                this.credits.push(["T", "Vibrant Recycling"]);
                this.credits.push(["N", "Ver. " + b.Version]);
                this.credits.push(["N", ""]);
                this.credits.push(["N", ""]);
                this.credits.push(["T", a.CREDITS]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_DESIGN]);
                this.credits.push(["N", "Andr\u00e9 Antonio Schmitz"]);
                this.credits.push(["N", "C\u00edntia Rossi Soares Schmitz"]);
                this.credits.push(["N",
                    ""
                ]);
                this.credits.push(["S", a.CREDITS_DEVELOPER]);
                this.credits.push(["N", "Andr\u00e9 Antonio Schmitz"]);
                this.credits.push(["N", ""]);
                this.credits.push(["N", ""]);
                this.credits.push(["T", a.THANKS]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_ENGINE]);
                this.credits.push(["N", "Olivier Biot"]);
                this.credits.push(["L", new n(512, 0, "melonJS - www.melonjs.org", 22, "#FFFFFF", "www.melonjs.org")]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_TILES]);
                this.credits.push(["N", "Thorbj\u00f8rn Lindeijer"]);
                this.credits.push(["L", new n(512, 0, "Tiled Map Editor - www.mapeditor.org", 22, "#FFFFFF", "www.mapeditor.org")]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_FONTS]);
                this.credits.push(["N", "Brian J. Bonislawsky"]);
                this.credits.push(["L", new n(512, 0, "Galindo - Google WebFont", 22, "#FFFFFF", "www.google.com/webfonts/specimen/Galindo")]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_AUDIO]);
                this.credits.push(["L", new n(512, 0, "www.freesfx.co.uk", 22, "#FFFFFF")]);
                this.credits.push(["L",
                    new n(512, 0, "www.freesfx.co.uk/users/mckinneysound", 22, "#FFFFFF")
                ]);
                this.credits.push(["L", new n(512, 0, "www.freesfx.co.uk/users/gr8sfx", 22, "#FFFFFF")]);
                this.credits.push(["L", new n(512, 0, "www.freesfx.co.uk/users/andyt", 22, "#FFFFFF")]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_RECYCLE]);
                this.credits.push(["L", new n(512, 0, "www.recicloteca.org.br", 22, "#FFFFFF")]);
                this.credits.push(["L", new n(512, 0, "www.amigosdofuturo.org.br", 22, "#FFFFFF")]);
                this.credits.push(["L", new n(512, 0, "www.ecocycle.org",
                    22, "#FFFFFF")]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_TRANSLATIONS]);
                this.credits.push(["N", a.SPANISH + " - Gabriel Vazquez Santos "]);
                this.credits.push(["N", ""]);
                this.credits.push(["N", ""]);
                this.credits.push(["T", a.SPECIAL_THANKS]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.CREDITS_YOU]);
                this.credits.push(["N", ""]);
                this.credits.push(["S", a.MANY_THANKS]);
                this.credits.push(["N", ""]);
                this.credits.push(["N", ""]);
                this.credits.push(["L", new n(512, 0, "FAQ", 20, "#FFFFFF", "www.ciangames.com/faq.html")]);
                this.credits.push(["L", new n(512, 0, a.TERMS_USE, 20, "#FFFFFF", "www.ciangames.com/terms.html")]);
                this.credits.push(["L", new n(512, 0, "www.ciangames.com", 20, "#FFFFFF", "www.ciangames.com")]);
                this.credits.push(["N", ""]);
                this.credits.push(["N", a.CREDITS_COPYRIGHT]);
                this.credits.push(["L", new n(512, 0, x("QW5kcukgQW50b25pbyBTY2htaXR6"), 22, "#FFFFFF", "plus.google.com/115687013843156404362")]);
                this.credits.push(["N", a.CREDITS_ALLRIGHTS])
            },
            clean: function () {
                for (var a = 0; a < this.credits.length; a++) "L" === this.credits[a][0] &&
                    (this.credits[a][1].onDestroyEvent(), me.game.remove(this.credits[a][1]));
                this.credits.length = 0
            },
            onDestroyEvent: function () {
                this.tween.stop();
                this.clean();
                this.credits = this.tween = null
            }
        }),
        ea = me.Renderable.extend({
            init: function (a, m, e, d) {
                this.pos = new me.Vector2d(a, m);
                this.onClick = d;
                this.width = 670;
                this.height = 200;
                this.arrow = e;
                this.level = q(b.Level.getLevel, "00");
                this.parent(this.pos, this.width, this.height);
                this.onConfirm = new k(this.pos.x + this.width - 160, this.pos.y + this.height + 5, "BTN_TEXT_SM", 160, 0, this.onConfirm.bind(this),
                    "PLAY", !0, 24);
                me.game.add(this.onConfirm, 1001);
                me.game.sort()
            },
            update: function () {
                return !0
            },
            draw: function (c) {
                var b = this.pos.x,
                    e = this.pos.y,
                    d = this.width,
                    g = this.height,
                    f = this.arrow;
                c.beginPath();
                c.moveTo(b + 20, e);
                c.lineTo(b + d - 20, e);
                c.quadraticCurveTo(b + d, e, b + d, e + 20);
                c.lineTo(b + d, e + g - 20);
                c.quadraticCurveTo(b + d, e + g, b + d - 20, e + g);
                c.lineTo(b + f + 100, e + g);
                c.lineTo(b + f + 20, e + g + 50);
                c.lineTo(b + f + 60, e + g);
                c.lineTo(b + 20, e + g);
                c.quadraticCurveTo(b, e + g, b, e + g - 20);
                c.lineTo(b, e + 20);
                c.quadraticCurveTo(b, e, b + 20, e);
                c.closePath();
                c.fillStyle = "rgba(50, 50, 50, 0.8)";
                c.fill();
                l(c, this.pos.x + 20, this.pos.y + 92, 10, "#FFD42A");
                l(c, this.pos.x + 20, this.pos.y + 132, 10, "#FFD42A");
                l(c, this.pos.x + 20, this.pos.y + 172, 10, "#FFD42A");
                h(c, 24, "#000000", "#FFE78A", "center", a["MSG_GAMEHELP_" + this.level], 512, this.pos.y + 40);
                p(c, 20, "#FFFFFF", "left", a["MSG_GAMEHELP_" + this.level + "A"], this.pos.x + 40, this.pos.y + 92);
                p(c, 20, "#FFFFFF", "left", a["MSG_GAMEHELP_" + this.level + "B"], this.pos.x + 40, this.pos.y + 132);
                p(c, 20, "#FFFFFF", "left", a["MSG_GAMEHELP_" + this.level + "C"],
                    this.pos.x + 40, this.pos.y + 172)
            },
            onConfirm: function (a) {
                if ("function" === typeof this.onClick) this.onClick();
                me.game.remove(this.onConfirm);
                me.game.remove(this);
                return !0
            }
        }),
        fa = me.Renderable.extend({
            init: function (a, b, e, d) {
                this.pos = new me.Vector2d(a, b);
                this.width = 800;
                this.height = 200;
                this.parent(this.pos, this.width, this.height)
            },
            update: function () {
                return !0
            },
            draw: function (c) {
                w(c, this.pos.x, this.pos.y, this.width, this.height, "rgba(50, 50, 50, 0.8)");
                l(c, this.pos.x + 20, this.pos.y + 92, 10, "#FFD42A");
                l(c, this.pos.x +
                    20, this.pos.y + 132, 10, "#FFD42A");
                l(c, this.pos.x + 20, this.pos.y + 172, 10, "#FFD42A");
                h(c, 26, "#000000", "#FFE78A", "center", a.HINTS, 512, this.pos.y + 40);
                6 > b.Level.getLevel ? (p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_01, this.pos.x + 40, this.pos.y + 92), p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_02, this.pos.x + 40, this.pos.y + 132)) : (p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_04, this.pos.x + 40, this.pos.y + 92), p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_05, this.pos.x + 40, this.pos.y + 132));
                p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_03, this.pos.x +
                    40, this.pos.y + 172)
            }
        }),
        V = Object.extend({
            init: function () {
                this.visible = !1;
                this.scenery = this.level = null;
                this.btnContinue = new k(384, 280, "BTN_TEXT_BG", 256, 0, this.onContinue.bind(this), "CONTINUE", !0, 28, null, !0);
                this.btnRestart = new k(384, 380, "BTN_TEXT_BG", 256, 0, this.onRestart.bind(this), "RESTART", !0, 28, null, !0);
                this.btnMenu = new k(384, 480, "BTN_TEXT_BG", 256, 0, this.onMenu.bind(this), "MENU", !0, 28, null, !0);
                this.btnContinue.visible = !1;
                this.btnRestart.visible = !1;
                this.btnMenu.visible = !1
            },
            refresh: function (a, b) {
                this.update(a);
                this.draw(a, b)
            },
            update: function (a) {
                this.btnContinue.update();
                this.btnRestart.update();
                this.btnMenu.update();
                return !0
            },
            draw: function (c, b) {
                c.drawImage(b.canvas, 0, 0);
                me.state.isCurrent(me.state.PLAY) ? (s(c, 350, 100, 324, 500, "rgba(80, 80, 80, 0.9)", "#FFFFFF", 4), h(c, 30, "#000000", "#FFFFFF", "center", a.PAUSE, 512, 150), h(c, 24, "#000000", "#FFFFFF", "center", this.scenery, 512, 200), h(c, 22, "#000000", "#FFFFFF", "center", a.LEVEL + " " + this.level, 512, 235), this.btnRestart.draw(c), this.btnMenu.draw(c)) : (s(c, 350, 50, 324, 668, "rgba(80, 80, 80, 0.9)",
                    "#FFFFFF", 4), h(c, 40, "#000000", "#FFFFFF", "center", a.PAUSE, 512, 300));
                this.btnContinue.draw(c);
                me.video.blitSurface()
            },
            show: function (c) {
                me.state.isCurrent(me.state.PLAY) ? (this.scenery = a["SCENERY_" + b.Level.getScenery], this.level = q(b.Level.getLevel, "00"), this.btnRestart.visible = c, this.btnMenu.visible = c, this.btnContinue.pos.y = 280) : this.btnContinue.pos.y = 400;
                this.btnContinue.visible = c
            },
            onContinue: function () {
                this.show(!1);
                me.state.resume(!0)
            },
            onRestart: function () {
                this.show(!1);
                me.state.resume(!0);
                me.state.change(me.state.PLAY)
            },
            onMenu: function () {
                this.show(!1);
                me.state.resume(!0);
                me.state.change(me.state.LEVELS)
            }
        }),
        I = me.ScreenObject.extend({
            init: function () {
                this.hints = null
            },
            onResetEvent: function () {
                me.levelDirector.loadLevel(b.Level.getScenery + "_" + b.Level.getCurrent().name);
                b.Bin.bin1 = me.game.getEntityByName("bin1")[0];
                b.Bin.bin2 = me.game.getEntityByName("bin2")[0];
                b.Bin.bin3 = me.game.getEntityByName("bin3")[0];
                b.Bin.bin4 = me.game.getEntityByName("bin4")[0];
                b.Bin.bin5 = me.game.getEntityByName("bin5")[0];
                b.Level.Manager.resetStats();
                me.game.add(b.Level.Manager, 50);
                me.game.add(new da, 10);
                if (7 > b.Level.getLevel) me.game.add(new ea(177, 50, b.Bin.bin1.pos.x - 130, this.onCloseDialog.bind(this)), 1E3), this.hints = new fa(112, 480), me.game.add(this.hints, 1E3);
                else this.onStartPlay()
            },
            onCloseDialog: function () {
                me.game.remove(this.hints);
                this.onStartPlay()
            },
            onStartPlay: function () {
                me.game.add(new A(80, 2), 20);
                me.game.add(new ba, 40);
                me.game.add(new ca, 30);
                me.game.addHUD(0, 0, me.game.viewport.getWidth(), 50);
                me.game.HUD.addItem("score", new ga(me.game.viewport.getWidth() /
                    2 - 150, 25));
                me.game.HUD.addItem("collected", new ha(me.game.viewport.getWidth() - 20, 25));
                me.game.HUD.addItem("menu", new ia(10, 5))
            },
            onDestroyEvent: function () {
                b.Level.Manager.resetLevel();
                this.hints = null
            }
        }),
        H = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.handle = null;
                this.invalidate = !1;
                this.timer = 0;
                this.logo = new Image;
                this.background = new Image
            },
            onResetEvent: function () {
                this.invalidate = !0;
                this.loadPercent = 0;
                this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this));
                this.logo.src = "./graphics/ui/LGO_GAME.png";
                this.background.src = "./graphics/ui/SCR_TITLE.png";
                me.loader.onload = this.onLoad.bind(this);
                me.loader.preload(X);
                navigator.isCocoonJS || (document.getElementById("canvasGame").style.display = "block", document.getElementById("loading").style.display = "none")
            },
            update: function () {
                if (!0 === this.invalidate) return this.invalidate = !1, !0;
                0 < this.timer && 400 < this.timer++ && b.start();
                return !1
            },
            draw: function (c) {
                var b = c.createLinearGradient(0, 1, 0, me.game.viewport.getHeight());
                b.addColorStop(0,
                    "#067F9D");
                b.addColorStop(0.7, "#B4D4EE");
                b.addColorStop(1, "#586b33");
                c.fillStyle = b;
                c.fillRect(0, 0, me.game.viewport.getWidth(), me.game.viewport.getHeight());
                c.drawImage(this.background, 0, 0);
                c.drawImage(this.logo, 227, 50);
                h(c, 30, "#000000", "#FFFFFF", "center", a.LOADING, 512, 620);
                h(c, 16, "#000000", "#FFFFFF", "center", a.CREDITS_COPYRIGHT + " " + x("Q2lhbiBHYW1lcw=="), 512, 730);
                if (0 === this.timer) {
                    var b = ~~(100 * this.loadPercent),
                        e = c.createLinearGradient(0, 650, 0, 678);
                    e.addColorStop(0, "#669240");
                    e.addColorStop(0.5, "#6AAF25");
                    e.addColorStop(1, "#344B21");
                    c.strokeStyle = "#000000";
                    c.fillStyle = "#D7890D";
                    c.lineWidth = 2;
                    c.strokeRect(260, 650, 504, 28);
                    c.fillRect(260, 650, 504, 28);
                    c.fillStyle = e;
                    c.fillRect(260, 650, 504 * (b / 100), 28);
                    h(c, 22, "#000000", "#FFFFFF", "center", b + "%", 512, 666)
                }
            },
            onLoad: function () {
                "undefined" !== typeof clayAD ? this.timer = 1 : b.start();
                this.invalidate = !0
            },
            onProgressUpdate: function (a) {
                this.loadPercent = a;
                this.invalidate = !0
            },
            onDestroyEvent: function () {
                this.handle && (me.event.unsubscribe(this.handle), this.handle = null);
                "undefined" !==
                    typeof clayAD && clayAD.hide();
                this.logo = null
            }
        }),
        J = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.btnPlay = this.btnInfoShow = this.btnInfoHide = this.btnAudio = this.btnPrevLang = this.btnNextLang = this.btnTwitter = this.btnFacebook = this.btnGooglePlus = this.background = this.footer = this.logo = this.credits = this.linkCompany = null
            },
            onResetEvent: function () {
                this.background = me.loader.getImage("SCR_TITLE");
                this.footer = me.loader.getImage("SCR_FOOTER");
                me.game.add(new A(150, 1005), 0);
                this.logo = new me.SpriteObject(227,
                    50, me.loader.getImage("LGO_GAME"));
                me.game.add(this.logo, 1010);
                this.credits = new C(170, 330, 684, 370, !1);
                me.game.add(this.credits, 1015);
                this.linkCompany = new n(512, 630, "www.ciangames.com", 20, "#1A1A1A", "www.ciangames.com");
                this.btnPlay = new k(384, 390, "BTN_TEXT_BG", 256, 0, this.onPlay.bind(this), "PLAY", !0, 28);
                this.btnPrevLang = new k(374, 696, "BTN_IMAGE_48", 48, 0, this.onLang.bind(this, !1));
                this.btnNextLang = new k(602, 696, "BTN_IMAGE_48", 48, 2, this.onLang.bind(this, !0));
                this.btnInfoShow = new k(95, 686, "BTN_IMAGE_72",
                    72, 2, this.onInfo.bind(this, !0));
                this.btnInfoHide = new k(432, 710, "BTN_TEXT_SM", 160, 0, this.onInfo.bind(this, !1), "MENU", !0, 24);
                this.btnInfoHide.visible = !1;
                this.btnTwitter = new k(794, 688, "BTN_IMAGE_64", 64, 0, this.onSocial.bind(this, "https://twitter.com/intent/tweet?original_referer=http://vibrantrecycling.ciangames.com&text=Play Vibrant Recycling, an HTML5 Ecological Game!&via=ciangames&url=http://vibrantrecycling.ciangames.com"));
                this.btnFacebook = new k(870, 688, "BTN_IMAGE_64", 64, 2, this.onSocial.bind(this,
                    "http://www.facebook.com/ciangames"));
                this.btnGooglePlus = new k(946, 688, "BTN_IMAGE_64", 64, 4, this.onSocial.bind(this, "https://plus.google.com/113841776972169419426"));
                me.sys.sound ? me.audio.isAudioEnable() ? this.btnAudio = new k(12, 686, "BTN_IMAGE_72", 72, [4, 6], this.onAudio.bind(this)) : this.btnAudio = new k(12, 686, "BTN_IMAGE_72", 72, [6, 4], this.onAudio.bind(this)) : this.btnAudio = new k(12, 686, "BTN_IMAGE_72", 72, 6, null);
                me.game.add(this.linkCompany, 1E3);
                me.game.add(this.btnPlay, 1E3);
                me.game.add(this.btnPrevLang,
                    1E3);
                me.game.add(this.btnNextLang, 1E3);
                me.game.add(this.btnInfoShow, 1E3);
                me.game.add(this.btnInfoHide, 1E3);
                me.game.add(this.btnAudio, 1E3);
                me.game.add(this.btnTwitter, 1E3);
                me.game.add(this.btnFacebook, 1E3);
                me.game.add(this.btnGooglePlus, 1E3);
                me.game.sort();
                b.Audio.playMusic("INTRO")
            },
            onPlay: function () {
                me.state.change(me.state.LEVELS)
            },
            onLang: function (a) {
                switch (b.Language.getLang) {
                    case "en":
                        a ? b.Language.setLang("pt") : b.Language.setLang("es");
                        break;
                    case "pt":
                        a ? b.Language.setLang("es") : b.Language.setLang("en");
                        break;
                    case "es":
                        a ? b.Language.setLang("en") : b.Language.setLang("pt")
                }
                navigator.isCocoonJS || BrowserAux.FooterMore(!0)
            },
            onInfo: function (a) {
                this.btnInfoHide.visible = a;
                this.btnInfoShow.visible = !a;
                this.btnPlay.visible = !a;
                this.btnAudio.visible = !a;
                this.btnTwitter.visible = !a;
                this.btnFacebook.visible = !a;
                this.btnGooglePlus.visible = !a;
                this.btnPrevLang.visible = !a;
                this.btnNextLang.visible = !a;
                this.linkCompany.visible = !a;
                a ? this.credits.show() : this.credits.hide();
                me.game.sort()
            },
            onAudio: function () {
                me.audio.isAudioEnable() ?
                    b.Audio.disable() : b.Audio.enable()
            },
            onSocial: function (a) {
                navigator.isCocoonJS ? CocoonJS.App.openURL(a) : window.open(a)
            },
            update: function () {
                return !0
            },
            draw: function (b) {
                b.drawImage(this.background, 0, 0);
                b.drawImage(this.footer, 0, 630);
                this.btnInfoHide.visible || h(b, 28, "#000000", "#FFFFFF", "center", a.LANGUAGE, 512, 720)
            },
            onDestroyEvent: function () {
                this.btnPlay = this.btnInfoShow = this.btnInfoHide = this.btnAudio = this.btnPrevLang = this.btnNextLang = this.btnTwitter = this.btnFacebook = this.btnGooglePlus = this.background = this.footer =
                    this.logo = this.credits = this.linkCompany = null
            }
        }),
        K = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.background = this.scenery = null;
                this.stats = [0, 0]
            },
            onResetEvent: function () {
                this.background = me.loader.getImage("SCR_LEVELS");
                this.scenery = b.Level.getScenery;
                me.game.add(new k(210, 77, "BTN_IMAGE_48", 48, 0, this.onScenery.bind(this, !1)), 1E3);
                me.game.add(new k(766, 77, "BTN_IMAGE_48", 48, 2, this.onScenery.bind(this, !0)), 1E3);
                me.game.add(new k(10, 686, "BTN_IMAGE_72", 72, 0, this.onBack.bind(this)), 1E3);
                0 < f[this.scenery].length &&
                    (this.stats = b.Level.Manager.getSceneryStats(this.scenery), this.addButton(100, 230, 1), this.addButton(240, 230, 2), this.addButton(380, 230, 3), this.addButton(520, 230, 4), this.addButton(660, 230, 5), this.addButton(100, 340, 6), this.addButton(240, 340, 7), this.addButton(380, 340, 8), this.addButton(520, 340, 9), this.addButton(660, 340, 10), this.addButton(100, 450, 11), this.addButton(240, 450, 12), this.addButton(380, 450, 13), this.addButton(520, 450, 14), this.addButton(660, 450, 15), this.addButton(100, 560, 16), this.addButton(240, 560,
                    17), this.addButton(380, 560, 18), this.addButton(520, 560, 19), this.addButton(660, 560, 20), this.addButton(800, 265, 21), this.addButton(800, 395, 22), this.addButton(800, 525, 23), me.game.sort());
                b.Audio.playMusic("INTRO")
            },
            addButton: function (a, b, e) {
                if (1 === e || 0 < f[this.scenery][0][e][0]) switch (f[this.scenery][0][e][1]) {
                    case 1:
                        me.game.add(new r(a, b, this.onPlay.bind(this, e), 2, e), 1E3);
                        break;
                    case 2:
                        me.game.add(new r(a, b, this.onPlay.bind(this, e), 4, e), 1E3);
                        break;
                    case 3:
                        me.game.add(new r(a, b, this.onPlay.bind(this, e), 6,
                            e), 1E3);
                        break;
                    default:
                        me.game.add(new r(a, b, this.onPlay.bind(this, e), 0, e), 1E3)
                } else if (0 < f[this.scenery][0][e - 1][0]) switch (e) {
                    case f[this.scenery].length - 3:
                        this.stats[1] >= 2 * (f[this.scenery].length - 14) ? me.game.add(new r(a, b, this.onPlay.bind(this, e), 0, e), 1E3) : me.game.add(new r(a, b, null, 9), 1E3);
                        break;
                    case f[this.scenery].length - 2:
                        this.stats[1] >= 3 * (f[this.scenery].length - 14) + 5 ? me.game.add(new r(a, b, this.onPlay.bind(this, e), 0, e), 1E3) : me.game.add(new r(a, b, null, 10), 1E3);
                        break;
                    case f[this.scenery].length -
                        1:
                        this.stats[1] >= 5 * (f[this.scenery].length - 14) ? me.game.add(new r(a, b, this.onPlay.bind(this, e), 0, e), 1E3) : me.game.add(new r(a, b, null, 11), 1E3);
                        break;
                    default:
                        me.game.add(new r(a, b, this.onPlay.bind(this, e), 0, e), 1E3)
                } else me.game.add(new r(a, b, null, 8), 1E3)
            },
            onScenery: function (a) {
                switch (this.scenery) {
                    case "S001":
                        b.Level.getScenery = "S002";
                        break;
                    case "S002":
                        b.Level.getScenery = "S001"
                }
                me.state.change(me.state.LEVELS)
            },
            onBack: function () {
                me.state.change(me.state.MENU)
            },
            onPlay: function (a) {
                b.Audio.stopMusic("INTRO");
                b.Level.getLevel = a;
                me.state.change(me.state.PLAY)
            },
            update: function () {
                return !0
            },
            draw: function (b) {
                b.drawImage(this.background, 0, 0);
                s(b, 200, 25, 624, 110, "#0088AA", "#005469", 4);
                h(b, 40, "#000000", "#FFFFFF", "center", a.SELECT_SCENERY, 512, 60);
                h(b, 28, "#000000", "#FFD42A", "center", a["SCENERY_" + this.scenery], 512, 102);
                s(b, 60, 160, 904, 520, "#0088AA", "#005469", 4);
                0 < f[this.scenery].length ? (h(b, 40, "#000000", "#FFFFFF", "center", a.SELECT_LEVEL, 512, 195), s(b, 310, 700, 400, 45, "#0088AA", "#005469", 4), h(b, 20, "#000000", "#FFFFFF",
                    "left", a.SCORE + ": " + q(this.stats[0], "00000000"), 325, 723), l(b, 610, 721, 10, "#FFD42A"), h(b, 20, "#000000", "#FFFFFF", "left", q(this.stats[1], "00") + "/" + 3 * (f[this.scenery].length - 1), 625, 723)) : h(b, 300, "#000000", "#FFD42A", "center", "?", 512, 440)
            },
            onDestroyEvent: function () {
                this.background = this.stats = null
            }
        }),
        L = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.background = null;
                this.recordText = "";
                this.score = this.record = this.stars = this.hint = 0;
                this.stats = [0, 0]
            },
            onResetEvent: function () {
                this.background = me.video.applyRGBFilter(me.video.getSystemCanvas(),
                    "b&w");
                do this.hint = q(Number.prototype.random(1, 18), "00"); while (this.hint === b.Level.lastHint);
                this.stats = b.Level.Manager.getSceneryStats(b.Level.getScenery);
                b.Level.lastHint = this.hint;
                me.game.add(new k(192, 629, "BTN_TEXT_SM", 160, 0, this.onLevels.bind(this), "MENU", !0, 24), 1E3);
                me.game.add(new k(432, 629, "BTN_TEXT_SM", 160, 0, this.onReplay.bind(this), "REPLAY", !0, 24), 1E3);
                me.game.add(new k(680, 629, "BTN_TEXT_SM", 160, 0, this.onNext.bind(this), "NEXT", !0, 24), 1E3);
                me.game.add(new n(512, 590, a.FONT + ": " + a["MSG_ECOHINT_" +
                    this.hint][1], 16, "#FFFFFF", a["MSG_ECOHINT_" + this.hint][1]), 1E3);
                this.score = q(me.gamestat.getItemValue("score"), "000000");
                this.stars = me.gamestat.getItemValue("stars");
                this.record = q(f[b.Level.getScenery][0][b.Level.getLevel][0], "000000");
                b.Level.newScore ? (this.recordText = a.NEW_HISCORE, me.game.add(new B(512, 230, this.score, 30, "#FFD42A", "000000"), 1E3)) : (this.recordText = a.SCORE, me.game.add(new B(512, 230, this.score, 26, "#FFFFFF", "000000"), 1E3));
                me.game.sort();
                (0 < this.stars || b.Level.newScore) && t(512, 250, "starscr",
                    30, 5, 25);
                me.audio.play("WOW")
            },
            onLevels: function () {
                me.state.change(me.state.LEVELS)
            },
            onReplay: function () {
                me.state.change(me.state.PLAY)
            },
            onNext: function () {
                b.Level.getLevel++;
                switch (b.Level.getLevel) {
                    case f[b.Level.getScenery].length - 3:
                        this.stats[1] >= 2 * (f[b.Level.getScenery].length - 14) ? me.state.change(me.state.PLAY) : me.state.change(me.state.LEVELS);
                        break;
                    case f[b.Level.getScenery].length - 2:
                        this.stats[1] >= 3 * (f[b.Level.getScenery].length - 14) + 5 ? me.state.change(me.state.PLAY) : me.state.change(me.state.LEVELS);
                        break;
                    case f[b.Level.getScenery].length - 1:
                        this.stats[1] >= 5 * (f[b.Level.getScenery].length - 14) ? me.state.change(me.state.PLAY) : me.state.change(me.state.LEVELS);
                        break;
                    case f[b.Level.getScenery].length:
                        me.state.change(me.state.SCENERY);
                        break;
                    default:
                        me.state.change(me.state.PLAY)
                }
            },
            update: function () {
                return !0
            },
            draw: function (b) {
                b.drawImage(this.background.canvas, 0, 0);
                s(b, 80, 80, 864, 610, "rgba(0, 136, 170, 0.9)", "#005469", 4);
                w(b, 262, 160, 500, 170, "#567934");
                w(b, 110, 360, 804, 260, "#567934");
                h(b, 40, "#000000", "#FFFFFF",
                    "center", a.LEVEL_SUCCESS, 512, 120);
                h(b, 30, "#000000", "#FFFFFF", "center", this.recordText, 512, 190);
                switch (this.stars) {
                    case 1:
                        l(b, 512, 270, 15, "#FFD42A");
                        break;
                    case 2:
                        l(b, 490, 270, 15, "#FFD42A");
                        l(b, 534, 270, 15, "#FFD42A");
                        break;
                    case 3:
                        l(b, 472, 270, 15, "#FFD42A"), l(b, 512, 270, 15, "#FFD42A"), l(b, 552, 270, 15, "#FFD42A")
                }
                this.record > this.score && h(b, 20, "#000000", "#FFFFFF", "center", a.HIGH_SCORE + ": " + this.record, 512, 310);
                h(b, 24, "#000000", "#FFFFFF", "center", a.YOU_KNOW, 512, 390);
                var f = 450,
                    e = a["MSG_ECOHINT_" + this.hint][0].split(" "),
                    d = "",
                    g = "";
                b.font = "20px 'Galindo'";
                b.fillStyle = "#FFFFFF";
                b.textAlign = "center";
                b.textBaseline = "middle";
                for (var k = 0; k < e.length; k++) g = d + e[k] + " ", 750 < b.measureText(g).width ? (b.fillText(d, 512, f), d = e[k] + " ", f += 30) : d = g;
                b.fillText(d, 512, f)
            },
            onDestroyEvent: function () {
                this.background = this.hint = this.stats = null
            }
        }),
        M = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.background = null
            },
            onResetEvent: function () {
                this.background = me.video.applyRGBFilter(me.video.getSystemCanvas(), "b&w");
                me.game.add(new k(272,
                    550, "BTN_TEXT_SM", 160, 0, this.onLevels.bind(this), "MENU", !0, 24), 1E3);
                me.game.add(new k(592, 550, "BTN_TEXT_SM", 160, 0, this.onReplay.bind(this), "REPLAY", !0, 24), 1E3);
                me.game.sort();
                me.audio.play("AHH")
            },
            onLevels: function () {
                me.state.change(me.state.LEVELS)
            },
            onReplay: function () {
                me.state.change(me.state.PLAY)
            },
            update: function () {
                return !0
            },
            draw: function (c) {
                c.drawImage(this.background.canvas, 0, 0);
                s(c, 80, 120, 864, 500, "rgba(0, 136, 170, 0.9)", "#005469", 4);
                w(c, 110, 230, 804, 300, "#567934");
                h(c, 40, "#000000", "#FFFFFF",
                    "center", a.LEVEL_FAILED, 512, 170);
                h(c, 30, "#000000", "#FFD42A", "center", a.HINTS, 512, 270);
                l(c, 130, 330, 10, "#FFD42A");
                l(c, 130, 370, 10, "#FFD42A");
                l(c, 130, 410, 10, "#FFD42A");
                p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_01, 150, 330);
                p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_02, 150, 370);
                p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_03, 150, 410);
                5 < b.Level.getLevel && (l(c, 130, 450, 10, "#FFD42A"), l(c, 130, 490, 10, "#FFD42A"), p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_04, 150, 450), p(c, 20, "#FFFFFF", "left", a.MSG_GAMEHINT_05, 150, 490))
            },
            onDestroyEvent: function () {
                this.background =
                    null
            }
        }),
        N = me.ScreenObject.extend({
            init: function () {
                this.parent(!0);
                this.background = this.scenery = null;
                this.stats = [0, 0];
                this.titleX = 512
            },
            onResetEvent: function () {
                this.background = me.loader.getImage("SCR_LEVELS");
                me.game.add(new C(170, 270, 684, 430, !0), 1015);
                me.game.add(new k(432, 710, "BTN_TEXT_SM", 160, 0, this.onMenu.bind(this), "MENU", !0, 24), 1E3);
                this.tween = (new me.Tween(this)).to({
                    titleX: 612
                }, 1E4).onComplete(this.tweenAnimateLeft.bind(this));
                this.tween.start();
                this.scenery = a["SCENERY_" + b.Level.getScenery];
                this.stats = b.Level.Manager.getSceneryStats(b.Level.getScenery);
                me.game.sort();
                t(512, 250, "starscr", 30, 5, 25);
                b.Audio.playMusic("INTRO")
            },
            tweenAnimateLeft: function () {
                this.tween.to({
                    titleX: 412
                }, 1E4).onComplete(this.tweenAnimateRight.bind(this)).start();
                t(512, 250, "starscr", 30, 5, 25)
            },
            tweenAnimateRight: function () {
                this.tween.to({
                    titleX: 612
                }, 1E4).onComplete(this.tweenAnimateLeft.bind(this)).start();
                t(512, 250, "starscr", 30, 5, 25)
            },
            onMenu: function () {
                me.state.change(me.state.MENU)
            },
            update: function () {
                return !0
            },
            draw: function (c) {
                c.drawImage(this.background, 0, 0);
                s(c, 260, 180, 500, 60, "#0088AA", "#005469", 4);
                h(c, 40, "#000000", "#5AA02C", "center", this.scenery + " " + a.COMPLETED, 512, 60);
                h(c, 50, "#000000", "#F0A818", "center", a.CONGRATULATIONS, this.titleX, 130);
                h(c, 24, "#000000", "#FFFFFF", "left", a.SCORE + ": " + q(this.stats[0], "00000000"), 280, 210);
                h(c, 24, "#000000", "#FFFFFF", "left", q(this.stats[1], "00") + "/" + 3 * (f[b.Level.getScenery].length - 1), 660, 210);
                l(c, 640, 210, 12, "#FFD42A")
            },
            onDestroyEvent: function () {
                this.tween.stop();
                this.background =
                    this.stats = null
            }
        }),
        ga = me.HUD_Item.extend({
            init: function (a, b) {
                this.parent(a, b)
            },
            draw: function (b, f, e) {
                h(b, 25, "#000000", "#FFA500", "left", a.SCORE + ":", this.pos.x + f, this.pos.y + e);
                h(b, 25, "#000000", "#FFFFFF", "left", q(this.value, "000000"), this.pos.x + f + b.measureText(a.SCORE).width + 14, this.pos.y + e)
            }
        }),
        ha = me.HUD_Item.extend({
            init: function (a, b) {
                this.parent(a, b)
            },
            draw: function (c, f, e) {
                h(c, 25, "#000000", "#FFA500", "right", a.COLLECTED + "  " + q(this.value, "00") + "  " + a.OF + "  " + b.Level.getCurrent().wasteCollected, this.pos.x +
                    f, this.pos.y + e)
            }
        }),
        ia = me.HUD_Item.extend({
            init: function (a, f) {
                this.parent(a, f);
                b.Hud.Menu = new k(a, f, "BTN_HUD", 40, 0, this.onMenu.bind(this));
                me.game.add(b.Hud.Menu, 1001);
                5 < b.Level.getLevel && (b.Hud.Help = new k(a + 50, f, "BTN_HUD", 40, [2, 4], this.onHelp.bind(this)), me.game.add(b.Hud.Help, 1001))
            },
            onMenu: function () {
                me.state.onPause();
                me.state.pause(!0)
            },
            onHelp: function () {
                b.Level.showHelp = !b.Level.showHelp
            }
        });
    BrowserAux.FooterMore = function (c) {
        var f = document.getElementById("contentSite" + b.Language.getLang.toUpperCase());
        f && ("block" === f.style.display || c ? (document.documentElement.style.overflow = document.body.style.overflow = "hidden", document.getElementById("contentFooter").style.position = "fixed", document.getElementById("contentFooter").style.background = null, f.style.display = "none", footerMore.innerHTML = "| " + a.MORE_INFO + " |") : (document.documentElement.style.overflow = document.body.style.overflow = "visible", document.getElementById("contentFooter").style.position = "relative", document.getElementById("contentFooter").style.background =
            "#586b33", f.style.display = "block", footerMore.innerHTML = "| " + a.CLOSE + " |", window.scrollTo(0, document.body.scrollHeight)))
    };
    window.onReady(function () {
        b.init()
    })
})(window);