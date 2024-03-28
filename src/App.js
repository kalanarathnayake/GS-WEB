import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PeopleList from './components/People/people-list.component';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<PeopleList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;