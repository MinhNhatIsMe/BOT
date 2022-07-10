const axios = require('axios');

exports.start = (bot, botPrefix) => {
    bot.hear([`${botPrefix}covid`], (payload, chat) => {
        axios.get('https://static.pipezero.com/covid/data.json').then(response => {

            let addComma = (number) => {
                return new Intl.NumberFormat('it-IT').format(number);
            };
            
            const internalCases = addComma(response.data.total.internal.cases);
            const internalRecovered = addComma(response.data.total.internal.recovered);
            const internalTreating = addComma(response.data.total.internal.treating);
            const internalDeath = addComma(response.data.total.internal.death);
            const worldCases = addComma(response.data.total.world.cases);
            const worldRecovered = addComma(response.data.total.world.recovered);
            const worldTreating = addComma(response.data.total.world.treating);
            const worldDeath = addComma(response.data.total.world.death);       

            chat.say(`Tình hình dịch covid-19\n🇻🇳 Tình hình trong nước:\n- Số ca mắc: ${internalCases}\n- Số ca đã chữa khỏi: ${internalRecovered}\n- Số ca đang điều trị: ${internalTreating}\n- Số ca tử vong: ${internalDeath}\n🌎 Tình hình thế giới\n- Số ca mắc: ${worldCases}\n- Số ca đã chữa khỏi: ${worldRecovered}\n- Số ca đang điều trị: ${worldTreating}\n- Số ca tử vong: ${worldDeath}\n`);
        });
    });
}