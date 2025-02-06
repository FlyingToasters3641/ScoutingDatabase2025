import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigationbar from "./views/common/Navigationbar.js";
import Home from "./views/Home/Home.js";
import About from "./views/About/About.js";
import Test from "./views/Test/Test.js";
import Eventdetail from "./views/Events/Eventdetail.js";
import Team from "./views/Events/Team.js";
import Eventimport from "./views/Events/Eventimport.js";
import Dataimport from "./views/Matches/Dataimport.js";
import Matchdetails from "./views/Matches/Matchdetails.js";
import Admin from "./views/Admin/Adminpg.js";


const App = () => {
  return (
    <div className="App">
        <Router>
            <Navigationbar />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/eventimport' component={Eventimport}/>
                <Route path='/dataimport' component={Dataimport}/>
                <Route path='/test' component={Test}/>
                <Route path='/eventdetail' component={Eventdetail}/>
                <Route path='/team' component={Team}/>
                <Route path='/matchdetails' component={Matchdetails}/>
                <Route path='/admin' component={Admin}/>
            </Switch>
        </Router>
    </div>
      );
  };

export default App