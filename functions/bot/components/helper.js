// toto only happens on mon or thu historically
exports.abbrDayToFull = val => {
  const day = {
    'Mon': 'Monday',
    'Thu': 'Thursday'
  }
  return day[val] ? day[val] : val
}

exports.processDate = val => {

  try {
    let temp = val.split(',').map(item => item.trim())
    if (temp.length == 3) {
      return `*${this.abbrDayToFull(temp[0])}*, *${temp[1]}* at *${temp[2]}*`
    }else if (temp.length == 2){
      return `*${this.abbrDayToFull(temp[0])}*, *${temp[1]}*`
    }else{
      return val
    }
  } catch (e) {
    return val
  }
}

exports.getUser = info => {
  const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = info
  const name = (firstName ? firstName : '' + ' ' + lastName ? lastName : '').trim()
  return { id, isBot, name }
}

exports.toNumber = val => {
  if (typeof val === 'number'){
    return val
  }
  val = val.toLowerCase().trim()
  let unit = val[val.length - 1]
  let num = val.substring(0, val.length - 1)
  let res = null
  switch (unit) {
    case 'm': {
      res = Number(num*1000000)
      break;
    }
    case 'k': {
      res = Number(num*1000)
      break;
    }
    default :{
      res = Number(val)
    }
  }

  return res
}