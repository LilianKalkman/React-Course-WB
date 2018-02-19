import React, { Component } from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';

class App extends Component {
  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {},
    };

    this.addFish = this.addFish.bind(this);
  }

  addFish(fish){
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    this.setState({fishes: fishes});
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
    );
  }
}

export default App;
