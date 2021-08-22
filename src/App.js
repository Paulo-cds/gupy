import Index from './pages/initial/Index'
import Questions from './pages/questions/Questions'
import Result from './pages/result/result'
import After from './pages/after/after'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route component={After} path='/after' />

        <Route component={Result} path='/result' />

        <Route component={Questions} path='/questions' />

        <Route component={Index} path='/' />
      </Switch>
    </Router>
  );
}

export default App;
