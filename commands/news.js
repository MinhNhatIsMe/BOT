const axios = require('axios');

exports.start = (bot, botPrefix, rssToJsonApiKey) => {
    bot.hear([`${botPrefix}news`], (payload, chat) => {
        const rss = ['https://vnexpress.net/rss/tin-moi-nhat.rss',
            'https://vnexpress.net/rss/the-gioi.rss',
            'https://vnexpress.net/rss/thoi-su.rss',
            'https://vnexpress.net/rss/kinh-doanh.rss',
            'https://vnexpress.net/rss/startup.rss',
            'https://vnexpress.net/rss/giai-tri.rss',
            'https://vnexpress.net/rss/the-thao.rss',
            'https://vnexpress.net/rss/phap-luat.rss',
            'https://vnexpress.net/rss/giao-duc.rss',
            'https://vnexpress.net/rss/tin-moi-nhat.rss',
            'https://vnexpress.net/rss/tin-noi-bat.rss',
            'https://vnexpress.net/rss/suc-khoe.rss',
            'https://vnexpress.net/rss/gia-dinh.rss',
            'https://vnexpress.net/rss/du-lich.rss',
            'https://vnexpress.net/rss/khoa-hoc.rss',
            'https://vnexpress.net/rss/so-hoa.rss',
            'https://vnexpress.net/rss/oto-xe-may.rss',
            'https://vnexpress.net/rss/y-kien.rss',
            'https://vnexpress.net/rss/tam-su.rss',
            'https://vnexpress.net/rss/cuoi.rss',
            'https://vnexpress.net/rss/tin-xem-nhieu.rss'];

        const randomRss = rss[Math.floor(Math.random() * rss.length)];

        axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${randomRss}&api_key=${rssToJsonApiKey}`).then(response => {

            let content = '';
            response.data.items.forEach(item => {
                content += `- ${item.title}\n${item.link}\n`;
            });

            chat.say(content);
        });
    });
}