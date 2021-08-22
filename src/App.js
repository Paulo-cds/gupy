import Index from './pages/initial/Index'
import Questions from './pages/questions/Questions'
import Result from './pages/result/result'
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
      <Route component={Result} path='/result' />

        <Route component={Questions} path='/questions' />

        <Route component={Index} path='/' />
      </Switch>
    </Router>
  );
}

export default App;
