import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap'
import displacy from './displacy';
import LessonCard from './LessonCard'

import { getParsings, getSearchResults } from './../helper/api'

class Search extends Component {

    state = {
        searchText: '',
        searchResults: [],
        parsed: {},
        disp: null
    }

    constructor() {
        super()
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.extractKeywordsAndFindResults = this.extractKeywordsAndFindResults.bind(this)
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value });
    }

    extractKeywordsAndFindResults(parsed) {
        const self = this
        const words = parsed.words
        const targetWords = words.filter(word => word.tag === 'VERB' || word.tag === 'NOUN' || word.tag === 'ADJ')
        getSearchResults(targetWords).then(res => {
            console.log('results', JSON.stringify(res))
            const searchResults = res.data.data
            self.setState({ searchResults })
        })
    }

    search() {
        const { searchText, disp } = this.state
        const self = this

        getParsings(searchText).then(res => {
            const parsed = res.data
            console.log('parsed', parsed)
            disp.render(parsed, {
                color: '#000',
                width: 800,
            });
            self.extractKeywordsAndFindResults(parsed)
        })
    }

    componentDidMount() {
        const disp = new displacy('http://localhost:8080/dep', {
            container: '#displacy',
            format: 'spacy',
            distance: 300,
            offsetX: 100
        });
        this.setState({ disp })
    }

    render() {
        const { searchResults, searchText } = this.state

        const hasResults = (searchResults && searchResults.length > 0)

        return (
            <div>
                <div className='search-area'>
                    <h1>Construction Best Practices...<br /> at your fingertips</h1>
                    <br />
                    <hr />
                    <div className='search-form centered'>
                        <FormControl
                            className='search-form-field'
                            type="text"
                            value={searchText}
                            placeholder="What are you Building?"
                            onChange={this.handleSearchChange}
                        />

                    </div>
                    <Button
                        onClick={() => this.search()}
                        className='search-button'
                        bsStyle="success"
                        bsSize="large">
                        Search
                    </Button>
                    <a href="/report"><Button
                        className='search-button'
                        bsStyle="info"
                        bsSize="large">
                        Add a new Report
                    </Button></a>


                </div>
                <div className='search-diagram-area centered'>
                    {hasResults && <h2 className="diagram-header">Understanding your Query</h2>}
                    <hr/>
                    <div id="displacy"></div>
                </div>
                <div className='search-result-area'>
                    {hasResults && <div className='search-results'>
                        <h2>Search Results by Relevance:</h2><br/>
                        {searchResults.map((lesson, i) => {
                            return <div key={i}>
                                {/* {lesson.score}: {JSON.stringify(lesson)} */}
                                <LessonCard
                                    title={lesson.title}
                                    score={lesson.score}
                                    projectType={lesson.project_type}
                                    experienceType={lesson.experience_type}
                                    reportLink={lesson.report_link}
                                    description={lesson.description} />
                            </div>
                        })}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Search;