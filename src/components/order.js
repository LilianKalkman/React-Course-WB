import React, { Component } from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends Component {
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key){
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeOrder(key)}>&times;</button>;

    if(!fish || fish.status === 'unavailable'){
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available
      {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
            </CSSTransitionGroup>
          lbs {fish.name}  {removeButton}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      // geeft details/values van je fish op basis van de key
      const count = this.props.order[key];
      // geeft de value/dus count van je order op basis van de key
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    },0);

    return(
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

Order.propTypes = {
  removeOrder: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
}

export default Order;
