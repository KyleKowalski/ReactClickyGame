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
    clickyTargets: clickyTargets
  }

  clickTarget = id => {
    console.log(`Clicked: ${id}`);
    this.state.clickyTargets.forEach((target) => {
      if (target.id === id){
        // Player lost (clicked same thing again)
        if (target.clicked) {
          console.log(`GAME OVER!  (previously clicked)`);
          alert (`Game Over!`);

          // TODO show game over modal (high score - etc)

          this.state.clickyTargets.forEach((target) => {
            // reset clicks so game can start again
            target.clicked = false;
          });

          // TODO randomize and display a start screen (???)
          this.setState({score: 0});
          return false;
        }
        // Player did NOT lose - did we win?
        else if (this.state.score === this.state.clickyTargets.length){
          console.log(`All elements have been clicked - display 'you won!'`);
          // TODO do something for a win and reset the game
          return false;
        }
        // Player did NOT lose and did NOT win - so we continue
        else {
          this.setState({score: this.state.score + 1});
          // continue game and set this target to true
          target.clicked = true;
        }
      }
    });
    this.checkHighScore();
  }

  // Shuffle brought to you by:  https://bost.ocks.org/mike/shuffle/
  // (and slighly modified by me) :)
  shuffleCards = (array) => {
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
    
    // console.log(`New card array:  ${copy}`);
    // copy.forEach((item) => {console.log(item)});
    this.setState({clickyTargets: copy});
  }

  checkHighScore = () => {
    if (this.state.score >= this.state.highScore) {
      console.log(`current score: ${this.state.score} - and high: ${this.state.highScore}`);
      // record high score (if needed)
      this.setState((prevState) => ({
        highScore: prevState.score
      }));
    }
  }

  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highScore={this.state.highScore} />
        {/* <Navbar /> */}
        {clickyTargets.map((target) => {
          return <ClickyCard 
                  {...target}
                  key={target.id}
                  clickTarget={this.clickTarget}
                  shuffleCards={() => {this.shuffleCards(this.state.clickyTargets)}}
                  />
        })}
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
