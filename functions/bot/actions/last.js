const { getTotoDetails } = require('../components/fauna')
const { processDate } = require('../components/helper')

module.exports = async ctx => {
  ctx.session.type = null
  try {
    let details = await getTotoDetails('previous_winnings')

    if (details) {
      let date = processDate(details['prevDate'])
      let numbers = details['prevNumbers']
      numbers = numbers.map((item, i) => i == numbers.length - 1 ? `\nAdditional number: \n*${item}*` : `*${item}*`).join('\n')

      return ctx.reply(`The last Toto draw was on ${date}\n\nThe winning numbers are: \n${numbers}`, { parse_mode: 'Markdown' })
    }
  } catch (e) {
    console.log('At prevNum function', e)
  }
  return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
}