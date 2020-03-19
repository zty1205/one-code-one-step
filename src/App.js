import React from 'react';
import Index from "./views/Index"
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <HashRouter>
          <Switch>
            <Route exact path="/" component={Index}></Route>
            {/* <Route component={noMatch}/>  */}
          </Switch>
      </HashRouter>
  );
}

export default App;
