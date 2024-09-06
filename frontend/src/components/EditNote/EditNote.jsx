import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CreateNote/CreateNote';

const EditNote = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get(`/api/notes/${id}`)
             .then(response => {
                 const { title, content, category } = response.data;
                 setTitle(title);
                 setContent(content);
                 setCategory(category);
             })
             .catch(error => {
                 console.error('There was an error fetching the note', error);
             });
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();
        const updatedNote = {
          title,
          content,
          category,
        };

        axios.put(`/api/notes/${id}`, updatedNote)
             .then(response => {
                console.log('Note updated', response.data);
                navigate('/');
             })
             .catch(error => {
                console.error('There was an error updating the note', error);
             });
    };

    return (
        <form className="createNoteForm" onSubmit={handleSave}>
            <h2>Edit Note</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
                <option value="NoCategory">No Category</option>
            </select>
            <div className="form-actions">
                <button type="button" className="cancel" onClick={() => navigate('/')}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default EditNote;