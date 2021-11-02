import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from './components' 
import { Animals, Enclosures, Home } from './pages'
import './App.css';

const App = (props) => {
  return (
    <div className="App">
        <div style={{ marginTop: '150px'}}>
          <Router>
            <Navbar/>
            <div style={{ padding: '0px 60px 0px 60px' }}>
              <Switch>
                <Route path='/enclosures' exact component={Enclosures}/>
                <Route path='/animals' exact component={Animals}/>
                <Route path='/' component={Home}/>
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );
}

export default App;
