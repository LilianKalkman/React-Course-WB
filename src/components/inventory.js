import React, { Component } from 'react';
import AddFishForm from './add_fish_form';

class Inventory extends Component {
  render() {
    return (
      <div>
        <h3>Inventory</h3>
        <AddFishForm addFish={this.props.addFish}/>
      </div>
    );
  }
}

export default Inventory;
