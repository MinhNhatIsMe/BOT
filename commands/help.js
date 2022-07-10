exports.start = (bot, botPrefix) => {
    bot.hear([`${botPrefix}help`], (payload, chat) => {
        chat.say(`Bạn vừa yêu cầu trợ giúp`);
    });
}