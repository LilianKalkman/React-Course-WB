import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  goToStore(event){
    event.preventDefault();
    const storeId = this.StoreInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please Enter A Store</h2>
        <input
          type="text" required placeholder="Store Name"
          defaultValue={getFunName()}
          ref={(input) => {this.StoreInput = input}} />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;

// in een reference kan je een ref naar this gewoon direct maken en daarna oproepen
// verder slaat this alleen op de Class in je render method (of je constructor),
// Als het in een method staat moet je het eerst binden aan this als class.

// naast state en props is er een derde manier om data te halen, en dat is:
// context
// context geeft toegang op hoger niveau via react ...
// dus je hebt:
// -> this.state
// -> this.props
// -> this.context
// (+ de namen die je ze toekent + evt. methods)
