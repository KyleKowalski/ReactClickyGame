import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper';
import ClickyCard from './components/ClickyCard';
import clickyTargets from './clickyCards.json';
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <Wrapper>
  <Header />
  {/* <Navbar /> */}
  {clickyTargets.map((target) => {
    return <ClickyCard 
            {...target}
            key={target.id}
            />
  })}
  <Footer />
  </Wrapper>
);



// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
