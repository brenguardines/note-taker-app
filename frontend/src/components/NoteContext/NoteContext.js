import {useState, createContext} from 'react'

export const NotesContext = createContext({ notes: [] });

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const addNote = (note) => {
        setNotes(prev => [...prev, note]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const toggleArchive = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        ));
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, toggleArchive }}>
            {children}
        </NotesContext.Provider>
    );
};