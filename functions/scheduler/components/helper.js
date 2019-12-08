// toto only happens on mon or thu historically
exports.abbrDayToFull = val => {
  const day = {
    'Mon': 'Monday',
    'Thu': 'Thursday'
  }
  return day[val] ? day[val] : val
}

exports.processJackpotDate = val => {

  try {
    let temp = val.split(',').map(item => item.trim())
    return `${this.abbrDayToFull(temp[0])}, ${temp[1]} at ${temp[2]}`
  } catch (e) {
    return val
  }
}

exports.simpleChecksum = str => {
  let hash = 0;

  if (str.length == 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);

    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}


exports.pause = (ms = 1000) => {

  return new Promise(res => {
    setTimeout(res, ms);
  })
}