const { Schema, model } = require('mongoose')

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    otherTitles: [String],
    developers: [String],
    publishers: [String],
    genres: [String],
    firstReleased: Date,
    japanReleased: Date,
    usaReleased: Date,
    euroReleased: Date,
}, {collecton: 'games', strict: false})

const Game =  model('Game', GameSchema)

module.exports = {
    find: (criteria) => {
        const { q, limit, page, fields, orderBy, sortBy = 1 } = criteria
        const query =  Game.find()
        const skip = (page>1) ? (page-1)*limit : 0

        if(q) {
            const regex = new RegExp(`.*${q}.*`, 'i')
            const searchQuery = { $or: [
                { title: regex },
                { otherTitles: regex },
                { developers: regex }
            ] }
            query.find(searchQuery)
        } 
        if (limit) query.limit(limit)
        if (skip) query.skip(skip)
        if (fields) query.select(fields.split(','))
        if (orderBy) query.sort({ [orderBy]: sortBy })

        return query.exec()
    }
}