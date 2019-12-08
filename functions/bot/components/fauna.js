const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY });
const q = faunadb.query;

exports.newUser = (id) => {
  return new Promise((res, rej) => {
    client.query(
      q.Create(
        q.Collection('user'),
        { data: { userId: id, minimum: false } },
      )
    ).then(ret => {
      res(true)
    }).catch(err => {
      rej(err)
    });
  })
}

exports.getUserMinVal = id => {
  return new Promise((res, rej) => {
    client.query(
      q.Get(
        q.Match(q.Index('toto_min'), id)
      )
    ).then(ret => {
      res(ret.data.minimum)
    }).catch(err => {
      rej(err)
    });
  })
}

exports.updateUserMinVal = (id, min) => {
  return new Promise((res, rej) => {
    client.query(
      q.Update(
        q.Select('ref',
          q.Get(
            q.Match(q.Index('toto_min'), id)
          )
        ),
        { data: { minimum: min } }
      )
    ).then(ret => {
      res(true)
    }).catch(err => {
      rej(err)
    });

  })
}

exports.getTotoDetails = async (type = 'jackpot_prize') => {
  try {
    let res = await client.query(
      q.Select('data',
        q.Get(
          q.Match(
            q.Index('last_result'), type
          )
        )
      )
    )
    return res
  } catch (e) {
    return null
  }
}