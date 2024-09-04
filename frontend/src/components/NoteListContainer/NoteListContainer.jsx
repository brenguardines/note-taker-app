import { useState, useEffect } from 'react'
import NoteList from '../NoteList/NoteList';
import './NoteListContainer.css'

const NoteListContainer = ({ filter }) => {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', category: '', archived: false });
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        setNotes([
            {id: 1, title: 'Note 1', content: 'Content note 1', archived: false},
            {id: 2, title: 'Note 2', content: 'Content note 2', archived: true},
            {id: 3, title: 'Note 3', content: 'Content note 3', archived: false},
            {id: 4, title: 'Note 4', content: 'Content note 4', archived: false},
            {id: 5, title: 'Note 5', content: 'Content note 5', archived: true},
            {id: 6, title: 'Note 6', content: 'Content note 6', archived: false},
            {id: 7, title: 'Note 7', content: 'Content note 7', archived: true},
            {id: 8, title: 'Note 8', content: 'Content note 8', archived: true}
        ]);
    }, []);

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const toggleArchive = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        ));
    };

    const addNote = () => {
        const newId = notes.length + 1;
        setNotes([...notes, { ...newNote, id: newId }]);
        setShowForm(false);
        setNewNote({ title: '', content: '', category: '', archived: false });
    };

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
                    <option value="">Search Categories</option>
                </select>
                <button className="newNoteButton" onClick={() => setShowForm(true)}>New Note</button>
            </div>
            <div className="noteContainer">
                <NoteList notes={filteredNotes()} onDelete={deleteNote} onToggleArchive={toggleArchive} />
            </div>
        </div>
    )
}

export default NoteListContainer;