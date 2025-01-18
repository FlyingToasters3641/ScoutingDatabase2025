import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigationbar from "./components/Navigationbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Test from "./components/Test.js";
import Eventdetail from "./components/Eventdetail.js";


const App = () => {
  return (
    <div className="App">
        <Router>
            <Navigationbar />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/test' component={Test}/>
                <Route path='/eventdetail' component={Eventdetail}/>
            </Switch>
        </Router>
    </div>
      );
  };

export default App