import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotesContext } from '../NoteContext/NoteContext';
import NoteList from '../NoteList/NoteList';
import './NoteListContainer.css';

const NoteListContainer = ({ filter }) => {
    const { notes, toggleArchive, deleteNote } = useContext(NotesContext);
    const [categoryFilter, setCategoryFilter] = useState('');

    const navigate = useNavigate();

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
                <NoteList notes={filteredNotes()} onToggleArchive={toggleArchive} onDelete={deleteNote} />
            </div>
        </div>
    )
}

export default NoteListContainer;