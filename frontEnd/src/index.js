import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import reducers  from './reducers';
import App from './containers/App';
import newContractorForm from './containers/App/newContractorForm';
import newEquipmentForm from './containers/App/newEquipmentForm';
import newGuestForm from './containers/App/newGuestForm';
import newMenuForm from './containers/App/newMenuForm';
import newTaskForm from './containers/App/newTaskForm';
import signinForm from './containers/App/signinForm';
import loginForm from './containers/App/loginForm';
import inviteForm from './containers/App/inviteForm';
import eventForm from './containers/App/eventForm';
import guestProfile from './containers/App/guestProfile';
import budgetForm from './containers/App/budgetForm';
import contractorProfile from './containers/App/contractorProfile';
import taskProfile from './containers/App/taskProfile';


import './index.css';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/newContractorForm" component={newContractorForm} />
        <Route path="/newEquipmentForm" component={newEquipmentForm} />
        <Route path="/newGuestForm" component={newGuestForm} />
        <Route path="/newMenuForm" component={newMenuForm} />
        <Route path="/newTaskForm" component={newTaskForm} />
        <Route path="/signinForm" component={signinForm} />
        <Route path="/loginForm" component={loginForm} />
        <Route path="/inviteForm" component={inviteForm} />
        <Route path="/eventForm" component={eventForm} />
        <Route path="/guestProfile" component={guestProfile} />
        <Route path="/budgetForm" component={budgetForm} />
        <Route path="/contractorProfile" component={contractorProfile} />
        <Route path="/taskProfile" component={taskProfile} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);