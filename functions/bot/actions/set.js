const { newUser, getUserMinVal } = require('../components/fauna')
const { getUser } = require('../components/helper')

module.exports = async ctx => {
  const { id } = getUser(ctx.from)
  ctx.session.type = 'set'
  
  try {
    let min = await getUserMinVal(id)

    if (!min && min !== false) {
      await newUser(id)
    }
    
    return ctx.reply(`Enter the minimum amount of the Toto Jackpot you want to get notifications for (e.g. 4m, 500k, 2000000)${min ? `\n*Currently set at $${min.toLocaleString()}*` : ''}`, { parse_mode: 'Markdown' })
  } catch (e) {
    console.log('At set function', e)
    return ctx.reply(`Sorry! There seem to be problems on my end, please try again later 😔`, { parse_mode: 'Markdown' })
  }

}