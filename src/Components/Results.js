import React, { Component } from 'react'
import '../CSS/Results.css'

export default class Results extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(evt) {
        this.props.nominate(this.props.movie)
    }
    
    render() {
        return (
            <div className='Results-movie' key={ this.props.movie.imdbID }>
                <div className='Results-image'>
                    <img src={ this.props.movie.Poster } alt={ this.props.movie.title }></img>
                </div>
                <div className='Results-info'>
                    <h2 className='Results-title'>{ this.props.movie.Title }</h2>
                    <h5>Year: { this.props.movie.Year } </h5><h5>Rated: { this.props.movie.Rated }</h5>
                    <p>{ this.props.movie.Plot }</p>
                    { this.props.nominated ? <button className='Results-button nominated' disabled>Nominated!</button> : <button onClick={ this.handleClick }>Nominate!</button> }
                </div>
            </div>
        )
    }
}
