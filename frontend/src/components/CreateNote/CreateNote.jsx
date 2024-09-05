import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotesContext } from '../NoteContext/NoteContext';
import './CreateNote.css';

const CreateNote = () => {
    const { addNote } = useContext(NotesContext); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            title,
            content,
            category,
            archived: false,
        };
        addNote(newNote);
        navigate('/');
    };

    return (
        <form className="createNoteForm" onSubmit={handleSubmit}>
            <h2>Create Note</h2>
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
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateNote;