import "./App.css";
import Footer from "./MyComponent/Footer";
import TransectionList from "./MyComponent/TransectionList";
import AddTransection from "./MyComponent/AddTransection";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function App() {
  let styles = {
    marginRight: "1615px",
  };
  return (
    <div>
      <Router>
        <Link
          to="/"
          style={styles}
          className="btn btn-outline-success"
        >
           Transection List
        </Link>
        <Link to="/add-transection" className="btn btn-outline-success">
        Add Transection
        </Link>

        <Routes>
          <Route path="/add-transection" element={<AddTransection />}></Route>
          <Route exact path="/" element={<TransectionList />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
export default App;
