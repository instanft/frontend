import './App.css';
import Landing from './Landing';
import Mint from './Mint';
import Gallery from './Gallery';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route path="/mint" component={Mint}/>
      <Route path="/gallery" component={Gallery}/>
      {/* <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/connect" component={Connect}/> */}
    </Switch>
  );
}

export default App;
