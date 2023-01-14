import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Pg from "./components/Pg";
import Signup from "./components/Signup"
import Login from "./components/Login"
import React from 'react';

function App() {
  
return (
<Router>

<Routes>
  <Route exact path="/" element={<List />}/>
  {/*<Route path="/form"><Form /></Route>*/}
  <Route path="/personaggio/:nome" element={<Pg />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>

</Router>
)

}

export default App;
