import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import TopRated from './components/TopRated';
import Upcoming from './components/Upcoming';
import MovieInformation from "./components/MovieInformation"
const App=()=>(
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/top-rated" component={TopRated}/>
      <Route exact path="/upcoming" component={Upcoming}/>
      <Route exact path="/movies/:id" component={MovieInformation}/>
    </Switch>
  </Router>
)

export default App