import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css'

const NoteList = ({ notes, onDelete, onToggleArchive }) => {
  return (
    <div className='noteContainer'>
        {notes.map(note => (
            <NoteItem key={note.id} note={note} onDelete={onDelete} onToggleArchive={onToggleArchive} />
        ))}
    </div>
  )
}

export default NoteList