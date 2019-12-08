const { pause, processJackpotDate } = require('./components/helper')
const { getUsers, getTotoDetails, updateTotoDetails } = require('./components/fauna')
const { getPreviousWinningDetails, getJackpotDetails } = require('./components/cheerio')
const { getPreviousWinningPage, getJackpotPrizePage, recallSelf } = require('./components/fetch')
const { notifyUser } = require('./components/telegram')


const resolve = async () => {
  try {

    let lastDetails = await getTotoDetails()
    if (lastDetails['last']) {
      //continuing on from last exec of scheduler
      //console.log('Resuming...')
      await getAllUsers(lastDetails)
      return
    }

    let details = getJackpotDetails(await getJackpotPrizePage())

    if (details && lastDetails['date'] + lastDetails['amount'] !== details['date'] + details['amount']) {
      //new jackpot
      let previousWinningDetails = getPreviousWinningDetails(await getPreviousWinningPage())

      await Promise.all([
        getAllUsers(details, true),
        updateTotoDetails(previousWinningDetails, 'previous_winnings')
      ])

    }

  } catch (e) {
    console.log('At resolve function', e)
  }
}


const getAllUsers = async (jackpotDetails, newJackpot = false, countDown = 8) => { //countDown to prevent execution limit from netlify function
  let jackpot = jackpotDetails['amount']
  let last = jackpotDetails['last'] ? jackpotDetails['last'] : null
  let date = processJackpotDate(jackpotDetails['date'])
  let users = null

  try {
    
    while (countDown) {
      users = await getUsers(last)
      const stack = []

      for (let i = 0; i < users.data.length; i++) {
        let user = users.data[i]
        if (user.minimum <= jackpot) {
          stack.push(notifyUser(user.userId, { jackpot, date }))
        }
      }

      await Promise.all(stack)

      if (!users['after']) {
        break
      } else {
        last = users['after']
        await pause() // pause 1 sec 
      }
      countDown--
    }

    if (users['after']) { //launching another scheduler request
      await updateTotoDetails({ ...jackpotDetails, last: users['after'] })
      await pause() // prevent 2x the msg send within a sec
      //console.log('to be continued...')
      recallSelf()
      await pause(500) //buffer for poking
    } else {
      await updateTotoDetails({ ...jackpotDetails, last: null })
    }

  } catch (e) {
    console.log('At getAllUsers function', e)
  }
}

exports.handler = async event => {

  try {
    await resolve()
    return { statusCode: 200, body: 'I, Giorno Giovanna, have a dream...' };
  } catch (e) {
    console.log('At scheduler function', e)
  }

}