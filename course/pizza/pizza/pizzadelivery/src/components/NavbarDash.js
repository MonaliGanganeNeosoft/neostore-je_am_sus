import React from 'react'
import Dashboard from './Dashboard'
import Cart from './Cart'
import { connect } from "react-redux";
import {  Route, Switch, Link,useHistory } from "react-router-dom";
import Orderdata from './Orderdata';
import Register from './Register';
import Login from './Login';
import {Button} from 'react-bootstrap'
import FrontPage from './Frontpage';

function NavbarDash(props) {
  let History=useHistory();
const logout=(e)=>{
  e.preventDefault();
  localStorage.clear();
  History.push("/")

}
    return (
        <div>
             
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PizzaCafe</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" ><Link to="/Dash" class="nav-link">Home</Link></a>
        <a class="nav-link"> <Link to="/Dash/cart" class="nav-link">Cart {props.mycounter}</Link></a>
        <a class="nav-link"> <Link to="/orders" class="nav-link">Orders</Link></a>
        <a class="nav-link" ><Link to="/" class="nav-link">Login</Link></a>
      </div>
      <Button href="/logout" variant="outline-light" className="justify-content-end">Logout</Button>
    </div>
  </div>
</nav>
        {/* <Dashboard/> */}
        <Switch>
        <Route path="/Dash" exact component={Dashboard} />
        <Route path="/Dash/cart" exact component={Cart} />
        <Route path="/orders" exact component={Orderdata} />
        <Route path="/Register" exact component={Register} />
        <Route path="/" exact component={FrontPage} />
        <Route path="/SignIn" exact component={Login} />
        <Route path="/logout" exact component={FrontPage} />
      </Switch>
        </div>
    )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};
export default connect(mapStateToProps)(NavbarDash);
