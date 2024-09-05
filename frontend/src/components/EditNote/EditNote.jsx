import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { NotesContext } from '../NoteContext/NoteContext';
import '../CreateNote/CreateNote';

const EditNote = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { notes, updateNote } = useContext(NotesContext);

    const [noteToEdit, setNoteToEdit] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const foundNote = notes.find(note => note.id === parseInt(id));
        if (foundNote) {
            setNoteToEdit(foundNote);
            setTitle(foundNote.title);
            setContent(foundNote.content);
            setCategory(foundNote.category);
        }
    }, [id, notes]);

    if (!noteToEdit) {
        return <div>Note not found</div>;
    }

    const handleSave = (e) => {
        e.preventDefault();
        const updatedNote = {
          ...noteToEdit,
          title,
          content,
          category,
        };

        updateNote(updatedNote);
        navigate('/');
    };

    return (
        <form className="createNoteForm" onSubmit={handleSave}>
            <h2>Edit Note</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
            </select>
            <div className="form-actions">
                <button type="button" className="cancel" onClick={() => navigate('/')}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default EditNote;