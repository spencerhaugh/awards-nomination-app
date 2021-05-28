import React, { Component } from 'react'
import '../CSS/MovieApp.css'
import Nominations from './Nominations'
import Results from './Results'
import Seachbar from './Seachbar'
import Banner from './Banner'

export default class MovieApp extends Component {
    static defaultProps = {
        baseURL: 'https://www.omdbapi.com/?t=', // Typically the API Key would live in a dot env file
        apiKey: '&type=movie&apikey=367a6bed',
    }

    constructor(props) {
        super(props);
    
        this.state = {
            query: '',
            nominations: [],
            nominatedIds: [],
            totalNominations: 0,
            nomsComplete: false,
            searchResults: [],
            searchURL: ''
        }
        this.runSearch = this.runSearch.bind(this);
        this.addNomination = this.addNomination.bind(this);
        this.removeNomination = this.removeNomination.bind(this);
        this.checkComplete = this.checkComplete.bind(this);
        this.reset = this.reset.bind(this);
    }

    runSearch(search) {
        if (search.query === '') return
        this.setState({
            query: search.query,
            searchURL: this.props.baseURL + search.query + this.props.apiKey
        }, () => {
            fetch(this.state.searchURL)
            .then(response => {
                return response.json()
            })
            .then(json => {
                if (json.Error) return
                this.setState({ searchResults: [json] })
            })
        })
    };
    checkComplete() {
        if (this.state.totalNominations === 5) {
            this.setState({ nomsComplete: true })
        } else {
            this.setState({ nomsComplete: false })
        }
    };
    addNomination(movie) {
        this.setState(st => ({
            nominations: [ ...st.nominations, movie ],
            nominatedIds: [ ...st.nominatedIds, movie.imdbID],
            totalNominations: st.totalNominations + 1
        }), () => { this.checkComplete() });
        
    };
    removeNomination(id) {
        this.setState(st => ({
            nominations: st.nominations.filter(m => m.imdbID !== id),
            nominatedIds: st.nominatedIds.filter(m => m !== id),
            totalNominations: st.totalNominations - 1
        }), () => { this.checkComplete() });
    };

    reset() {
        this.setState(st => ({
            query: '',
            nominations: [],
            nominatedIds: [],
            totalNominations: 0,
            nomsComplete: false,
            searchResults: [],
            searchURL: ''
        }))
    };

    
    render() {
        let resultList = 
            this.state.searchResults.map(movie => (
                <Results 
                    movie={ movie } 
                    nominate={ this.addNomination } 
                    key={ movie.imdbID } 
                    nominated={ this.state.nominatedIds.includes(movie.imdbID) }/>
            ));
        let nomList = 
            this.state.nominations.map(movie => (
                <Nominations 
                    movie={ movie } 
                    unNominate={ this.removeNomination } 
                    key={ movie.imdbID }/>
            ));
        return (
            <div className='MovieApp'>
                <h1>Make 5 Movie Nominations!</h1>
                { this.state.nomsComplete ? 
                    <Banner reset={ this.reset }/>
                    :
                    <section className='MovieApp-searchArea'>
                    <Seachbar search={ this.runSearch } />
                        { this.state.searchResults ? 
                            <div className='MovieApp-Results-container'>
                            { resultList }
                            </div> 
                            : 
                            '' 
                        }
                    </section> 
                }
                <section className='MovieApp-nomArea'>
                    <h2>Your Nominations:</h2>
                        <div className='MovieApp-Nominations-container'>
                            { nomList }
                        </div>
                </section>
            </div>
        )
    }
}