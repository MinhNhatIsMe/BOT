const BootBot = require('bootbot');
const control = require('./commands/control');
require('dotenv').config();

const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const appSecret = process.env.APP_SECRET;
const botPrefix = process.env.BOT_PREFIX;
const rssToJsonApiKey = process.env.RSS_TO_JSON_API_KEY;

const bot = new BootBot({
    accessToken: pageAccessToken,
    verifyToken: webhookVerifyToken,
    appSecret: appSecret
});

control.help.start(bot, botPrefix);
control.covid.start(bot, botPrefix);
control.news.start(bot, botPrefix, rssToJsonApiKey);

bot.start(9900);