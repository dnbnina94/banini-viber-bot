const ngrok = require('./get_public_url');
require('dotenv').config();
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

const winston = require('winston');

function createLogger() {
	const logger = winston.createLogger({
		level: "debug",
	});
	logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
	return logger;
}
const logger = createLogger();

const KEYBOARD_WELCOME_MESSAGE = {
    "Type": "keyboard",
    "DefaultHeight":true,
	"Buttons": [
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "small",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/NVRMQkv/imageedit-15-5960621665.png",
            "ActionType": "reply",
            "ActionBody": "DA",
            "Text": "<font color='#E42619'>Da</font>",
        }
    ]
}

const KEYBOARD_TERMS_MESSAGE = {
    "Type": "keyboard",
    "DefaultHeight":true,
	"Buttons": [
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "small",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/hmgjHRs/imageedit-2-8934588344.png",
            "ActionType": "reply",
            "ActionBody": "SLAZEM SE",
            "Text": "<font color='#E42619'>Slažem se</font>",
        },
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "small",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/7168W94/imageedit-5-6829843391.png",
            "ActionType": "reply",
            "ActionBody": "NE SLAZEM SE",
            "Text": "<font color='#E42619'>Ne slažem se</font>",
        }
    ]
}

const KEYBOARD_MESSAGE = {
    "Type": "keyboard",
    "DefaultHeight":true,
	"Buttons": [
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "medium",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/xMt1PJp/imageedit-19-8212808545.png",
            "ActionType": "open-url",
            "ActionBody": "https://banini.rs/trikgg/"
        },
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "medium",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/HCQthpw/imageedit-32-3348798233.png",
            "ActionType": "open-url",
            "ActionBody": "https://banini.rs/trikgg/?rezultati=true"
        },
        {
            "Columns": 6,
            "Rows": 2,
            "Text": "",
            "TextSize": "small",
            "TextHAlign": "center",
            "TextVAlign": "bottom",
            "BgColor": "#E42619",
            "BgMedia": "https://i.ibb.co/59bJKHG/imageedit-27-6161657062.png",
            "ActionType": "reply",
            "ActionBody": "PRAVILA",
            "Text": "<font color='#E42619'>Pravila</font>",
        }
    ]
}

// Creating the bot with access token, name and avatar
const bot = new ViberBot({
    logger: logger,
    authToken: process.env.AUTH_TOKEN,
    name: "Trik Igra Memorije",
    avatar: "https://i.imgur.com/vZoVyif.jpeg"
});

bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) => {
    if (!isSubscribed) {
        bot.sendMessage(userProfile,[
            new TextMessage(`Zdravo, ${userProfile.name} 👋! Nalaziš se u Trik nagradnom konkursu!

Da li želiš da se igraš sa nama?`,KEYBOARD_WELCOME_MESSAGE)
        ]);
    } else {
        bot.sendMessage(userProfile,
            new TextMessage(`Dobro došao/la nazad ${userProfile.name} 👋!

Da li želiš da se igraš sa nama?`,KEYBOARD_WELCOME_MESSAGE))
    }
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    if (message instanceof TextMessage) {
        
        const txt = message.text;

        if (txt.toLowerCase() === "da") {
            bot.sendMessage(response.userProfile, [
                new TextMessage(`Pre nego što krenemo sa igrom, moraš da pročitaš i složiš se sa uslovima i pravilima nagradnog konkursa.
https://banini.rs/trikgg/Pravilnik.pdf`),
                new KeyboardMessage(KEYBOARD_TERMS_MESSAGE)
            ]);
        } 

        if (txt.toLowerCase() === "slazem se" || txt.toLowerCase() === "pravila") {
            bot.sendMessage(response.userProfile, [
                new TextMessage(`Pre same igre, gricnite TRIK kako biste uneli malo energije i krenite u pohod na prvo mesto!

Igra memorije je igra koja zahteva od igrača da pronađe dva polja koja se podudaraju sa istom slikom i to ponovi sve dok ne otkrije sva polja.
                
Svaki igač započinje igru sa 16 zatvorenih polja. Istovremeno okreće po dva polja, sa ciljem da okrene odgovarajući identični par slika koristeći svoje pamćenje. Maksimum koji može da otvori je 2 polja tokom jednog poteza. TRIK je da otvarate polja što brže i da pamtite slike koje ste videli.

Vreme predviđeno za igru je neograničeno, ali zadatak igre je da je završite za što kraće vreme. 

Broj pokušaja je neograničen, ali da bi ste evidentirali rezultat morate da priložite broj fiskalnog isečka (BI broj) na kome se nalazi bar jedan TRIK proizvod iz bilo kojeg IDEA ili RODA maloprodajnog objekta.  Svaki igrač mora da sačuva račun sa brojem isečka koji se nalazi na dnu fiskalnog računa i na kome je bilo koji od Trik proizvoda. Broj isečka je petocifreni ili šestocifreni broj iza slova „БИ“. Ovaj fiskalni isečak pokazuje se na uvid prilikom uručivanja nagrade najbržem igraču.

Svakog dana imamo pobednike dana koji osvajaju tri vredne nagrade, a u danu nedelji su tri nagrade još vrednije. I tako tri sedmice odnosno 21 dan za ukupno 63 vredne nagrade.

Za detaljna pravila i uslove posetite link:
https://banini.rs/trikgg/Pravilnik.pdf

Neka najbolji pobedi! 🙂`),
                new KeyboardMessage(KEYBOARD_MESSAGE)
            ]);
        }

    }
});

const http = require('http');
const port = process.env.PORT || 8080;

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
} else {
    console.log("TESTING LOCALLY");
    return ngrok.getPublicUrl()
    .then(publicUrl => {
        http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
    })
    .catch(error => {
        console.log('Can not connect to ngrok server. Is it running?');
        console.log(error);
    });
}