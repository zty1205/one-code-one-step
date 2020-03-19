import React from 'react';
import Index from "./views/Index"
import Sums from "./views/sums/index"
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <HashRouter>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route exact path="/sums" component={Sums}></Route>
            {/* <Route component={noMatch}/>  */}
          </Switch>
      </HashRouter>
  );
}

export default App;