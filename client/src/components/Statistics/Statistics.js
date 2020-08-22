import React from 'react';
import './Statistics.css';
import {SideMenu} from '../SideMenu/SideMenu';

export class Statistics extends React.Component {
    render() {
        return (
            <>
            <SideMenu />
            <div className="container">
                <span className="work-in-progress"><h2 style={{fontWeight: 900}}>Coming soon</h2>Here you will see how you are holding up against your competitors</span>
            </div>
            </>
        )
    }
}