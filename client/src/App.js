import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.css';
import { AppProvider } from "./views/common/AppContext.js";
import Navigationbar from "./views/common/Navigationbar.js";
import Home from "./views/Home/Home.js";
import About from "./views/About/About.js";
import Test from "./views/Test/Test.js";
import Eventdetail from "./views/Events/Eventdetail.js";
import Team from "./views/Events/Team.js";
import Eventimport from "./views/Events/Eventimport.js";
import Dataimport from "./views/Matches/Dataimport.js";
import Matchdetails from "./views/Matches/Matchdetails.js";
import Settings from "./views/Settings/Settings.js";
import Eventdata from "./views/Events/Eventdata.js";
import Robotsummary from "./views/Matches/Robotsummary.js";


const App = () => {
  return (
    <div className="App">
      <AppProvider>
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
                <Route path='/settings' component={Settings}/>
                <Route path='/eventdata' component={Eventdata}/>
                <Route path='/robotsummary' component={Robotsummary}/>
            </Switch>
        </Router>
      </AppProvider>
    </div>
      );
  };

export default App