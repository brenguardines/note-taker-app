import { useState } from 'react'
import { Link } from 'react-router-dom';
import userLogo from '../../img/userIcon.webp'
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
            <h1 className="titlePage">NOTE TAKER</h1>
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
                <li>
                    <div className='user-logo'>
                        <img src={userLogo} alt="" />
                    </div>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header