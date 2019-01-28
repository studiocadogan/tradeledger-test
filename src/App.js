import React, { Component } from 'react'
import LookUpContainer from './components/LookUpContainer'
import './scss/App.scss'

class App extends Component {
    render() {
        return (
            <div className="app">
                <LookUpContainer />
            </div>
        )
    }
}

export default App
