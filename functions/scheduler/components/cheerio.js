const cheerio = require('cheerio')

exports.getJackpotDetails = body => {

  if (body === null) {
    return body
  }

  const $ = cheerio.load(body)
  let amount = $('span').text().substring(1) //removing $
  let date = $('.toto-draw-date').text()

  if (isNaN(Number(amount[amount.length - 1]))) {
    amount = amount.substring(0, amount.length - 4) //removing ' est'
  }
  amount = Number(amount.replace(/,/g, '')) // removing ','
  return { amount, date }
}

exports.getPreviousWinningDetails = body => {
  if (body === null) {
    return body
  }

  const $ = cheerio.load(body)

  let prevDate = $('li:first-child .drawDate').text()
  let prevNumbers = []
  $('li:first-child .table.table-striped:not(.jackpotPrizeTable):not(.tableWinningShares) td').each((i, el) => {
    prevNumbers.push(Number($(el).text()))
  })

  return { prevDate, prevNumbers }
}