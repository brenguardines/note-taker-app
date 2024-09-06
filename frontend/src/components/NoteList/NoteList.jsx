import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css'

const NoteList = ({ notes, refreshNotes }) => {
  return (
    <div className='noteContainer'>
        {notes.map(note => (
            <NoteItem key={note.id} note={note} refreshNotes={refreshNotes} />
        ))}
    </div>
  )
}

export default NoteList