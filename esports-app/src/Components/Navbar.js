import {useRef} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';

import "../Styles/main.css";

function Navbar(){
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <h3>RSWEB Project</h3>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="http://localhost:3000/player">Players</a>
                <a href="http://localhost:3000/team">Teams</a>
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes/>

                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
        );
}

export default Navbar;