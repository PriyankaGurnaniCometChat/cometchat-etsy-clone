import React, { Component} from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css'
import { Login } from "./view/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./view/Home";
import { Product } from "./view/Product";
import {Chat} from "./view/Chat"
import {Create_Product} from "./view/Create_product"


class App extends Component {
  render() {
    return (
      <React.Fragment>

          <Router>
            <Switch>
              <Route exact path="/login" component={Login}  />
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={Product}  />
              <Route exact path="/chat" component={Chat}  />
              <Route exact path="/create-product" component={Create_Product}  />


            </Switch>
          </Router>

      </React.Fragment>
    );
  }
}


export default App;