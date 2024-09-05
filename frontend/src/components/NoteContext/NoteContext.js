import {useState, createContext} from 'react'

export const NotesContext = createContext({ notes: [] });

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const addNote = (note) => {
        const newNote = { ...note, id: notes.length + 1 };
        setNotes(prev => [...prev, newNote]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const toggleArchive = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        ));
    };

    const updateNote = (updatedNote) => {
        setNotes(notes.map(note => 
            note.id === updatedNote.id ? updatedNote : note
        ));
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, deleteNote, toggleArchive, updateNote }}>
            {children}
        </NotesContext.Provider>
    );
};