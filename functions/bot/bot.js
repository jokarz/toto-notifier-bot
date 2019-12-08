const Telegraf = require('telegraf');
const session = require('telegraf/session')

const startAction = require('./actions/start')
const infoAction = require('./actions/info')
const lastAction = require('./actions/last')
const setAction = require('./actions/set')
const setAnswerAction = require('./actions/setAns')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.use(session())

bot.start(ctx => {
  return startAction(ctx)
})

bot.command('set', ctx => {
  return setAction(ctx)
})

bot.command('last', ctx => {
  return lastAction(ctx)
})

bot.command('info', ctx => {
  return infoAction(ctx)
})

bot.on('text', ctx => {
  return setAnswerAction(ctx)
})

exports.handler = async event => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: 'I, Giorno Giovanna, have a dream...' };
}