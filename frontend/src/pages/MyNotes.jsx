import { useState, useEffect } from 'react';
import api from '../utils/api';
import NoteCard from '../components/NoteCard';
import { User, BookOpen, AlertCircle } from 'lucide-react';

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Edit Modal State
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [editFile, setEditFile] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchMyNotes = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notes/my-notes');
            setNotes(res.data);
        } catch (err) {
            setError('Failed to fetch your notes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyNotes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
            try {
                await api.delete(`/notes/${id}`);
                setNotes(notes.filter(note => note._id !== id));
            } catch (err) {
                alert('Failed to delete note');
                console.error(err);
            }
        }
    };

    const handleEditClick = (note) => {
        setCurrentNote(note);
        setEditFormData({
            title: note.title,
            subject: note.subject,
            branch: note.branch,
            year: note.year,
            semester: note.semester,
            description: note.description,
            tags: note.tags ? note.tags.join(', ') : '',
        });
        setEditFile(null);
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const data = new FormData();
        Object.keys(editFormData).forEach(key => {
            data.append(key, editFormData[key]);
        });
        if (editFile) {
            data.append('pdf', editFile);
        }

        try {
            const res = await api.put(`/notes/${currentNote._id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            // Update notes list
            setNotes(notes.map(n => n._id === currentNote._id ? res.data : n));
            setIsEditing(false);
            setCurrentNote(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update note');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Uploads</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all the notes you have contributed</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {notes.map(note => (
                        <NoteCard 
                            key={note._id} 
                            note={note} 
                            showActions={true} 
                            onDelete={handleDelete}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                    <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No notes uploaded yet</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                        You haven't shared any notes. Head over to the upload page to start contributing to the community.
                    </p>
                    <div className="mt-6">
                        <a href="/upload" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            Upload Note
                        </a>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-lg font-medium text-gray-900">Edit Note</h3>
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" name="title" required value={editFormData.title} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" name="subject" required value={editFormData.subject} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                                    <select name="branch" required value={editFormData.branch} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border">
                                        {['CSE', 'AIML', 'DS', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'].map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <select name="year" required value={editFormData.year} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border">
                                        {['1st', '2nd', '3rd', '4th'].map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                                    <select name="semester" required value={editFormData.semester} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                                <input type="text" name="tags" value={editFormData.tags} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" required rows={3} value={editFormData.description} onChange={handleEditChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Update PDF (Optional)</label>
                                <input type="file" accept=".pdf" onChange={(e) => setEditFile(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                <p className="text-xs text-gray-500 mt-1">Leave empty to keep the existing PDF.</p>
                            </div>
                            <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200 mt-6">
                                <button type="button" onClick={() => setIsEditing(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isUpdating} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyNotes;
