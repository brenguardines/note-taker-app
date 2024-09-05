import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Header.css'

const Header = ({ onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const location = useLocation();

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
            <li>
                    <Link to="/" onClick={() => handleFilterChange('all')} className={activeFilter === 'all' ? 'active' : ''}>
                        Notes
                    </Link>
                </li>
                <li>
                    <Link to="/active" onClick={() => handleFilterChange('active')} className={activeFilter === 'active' ? 'active' : ''}>
                        Active
                    </Link>
                </li>
                <li>
                    <Link to="/archived" onClick={() => handleFilterChange('archived')} className={activeFilter === 'archived' ? 'archived' : ''}>
                        Archived
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header