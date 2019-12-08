const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY });
const q = faunadb.query;

exports.getUsers = async (last = null, size = 29) => { // ensure batch notification size stays within 30msg/s of telegram limit

  let option = {
    size
  }

  if (last !== null) {
    option['after'] = last
  }

  try {
    let res = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('all_user')),
          option
        ),
        q.Lambda("X", q.Select('data', q.Get(q.Var("X"))))
      )
    )

    return res;
  } catch (e) {
    return null
  }
}

exports.updateTotoDetails = async (details, type = 'jackpot_prize') => {

  try {
    let res = await client.query(
      q.Update(
        q.Select('ref',
          q.Get(
            q.Match(q.Index('last_result'), type)
          )
        ),
        { data: details }
      )
    )

    return res
  } catch (e) {
    return null
  }

}

exports.getTotoDetails = async (type = 'jackpot_prize') => {

  try {
    let res = await client.query(
      q.Select('data',
        q.Get(
          q.Match(q.Index('last_result'), type)
        )
      )
    )

    return res
  } catch (e) {
    return null
  }
}