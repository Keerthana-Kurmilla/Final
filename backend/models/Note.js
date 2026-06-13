const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        subject: {
            type: String,
            required: [true, 'Please add a subject'],
        },
        branch: {
            type: String,
            required: [true, 'Please add a branch'],
            enum: ['CSE', 'AIML', 'DS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'],
        },
        year: {
            type: String,
            required: [true, 'Please add a year'],
            enum: ['1st', '2nd', '3rd', '4th'],
        },
        semester: {
            type: Number,
            required: [true, 'Please add a semester'],
            min: 1,
            max: 8,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        tags: {
            type: [String],
        },
        pdfPath: {
            type: String,
            required: [true, 'Please upload a PDF file'],
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
