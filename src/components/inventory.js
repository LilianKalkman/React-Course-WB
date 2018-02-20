import React, { Component } from 'react';
import AddFishForm from './add_fish_form';

class Inventory extends Component {
  render() {
    return (
      <div>
        <h3>Inventory</h3>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
