const express = require('express');
const router = express.Router();
const {
    getNotes,
    getMyNotes,
    createNote,
    updateNote,
    deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getNotes)
    .post(protect, upload.single('pdf'), createNote);

router.route('/my-notes').get(protect, getMyNotes);

router.route('/:id')
    .put(protect, upload.single('pdf'), updateNote)
    .delete(protect, deleteNote);

module.exports = router;
