import React from 'react';
import Index from "./views/Index"
import LeetCode from "./views/LeetCode/index"
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <HashRouter>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            <Route exact path="/leetcode/:scret" component={LeetCode}></Route>
            {/* <Route component={noMatch}/>  */}
          </Switch>
      </HashRouter>
  );
}

export default App;