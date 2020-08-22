import React from 'react';
import { SideMenu } from '../SideMenu/SideMenu'
import { Bob } from './Bob/Bob'

export class Leads extends React.Component {

    render() {
        return (
            <>
                <SideMenu />
                <Bob />
            </>
        );
    }
}