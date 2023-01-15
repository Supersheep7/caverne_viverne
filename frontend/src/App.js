import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Pg from "./components/Pg";
import Signup from "./components/Signup"
import React from 'react';
import Loginform from "./components/login-form"

function App() {
  
return (
<Router>

<Routes>
  <Route exact path="/" element={<List />}/>
  <Route path="/personaggio/:nome" element={<Pg />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Loginform  />} />
</Routes>

</Router>
)

}

export default App;
