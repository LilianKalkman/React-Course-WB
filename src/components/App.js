import React, { Component } from 'react';
import Header from './header';
import Order from './order';
import Inventory from './inventory';
import SampleFishes from '../sample-fishes';
import FishList from './list-fishes';
import base from '../base';

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
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updatedFish = this.updatedFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
  }

  componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });
    // achter syncstate zet je de plek waar je je state naar wilt syncen, is soort path in je firebase
    // en in het object (tweede argument) zet je wAt je daar naar toe wilt sycnen.

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef){
      this.setState(
        {
          order: JSON.parse(localStorageRef)
        }
      );
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order));
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

  removeFromOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  updatedFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes: fishes});
  }

  removeFish(fish){
    const fishes = {...this.state.fishes}
    fishes[fish] = null
    this.setState({ fishes});
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
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeOrder={this.removeFromOrder}/>
        <Inventory
          addFish={this.addFish}
          loadFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updatedFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}/>
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
