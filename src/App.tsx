import React from 'react';
import {BrowserRouter , Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

//list component
import {Kanban} from './components/index';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} component={Kanban} path='/kanban'/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
export default App;
