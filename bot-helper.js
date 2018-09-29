const TelegramBot = require('node-telegram-bot-api');
const botToken = require('./botToken');

const token = botToken;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    
    console.log(msg);
});