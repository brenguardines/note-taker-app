import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../NoteList/NoteList';
import axios from 'axios';
import './NoteListContainer.css';

const NoteListContainer = ({ filter, authToken }) => {
    const [notes, setNotes] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken'); 

    const refreshNotes = () => {
        if (!token) {
            console.error("No authToken found");
            navigate('/login');
        }

        axios.get('/api/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
             .then(response => {
                 setNotes(response.data);
             })
             .catch(error => {
                 console.error('There was an error fetching the notes', error);
             });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            refreshNotes();
        }
    }, [token, navigate]);

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
                    <option value="NoCategory">No Category</option>
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