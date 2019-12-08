const { getTotoDetails } = require('../components/fauna')
const { processDate } = require('../components/helper')

module.exports = async ctx => {
  ctx.session.type = null
  try {
    let details = await getTotoDetails()
    let amount = details['amount']

    if (details) {
      let date = processDate(details['date'])

      return ctx.reply(`The current Toto Jackpot amount is *$${amount.toLocaleString()}*\nDraws on ${date}`, { parse_mode: 'Markdown' })
    } else {
      return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
    }

  } catch (e) {
    console.log('At info function', e)
    return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
  }

}