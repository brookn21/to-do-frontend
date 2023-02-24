import React from "react";
import { Link } from "react-router-dom"
import "../App.css"

function NavBar(props){
    const { setUser } = props
    
    function signUserOut(){
        localStorage.clear()
        setUser(null)
    }
return(
    <div className="sum">
        <div className="title">
        <a href="/"> </a>
        </div>
        
            <nav className="item">
        <ul className="ul">
            <li><Link to="/account">Sign Up</Link></li> 
            <li onClick={signUserOut}><Link to="/">Sign Out</Link></li>
        </ul>
    </nav>
    </div>
)
}

export default NavBar;