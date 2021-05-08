import React, { Component } from 'react'

export default class Banner extends Component {
    render() {
        return (
            <section className='MovieApp-over'>
                <h2 className='MovieApp-over-title'>Great choices!</h2>
                <button onClick={ this.props.reset }>Start Over?</button>
            </section>
        )
    }
}
