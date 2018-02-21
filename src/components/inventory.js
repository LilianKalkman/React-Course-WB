import React, { Component } from 'react';
import AddFishForm from './add_fish_form';
import base from '../base';

class Inventory extends Component {
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = ({
      uid: null,
      owner: null
    })
  }

  componentDidMount(){
    base.onAuth((user)=> {
      if(user){
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key){
    const fish = this.props.fishes[key];

    const updatedFish = {...fish,
    [e.target.name]: e.target.value};

    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key){
    const fish = this.props.fishes[key]
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name"
          onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" name="price" value={fish.price} placeholder="Fish Price"
          onChange={(e) => this.handleChange(e, key)}/>
        <select type="text" name="status" value={fish.status} placeholder="Fish Status"
          onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc"
          onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image"
          onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  authenticate(provider){
    console.log(provider);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData){
    console.log(authData);
    if(err){
      console.error(err);
      return;
    }
    // gedeelde dat je uit je database wilt pakken
    const storeRef = base.database().ref(this.props.storeId);

    // show the firebase storedata once (snapshot is firebases name of all the data)
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      // zet owner to user als er nog geen owner van de data is
      if(!data.owner){
        storeRef.set({
          owner: authData.user.uid
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  logout(){
    base.unauth();
    this.setState({uid: null});
  }

  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="facebook" onClick={()=> this.authenticate('facebook')}>Sign in with Facebook</button>
        <button className="twitter">Sign in with email</button>
      </nav>
    )
  }

  render() {
    const logout = <button onClick={()=>this.logout()}>Log out</button>

    if(!this.state.uid){
      return(<div>{this.renderLogin()}</div>)
    }

    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h3>Inventory</h3>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadFishes: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;
