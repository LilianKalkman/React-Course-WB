import React, { Component } from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import SampleFishes from '../sample-fishes';

class App extends Component {
  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {},
    };

    this.addFish = this.addFish.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);

  }

  addFish(fish){
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    this.setState({fishes: fishes});
  }

  loadSampleFishes(){
    this.setState({
      fishes: SampleFishes
    });
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;
