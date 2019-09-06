const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '1d51238866d14819860db8586988f5d9'
});

const handleAPICall = (req, res) => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.url)
    .then(data => res.json(data))
    .catch(err => console.log(err))
}

const handleImage = (req, res, knex) => {
    const { id } = req.body
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(data => res.json(data[0]))
        .catch(err => res.status(400).json('unable to get entries '))
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall,
}
