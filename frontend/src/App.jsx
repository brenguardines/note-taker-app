import { useState } from 'react'
import Header from './components/Header/Header';
import NoteListContainer from './components/NoteListContainer/NoteListContainer';
import Footer from './components/Footer/Footer';
import { NotesProvider } from './components/NoteContext/NoteContext';
import './App.css';
const App = () => {
  const [filter, setFilter] = useState('all');

  return (
    <NotesProvider>
      <div className="app-content">
        <Header onFilterChange={setFilter}/>
        <NoteListContainer filter={filter}/>
        <Footer/>
      </div>
    </NotesProvider>
  );
};

export default App;
