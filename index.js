const express = require('express');
const http = require('https');
const axios = require('axios');
const bodyParser = require('body-parser');
const request = require("request");
const fs = require('fs');

require('dotenv').config();

let privateKey = fs.readFileSync('./SSL/privkey1.pem');
let certificate = fs.readFileSync( './SSL/cert1.pem' );

let app = express();
let server = http.createServer({
    key: privateKey,
    cert: certificate
}, app);

const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const appSecret = process.env.APP_SECRET;
const botPrefix = process.env.BOT_PREFIX;
const rssToJsonApiKey = process.env.RSS_TO_JSON_API_KEY;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.get('/webhook', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.query['hub.verify_token'] === webhookVerifyToken) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Sai mã xác minh!');
});


app.post('/webhook', function (req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
    res.setHeader('Content-Type', 'application/json');
    let entries = req.body.entry;
    for (let entry of entries) {
        let messaging = entry.messaging;
        for (let message of messaging) {
            let senderId = message.sender.id;
            if (message.message) {
                if (message.message.text) {
                    lettext = message.message.text;
                    sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
                }
            }
        }
    }
    res.status(200).send("OK");
});


function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: pageAccessToken,
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}

server.listen(26000);