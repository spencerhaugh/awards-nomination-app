import React, { Component } from 'react'
import '../CSS/Searchbar.css'

export default class Seachbar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            query: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    };
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.search(this.state);
        this.setState({ query: '' })
    }

    render() {
        return (
            <form className='Searchbar' onSubmit={ this.handleSubmit }>
                <label htmlFor='query'>Search for your favorites!</label>
                <input 
                    type='text' 
                    id='query' 
                    name='query' 
                    value = { this.state.query }
                    placeholder='Enter a movie title...'
                    onChange={ this.handleChange }
                >
                </input>
                <button>Submit!</button>
            </form>
        )
    }
}
