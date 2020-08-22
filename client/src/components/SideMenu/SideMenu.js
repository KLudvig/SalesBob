import React from 'react';
import './SideMenu.css';
import { NavLink } from 'react-router-dom';

export class SideMenu extends React.Component {
    render() {
        return (
            <div className="nav-container">
                <NavLink exact to="/" style={{ marginTop: 0 }}>Leads</NavLink>
                <NavLink exact to="/statistics">Statistics <span className="coming-soon">Coming soon!</span></NavLink>
                <NavLink exact to="/settings">Settings</NavLink>
                <NavLink exact to="/help">Help</NavLink>
            </div>
        );
    }
}