import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import List from "./components/List";
import Pg from "./components/Pg";
import React from 'react';

function App() {

return (
<Router>

<Routes>
  <Route exact path="/" element={<List />}/>
  {/*<Route path="/form"><Form /></Route>*/}
  <Route path="/personaggio/:nome" element={<Pg />} />
</Routes>

</Router>
)

}

export default App;
