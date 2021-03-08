import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signuppage from "./components/signuppage";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route path="/signup">
          <Signuppage></Signuppage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
