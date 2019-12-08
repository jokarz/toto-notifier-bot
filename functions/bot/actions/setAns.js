const { updateUserMinVal } = require('../components/fauna')
const { getUser, toNumber } = require('../components/helper')

module.exports = async ctx => {
  const { id } = getUser(ctx.from)
  const { type } = ctx.session
  if (type && type == 'set') {
    const min = toNumber(ctx.message.text)
    if (min && min > 1) {
      try {
        if (min < 100000000) {
          ctx.session.type = null
          await updateUserMinVal(id, min)
          return ctx.reply(`Done! Will notify you if the upcoming Jackpot amount is more than or equal to *$${min.toLocaleString()}* 👍`, { parse_mode: 'Markdown' })
        } else {
          return ctx.reply(`Please provide a *reasonable* number for the Jackpot amount`, { parse_mode: 'Markdown' })
        }

      } catch (e) {
        ctx.session.type = null
        console.log('At setAns function', e)
        return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
      }

    } else {
      return ctx.reply(`😑 *Please provide a valid amount that is more than 1*`, { parse_mode: 'Markdown' })
    }

  }
}