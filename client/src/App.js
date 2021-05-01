import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { Container } from "react-bootstrap";
function App() {
  return (
    <Router>
      <Header></Header>
      <main>
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen}></Route>
          </Switch>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
