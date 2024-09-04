import { useState } from 'react'
import './Header.css'

const Header = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

  return (
    <header>
        <div className="logo">
            <h1 className="titlePage">NOTE TRAKER</h1>
        </div>

        <nav>
            <ul>
                <li onClick={() => handleFilterChange('all')} className={activeFilter === 'all' ? 'active' : ''}>Notes</li>
                <li onClick={() => handleFilterChange('active')} className={activeFilter === 'active' ? 'active' : ''}>Active</li>
                <li onClick={() => handleFilterChange('archived')} className={activeFilter === 'archived' ? 'archived' : ''}>Archived</li>
            </ul>
        </nav>
    </header>
  )
}

export default Header