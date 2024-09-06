import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../NoteList/NoteList';
import axios from 'axios';
import './NoteListContainer.css';

const NoteListContainer = ({ filter }) => {
    const [notes, setNotes] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const navigate = useNavigate();

    const refreshNotes = () => {
        axios.get('/api/notes')
             .then(response => {
                 setNotes(response.data);
             })
             .catch(error => {
                 console.error('There was an error fetching the notes', error);
             });
    };

    useEffect(() => {
        refreshNotes();
    }, []);

    const filteredNotes = () => {
        let filtered = notes;
        if (filter === 'active') {
            filtered = filtered.filter(note => !note.archived);
        } else if (filter === 'archived') {
            filtered = filtered.filter(note => note.archived);
        }
        if (categoryFilter) {
            filtered = filtered.filter(note => note.category.toLowerCase().includes(categoryFilter.toLowerCase()));
        }
        return filtered;
    };

    return (
        <div className="noteContainerWrapper">
            <div className="note-actions">
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">Search Category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                </select>
                <button className="newNoteButton" onClick={() => navigate('/new')}>New Note</button>
            </div>
            <div className="noteContainer">
                <NoteList notes={filteredNotes()} refreshNotes={refreshNotes} />
            </div>
        </div>
    );
};

export default NoteListContainer;