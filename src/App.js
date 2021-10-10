import './App.css';
import Landing from './Landing';
import Mint from './Mint';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/mint" component={Mint}/>
      {/* <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/connect" component={Connect}/> */}
    </Switch>
  );
}

export default App;
