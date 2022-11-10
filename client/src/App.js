import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home.jsx';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path= '/' component={LandingPage}/>
    <Route path='/home' compornent ={Home}/>  
    </Switch>      
    </div>
    </BrowserRouter>
  );
}

export default App;
