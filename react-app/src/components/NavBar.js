import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from "../images/mapsOnmapsLogo.png"
import {useSelector} from "react-redux"

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            <div className='nav-header'>
            <img className='logo' src={logo} alt="logo" />
            <span className='header'>Maps On Maps</span>

            </div>
          </NavLink>
        </li>
        {user? <li>
          <LogoutButton />
        </li>:
        <>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        </>
        }
        
        
      </ul>
    </nav>
  );
}

export default NavBar;
