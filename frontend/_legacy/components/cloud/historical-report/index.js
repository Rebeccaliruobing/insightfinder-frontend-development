import React, {Component} from 'react';
import {
    BaseComponent, Console, ButtonGroup, Button, Popup, Modal,
    Dropdown, Accordion, Message
} from '../../../artui/react';
import {InsightReport} from '../insight-report';
import IncidentAnalysis from '../incident-analysis';

export default class HistoricalReport extends Component {
    render(){
        return (
            <Console.Content>
                <InsightReport />
                <hr />
                <IncidentAnalysis />
            </Console.Content>
        )
    }
}
