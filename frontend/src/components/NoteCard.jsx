import { FileText, Download, Eye, Calendar, Tag, User, BookOpen } from 'lucide-react';

const NoteCard = ({ note, showActions, onDelete, onEdit }) => {
    const pdfUrl = `http://localhost:5000/${note.pdfPath.replace(/\\/g, '/')}`;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{note.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {note.branch}
                    </span>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{note.subject}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{note.year} Year, Sem {note.semester}</span>
                    </div>
                    {note.user?.name && (
                        <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Uploaded by {note.user.name}</span>
                        </div>
                    )}
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{note.description}</p>

                {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center mt-auto">
                <div className="flex space-x-3">
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium transition-colors"
                        title="View PDF"
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </a>
                    <a
                        href={pdfUrl}
                        download
                        className="text-gray-600 hover:text-gray-900 flex items-center text-sm font-medium transition-colors"
                        title="Download PDF"
                    >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                    </a>
                </div>
                
                {showActions && (
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onEdit(note)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteCard;
