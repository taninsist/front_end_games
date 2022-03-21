import React from 'react';
import { Game } from './components/GameComp';


export class App extends React.Component {
  render() {

    return (
      <div className='app'>
        <Game />
      </div>
    )
  }
}