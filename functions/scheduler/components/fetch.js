const fetch = require('node-fetch');

const getPage = async (url, tries = 1, maxTries = 3) => {
  try {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'Host': process.env.TOTO_HOST
      }
    };
    const res = await fetch(url, options)
    const body = await res.text()

    return body
  } catch (e) {

    if (tries <= maxTries) {
      return getPage(url, tries + 1)
    } else {
      return null
    }
  }
}

exports.getJackpotPrizePage = async () => {
  return await getPage(process.env.TOTO_JACKPOTPRIZE_URL)
}

exports.getPreviousWinningPage = async () => {
  return await getPage(process.env.TOTO_PREVIOUSWINNING_URL)
}

exports.recallSelf = async (tries = 1, maxTries = 3) => {

  try {
    await fetch(process.env.SCHEDULER_URL, {
      headers: {
        'User-Agent': 'From myself',
      },
      method: 'HEAD'
    })

  } catch (e) {

    if (tries <= maxTries) {
      return this.recallSelf(tries + 1)
    } else {
      return null
    }
  }
}
