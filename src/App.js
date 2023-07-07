import CreateUserForm from "./component/CreateUserForm";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayUser from "./component/DisplayUser";
import UpdateUserForm from "./component/UpdateUserForm";
import Header from "./component/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CreateUserForm />}></Route>
          <Route path="/getuser" element={<DisplayUser />}></Route>
          <Route path="/updateuser/:id" element={<UpdateUserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
