import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import ClickyCard from './components/ClickyCard';
import clickyTargets from './clickyCards.json';
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    clickyTargets: clickyTargets
  }

  clickTarget = id => {
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
          this.setState({score: 0});
          return false;
        }
        // Player did NOT lose - did we win?
        // TODO this doesn't work as we're getting a dated score - thow this to another layer
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
        if (this.state.score >= this.state.highScore) {
          this.updateHighScore(); 
        }
      }
    });
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
    this.setState({clickyTargets: copy});
  }

  updateHighScore = () => {
    this.setState((prevState) => ({
      highScore: prevState.score
    }));
  }

  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highScore={this.state.highScore} />
        {this.state.clickyTargets.map((target) => {
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