import { Link  } from 'react-router-dom';
import axios from 'axios';
import './NoteItem.css'

const NoteItem = ({note, refreshNotes  }) => {
  const handleArchive = () => {
    const endpoint = note.archived ? `/api/notes/${note.id}/unarchive` : `/api/notes/${note.id}/archive`;
    axios.put(endpoint)
         .then(() => {
             refreshNotes();
         })
         .catch(error => {
             console.error('Error toggling archive status', error);
         });
  };

  const handleDelete = () => {
    axios.delete(`/api/notes/${note.id}`)
         .then(() => {
             refreshNotes(); 
        })
        .catch(error => {
             console.error('Error deleting the note', error);
        });
  };

  return (
    <div className='noteItem'>
      <h3 className='noteTitle'>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        <button className="archiveButton" onClick={handleArchive}>
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <Link to={`/edit/${note.id}`}>
          <button className="editButton">Edit</button>
        </Link>
        <button className="deleteButton" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem