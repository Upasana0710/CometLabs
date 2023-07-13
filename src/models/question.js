import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('Question', questionSchema);
