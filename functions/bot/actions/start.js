const { newUser, getUserMinVal } = require('../components/fauna')
const { getUser } = require('../components/helper')

module.exports = async ctx => {
  ctx.session.type = null
  const { id, isBot, name } = getUser(ctx.from)

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`)
  }

  try {
    let min = await getUserMinVal(id)

    if (min) {
      return ctx.reply(`Hello again *${name}*~ please use /set to update your minimum amount to get notifications for`, { parse_mode: 'Markdown' })
    } else {
      return ctx.reply(`Hello again *${name}*~ Seems like you haven't set a minimum amount, please use /set to set the minimum amount`, { parse_mode: 'Markdown' })
    }

  } catch (e) {

    try {
      await newUser(id)
      
      ctx.session.type = 'set'
      return ctx.reply(`Hello there *${name}*!\nTo get started, enter the minimum amount of the Toto Jackpot you want to get notifications for (e.g. 4m, 500k, 2000000)`, { parse_mode: 'Markdown' })
    } catch (e) {

      console.log('At start function', e)
      return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
    }

  }
}