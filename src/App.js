import React from 'react';
import './App.scss';
import MainChartComponent from './MainChartComponent'
import HeadingComponent from './HeadingComponent'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <HeadingComponent />
      <MainChartComponent />
    </div>
  );
}

export default App;
