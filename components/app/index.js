import React from 'react';
import styles from './style.css';
import TruthTable from '../truth-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: ""
      // ¬(p ∧ (r ∨ q))
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ formula: event.target.value });
  }

  render() {
    return (
      <div className={styles.app}>
        <h1>Truth Table Generator</h1>
        <p>Enter a propositional formula.</p>
        <input
          autoFocus
          type="text"
          placeholder="Enter a formula"
          className={styles.inputBox}
          value={this.state.formula}
          onChange={this.handleChange}
        />
        <TruthTable formula={this.state.formula} />
      </div>
    );
  }
}

export default App;