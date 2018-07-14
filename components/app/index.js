import React from 'react';
import styles from './style.css';
import TruthTable from '../truth-table';
import HelpModal from '../help-modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    const sampleFormulas = [
      'p and q implies ~r',
      'p ∧ q → ¬r',
      '~p and q implies r iff (s or q)'
    ];
    const testFormula = sampleFormulas[Math.floor(Math.random() * sampleFormulas.length)];
    this.state = {
      formula: '',
      modalOpen: false,
      testFormula
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fillInput = this.fillInput.bind(this);
    this.inputBox = React.createRef();
  }

  toggleModal() {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  }

  handleChange(event) {
    this.setState({ formula: event.target.value });
  }

  fillInput(event) {
    const formula = event.target.textContent;
    this.setState({ formula, modalOpen: false });
    this.inputBox.current.focus();
  }

  render() {
    const { formula, modalOpen, testFormula } = this.state;
    return (
      <React.Fragment>
        <div className={styles.app}>
          <h1 className={styles.heading}>Truth Table Generator</h1>
          {/* TODO: Fix on mobile widths. */}
          <button type="button" className={styles.helpButton} onClick={this.toggleModal} title="Help"><i className="far fa-question-circle"></i></button>
          <p className={styles.description}>Enter a propositional formula. Try: <span className="formula try" onClick={this.fillInput}>{testFormula}</span>.</p>
          <input
            autoFocus
            ref={this.inputBox}
            type="text"
            placeholder="Enter a formula"
            className={styles.inputBox}
            value={formula}
            onChange={this.handleChange}
          />
          <TruthTable formula={formula} />
        </div>
        <HelpModal open={modalOpen} toggleOpen={this.toggleModal} fillInput={this.fillInput} testFormula={testFormula} />
        <footer className={styles.footer}>
          <a href="https://github.com/sidney-pham/truth-tables">
            <i className="fab fa-github" title="sidney-pham"></i>
          </a>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
