import { useContext } from 'react'
import { NotesContext } from '../../context/NotesContext';
import './NoteWidget.css';

const NoteWidget = ({ onCreateNote }) => {
    const { notes } = useContext(NotesContext);

    const activeNotes = notes.filter(note => !note.archived).length;
    const archivedNotes = notes.filter(note => note.archived).length;
  return (
    <div className="widgetNote">
      <div className="countNote">
        <p>Active Notes: {activeNotes}</p>
        <p>Archived Notes: {archivedNotes}</p>
      </div>
      <button className="btnCreateNote" onClick={onCreateNote}>
        Create Note
      </button>
    </div>
  )
}

export default NoteWidget