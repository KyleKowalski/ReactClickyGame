import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper';
import ClickyCard from './components/ClickyCard';
import clickyTargets from './clickyCards.json';
// import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    clickyTargets
  }

  clickTarget = id => {
    console.log(`Clicked: ${id}`);
    // console.log(this)
    this.state.clickyTargets.forEach((target) => {
      if (target.id === id){
        if (target.clicked) {
          console.log(`GAME OVER!  (previously clicked)`);
          // TODO show game over modal (hight score - etc)
          this.state.clickyTargets.forEach((target) => {
            // reset clicks so game can start again
            target.clicked = false;
          });
          if (this.state.score > this.state.highScore) {
            // record high score (if needed)
            this.setState({highScore: this.state.score});
          }
          // TODO randomize and display a start screen (???)
          // TODO remove alert
          // alert(`Restart Game!  Score: ${this.state.score}  High Score: ${this.state.highScore}`);
          this.setState({score: 0});
          return false;
        }
        else {
          this.setState({score: this.state.score + 1});
          if (this.state.score > this.state.highScore) {
            // record high score (if needed)
            this.setState({highScore: this.state.score});
          }
          // TODO figure out why high score lags by 1 pt
          // continue game and set this target to true
          target.clicked = true;
          // TODO randomize the pictures    
        }
      }
    })
  }

  render() {
    return (
      <Wrapper>
      <Header  score={this.state.score} highScore={this.state.highScore} />
      {/* <Navbar /> */}
      {clickyTargets.map((target) => {
        return <ClickyCard 
                {...target}
                key={target.id}
                clickTarget={this.clickTarget}
                />
      })}
      <Footer />
      </Wrapper>
    )
  }
}

// Shuffle brought to you by:  https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }
  return copy;
}

export default App;
