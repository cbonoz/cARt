import React, { Component } from 'react';
import ReactRotatingText from 'react-rotating-text'

class Slogan extends Component {
    render() {
        const items = [
            'Residential',
            'Condo',
            'Commercial',
            'Industrial',
            'Highway',
        ]
        return (
            <div className='slogan-text'>
                <p>NLP-powered Search Engine for Lessons from&nbsp;<br/><span>
                <ReactRotatingText items={items} />
                    </span>Construction Projects</p>      
            </div>
        );
    }
}

export default Slogan;