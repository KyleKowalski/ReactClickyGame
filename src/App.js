import React, { Component } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import ClickyCard from './components/ClickyCard';
import clickyTargets from './clickyCards.json';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    clickyTargets: clickyTargets,
    isModalOpen: false,
    modalTitle: 'Default Title',
    modalText: 'Default Text',
    modalScoreText: 'Default Score'
  }

  clickTarget = id => {
    this.state.clickyTargets.forEach((target) => {
      if (target.id === id){
        // Player lost (clicked same thing again IE the target is set to clicked=true previously)
        if (target.clicked) {
          console.log(`GAME OVER!  (previously clicked)`);
          // alert (`Game Over!  Score: ${this.state.score} - High Score: ${this.state.highScore}`);
          // TODO show game over modal (high score - etc)
          this.setState({
            modalText: `You've lost and clicked the same card twice!  Click outside the box to play again!`,
            modalTitle: 'Oops, try again!',
            modalScoreText: `Final Score:  ${this.state.score} out of ${this.state.clickyTargets.length}`
          })
          this.openModal();
          this.resetGame();
          return false;
        }
        // Player did NOT lose; win is checked when we update score - so we continue
        else {
          this.updateScore();
          target.clicked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.updateHighScore(); 
        }
      }
    });
  }

  // Shuffle brought to us by:  https://bost.ocks.org/mike/shuffle/
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
    this.setState((newState) => ({
      highScore: newState.score
    }));
  }

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.checkForWin());
  }

  checkForWin = () => {
    if (this.state.score === this.state.clickyTargets.length) {
      this.setState({
        modalText: `You've won!  Click outside the box to play again!`,
        modalTitle: 'Congratulations!',
        modalScoreText: `This is quite the achievement, getting them all correct!`
      })
      this.openModal();
      this.resetGame();
    }
    else {
      setTimeout(() => this.shuffleCards(this.state.clickyTargets),300);
    }
  }

  resetGame = () => {
    console.log(`Game was won or lost - reseting it.`)
    this.state.clickyTargets.forEach((target) => {
      // reset clicks so game can start again
      target.clicked = false;
    });
    this.setState({score: 0});
  }

  // Modal brought to us by:  https://peteris.rocks/blog/modal-window-in-react-from-scratch/
  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false })
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
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <h1>{this.state.modalTitle}</h1>
          <p>{this.state.modalText}</p>
          <p>{this.state.modalScoreText}</p>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </Modal>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;