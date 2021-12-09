import React, { Component } from "react";
import Box from "./Components/Box";
import "./App.css";

let numbers = ["один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять"];

class App extends Component {
  constructor(props) {
    super(props);
    this.history = [];
    this.state = {
      bestScore: 0,
      answer: numbers[0],
      score: 0,
      box:
      {
        id: "box",
        color: `rgb(${this.getRandomColor()}, ${this.getRandomColor()}, ${this.getRandomColor()})`
      }
    };
    this.clickHandler = this.clickHandler.bind(this);
  };

  getRandomColor() {
    const singleColor = Math.floor(Math.random()*256);
    return singleColor;
  };

  clickHandler(event) {
    const box = { id: "box",  color: `rgb(${this.getRandomColor()}, ${this.getRandomColor()}, ${this.getRandomColor()})` }
    let score = this.state.score;
    let bestScore = this.state.bestScore;
    let seen = this.history.includes(this.state.answer);
    if ((seen && event.target.id === "yes") || (!seen && event.target.id === "no")) {
     score++;
     if (score === 10) {
       this.history = [];
       bestScore = bestScore < score ? score : bestScore;
       score = 0;
       let win = document.querySelector(".congratulations");
       win.classList.remove("hidden");
     }
    } else {
      bestScore = bestScore < score ? score : bestScore;
      score = 0
     this.history = []}
    this.history.push(this.state.answer);
    this.setState( {score, bestScore, box, answer: numbers[Math.floor(Math.random() * numbers.length)] })
  }

  render() {
    return (
      <main
      className="app"  
      style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <header className="app-header">
        <h1>React: Memory Game Project</h1>
        <p id="p-1">Objective: Answer questions to test your memory.</p>
        <p id="p-2">Highest score is 10!</p>
        <div className="app-scoreboard">
        <span>Score: {this.state.score}</span>
        <span>High Score: {this.state.bestScore}</span>
        </div>
        </header>
        <section className="app-container">
          <div className="congratulations hidden">
            <h3>Congratulations! Your memory is impeccable.</h3>
          </div>
          <div className="app-wrapper">
            <div className="app-square">
              <p className="app-number">{this.state.answer}</p>
              <Box 
              color={this.state.box.color}
              />
            </div>
          <div>
            <h3>Have you seen this number yet?</h3>
            <button id="no" className="btn" onClick={this.clickHandler}>No</button>
            <button id="yes" className="btn" onClick={this.clickHandler}>Yes</button>
          </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
