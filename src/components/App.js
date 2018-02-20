import React, { Component } from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import SampleFishes from '../sample-fishes';
import FishList from './list-fishes';

class App extends Component {
  constructor(){
    super();

    this.state = {
      fishes: {},
      order: {},
    };

    this.addFish = this.addFish.bind(this);
    this.loadSampleFishes = this.loadSampleFishes.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

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

  addToOrder(fish){
    const order = {...this.state.order};
    order[fish] = order[fish] + 1 || 1;
    this.setState({ order: order});
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
            <ul className="list-of-fishes"> {
              Object
              .keys(this.state.fishes)
              .map(fishkey => <FishList key={fishkey} index={fishkey} details={this.state.fishes[fishkey]}
                addToOrder={this.addToOrder}/>)
            }
            </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;
