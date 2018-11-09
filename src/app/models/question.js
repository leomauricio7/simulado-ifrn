const mongoose = require('../../lib/database');
const mongoosePaginate = require('mongoose-paginate');

const QuestionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    alt1: {
        type: String,
        required: true,
    },
    alt2: {
        type: String,
        required: true,
    },
    alt3: {
        type: String,
        required: true,
    },
    alt4: {
        type: String,
        required: true,
    },
    resposta: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tipo: {
        type: String,
        enum: ['portugues', 'matematica'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

QuestionSchema.plugin(mongoosePaginate);

//salvando o esquema da colection na variavel
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;