import './NoteItem.css'

const NoteItem = ({note, onDelete, onToggleArchive}) => {
  return (
    <div className='noteItem'>
      <h3 className='noteTitle'>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        <button className="archiveButton" onClick={() => onToggleArchive(note.id)}>
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button className="deleteButton" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem