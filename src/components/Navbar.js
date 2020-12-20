import React from 'react';
import logo from '../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    state = {
        isOpen: false
    }
    // to toggle the burger menu 
    handleToggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() {
        return(
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="Beach Resort"/>
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>    
                        <li>
                            <Link to="/rooms">Rooms</Link>
                        </li> 
                    </ul> {/*I have used ternary operators here, to check wether or not to show the links */}
                </div>
            </nav>
        )
    }
}

export default Navbar