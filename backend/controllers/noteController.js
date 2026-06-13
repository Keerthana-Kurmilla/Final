const Note = require('../models/Note');
const fs = require('fs');
const path = require('path');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res, next) => {
    try {
        const { search, branch, year, semester } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        if (branch) query.branch = branch;
        if (year) query.year = year;
        if (semester) query.semester = semester;

        const notes = await Note.find(query).populate('user', 'name').sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user notes
// @route   GET /api/notes/my-notes
// @access  Private
const getMyNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

// @desc    Create note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
    try {
        const { title, subject, branch, year, semester, description, tags } = req.body;

        if (!title || !subject || !branch || !year || !semester || !description) {
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(400);
            throw new Error('Please add all required fields');
        }

        if (!req.file) {
            res.status(400);
            throw new Error('Please upload a PDF file');
        }

        const note = await Note.create({
            title,
            subject,
            branch,
            year,
            semester,
            description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            pdfPath: req.file.path,
            user: req.user.id,
        });

        res.status(201).json(note);
    } catch (error) {
        if (req.file) {
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }
        next(error);
    }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(404);
            throw new Error('Note not found');
        }

        if (note.user.toString() !== req.user.id) {
            if (req.file) fs.unlinkSync(req.file.path);
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedData = { ...req.body };
        
        if (req.body.tags && typeof req.body.tags === 'string') {
            updatedData.tags = req.body.tags.split(',').map(tag => tag.trim());
        }

        if (req.file) {
            // Delete old file
            if (fs.existsSync(note.pdfPath)) {
                fs.unlinkSync(note.pdfPath);
            }
            updatedData.pdfPath = req.file.path;
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
        });

        res.status(200).json(updatedNote);
    } catch (error) {
        if (req.file) {
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }
        next(error);
    }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            res.status(404);
            throw new Error('Note not found');
        }

        if (note.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        // Delete the PDF file
        if (fs.existsSync(note.pdfPath)) {
            fs.unlinkSync(note.pdfPath);
        }

        await note.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotes,
    getMyNotes,
    createNote,
    updateNote,
    deleteNote,
};
