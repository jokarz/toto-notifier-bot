const Telegram = require('telegraf/telegram');

const bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

exports.notifyUser = async (id, { jackpot, date }) => {
  return await bot.sendMessage(id, `Hey there again!\n\nNext Toto Jackpot amount is *$${jackpot.toLocaleString()}*\nDraws on *${date}*\n\nGood Luck!!👍`, { parse_mode: 'Markdown' })
}