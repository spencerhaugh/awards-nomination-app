import React, { Component } from 'react'
import '../CSS/Nominations.css'

export default class Nominations extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(evt) {
        this.props.unNominate(this.props.movie.imdbID)
    }
    render() {
    return (
        <div className='Nominations-movie' key={ this.props.movie.imdbID }>
            <div className='Nominations-image'>
                <img src={ this.props.movie.Poster } alt={ this.props.movie.title }></img>
            </div>
            <div className='Nominations-info'>
            <h3>{ this.props.movie.Title }</h3>
                <button onClick={ this.handleClick }>Un-nominate</button>
            </div>
        </div>
    )
    }
}
