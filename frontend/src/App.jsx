import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import NoteListContainer from './components/NoteListContainer/NoteListContainer';
import Footer from './components/Footer/Footer';
import { NotesProvider } from './components/NoteContext/NoteContext';
import CreateNote from './components/CreateNote/CreateNote';
import EditNote from './components/EditNote/EditNote';
import './App.css';
const App = () => {
  const [filter, setFilter] = useState('all');

  return (
    <NotesProvider>
      <Router>
        <div className="app-content">
          <Header onFilterChange={setFilter} />
          <Routes>
          <Route path="/" element={<NoteListContainer filter="all" />} />
            <Route path="/active" element={<NoteListContainer filter="active" />} />
            <Route path="/archived" element={<NoteListContainer filter="archived" />} />
            <Route path="/new" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </NotesProvider>
  );
};

export default App;
