import React from 'react';
import styles from './style.css';

class HelpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolledDown: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.modal = React.createRef();
  }

  componentDidMount() {
    this.modal.current.addEventListener('scroll', this.handleScroll);
    document.body.addEventListener('keypress', this.handleEscape);
  }

  componentWillUnmount() {
    this.modal.current.removeEventListener('scroll', this.handleScroll);
    document.body.removeEventListener('keypress', this.handleEscape);
  }

  handleScroll(event) {
    const { scrollTop } = event.target;
    const scrolledDown = scrollTop > 0;
    this.setState({ scrolledDown });
  }

  handleEscape(event) {
    const { toggleOpen } = this.props;
    const { open } = this.props;
    if (open && event.key === 'Escape') {
      toggleOpen(event);
    }
  }

  render() {
    const { open, toggleOpen, fillInput, testFormula } = this.props;
    const { scrolledDown } = this.state;

    return (
      <div className={`${styles.modal} ${open ? styles.open : styles.closed}`} onClick={toggleOpen}>
        <div ref={this.modal} className={styles.content} onClick={e => {
          e.stopPropagation();
        }}>
          <div className={`${styles.topBar} ${scrolledDown ? styles.shadow : ''}`}>
            <h1 className={styles.header}>Help</h1>
            <button type="button" onClick={toggleOpen} className={styles.closeButton}><i className="far fa-window-close"></i></button>
          </div>
          <div className={styles.modalContent}>
            <div>This is a truth table generator for classical propositional logic. It accepts operators in the forms below. Propositional variables are space delimited.</div>
            <h3>What is a propositional formula?</h3>
            <p>A propositional formula is built up from propositions by using logical operators (also called logical connectives). A proposition is a statement that has an unambiguous truth value. For example, a propositional formula can be used to express the idea that 'pigs can fly <em>and</em> ducks quack'. By using propositional variables, this can be represented by a formula like <span className="formula">p and q</span>.</p>
            <h3>Supported operators</h3>
            <table className={styles.operatorTable}>
              <tbody>
                <tr>
                  <th>Conjunction</th>
                  <td>
                    <span className="formula">∧</span>
                    , <span className="formula">⋅</span>
                    , <span className="formula">&</span>
                    , <span className="formula">&&</span>
                    , <span className="formula">^</span>
                    , <span className="formula">/\</span>
                    , <span className="formula">and</span>
                    , <span className="formula">conjunction</span>
                  </td>
                </tr>
                <tr>
                  <th>Disjunction</th>
                  <td>
                    <span className="formula">∨</span>
                    , <span className="formula">+</span>
                    , <span className="formula">|</span>
                    , <span className="formula">||</span>
                    , <span className="formula">\/</span>
                    , <span className="formula">or</span>
                    , <span className="formula">disjunction</span>
                  </td>
                </tr>
                <tr>
                  <th>Exclusive Or</th>
                  <td>
                    <span className="formula">⊕</span>
                    , <span className="formula">⊻</span>
                    , <span className="formula">⩒</span>
                    , <span className="formula">⩛</span>
                    , <span className="formula">↮</span>
                    , <span className="formula">≢</span>
                    , <span className="formula">xor</span>
                    , <span className="formula">eor</span>
                    , <span className="formula">exor</span>
                    , <span className="formula">exclusiveor</span>
                    , <span className="formula">exclusive-or</span>
                  </td>
                </tr>
                <tr>
                  <th>Material Implication</th>
                  <td>
                    <span className="formula">→</span>
                    , <span className="formula">⇒</span>
                    , <span className="formula">-></span>
                    , <span className="formula">=></span>
                    , <span className="formula">implies</span>
                    , <span className="formula">then</span>
                  </td>
                </tr>
                <tr>
                  <th>Negation</th>
                  <td>
                    <span className="formula">¬</span>
                    , <span className="formula">~</span>
                    , <span className="formula">!</span>
                    , <span className="formula">not</span>
                    , <span className="formula">negation</span>
                  </td>
                </tr>
                <tr>
                  <th>Converse Implication</th>
                  <td>
                    <span className="formula">←</span>
                    , <span className="formula">⇐</span>
                    , <span className="formula">&lt;-</span>
                    , <span className="formula">&lt;=</span>
                    , <span className="formula">onlyif</span>
                    , <span className="formula">only-if</span>
                  </td>
                </tr>
                <tr>
                  <th>Biconditional</th>
                  <td>
                    <span className="formula">↔</span>
                    , <span className="formula">⇔</span>
                    , <span className="formula">&lt;-></span>
                    , <span className="formula">&lt;=></span>
                    , <span className="formula">iff</span>
                    , <span className="formula">if-and-only-if</span>
                    , <span className="formula">ifandonlyif</span>
                    , <span className="formula">biconditional</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Operator Precedence</h3>
            <p>A well-formed propositional formula can contain many parentheses. If operator precedence rules are assumed, parentheses can often be omitted, simplifying propositional formulas.</p>
            <p>For this generator, the operator precedence (from highest to lowest precedence) is:</p>
            <ol>
              <li>Negation</li>
              <li>Conjunction</li>
              <li>Disjunction and Exclusive Or</li>
              <li>Material Implication and Only If</li>
              <li>Biconditional</li>
            </ol>
            <p>Ties are broken by order, with operators further to the right having higher precedence.</p>
            <h3>More features?</h3>
            <p><a href="https://github.com/sidney-pham/truth-tables">Make a pull request</a>! Or <a href="https://github.com/sidney-pham/truth-tables/issues">create an issue</a> on GitHub.</p>
            <h3>Try it out!</h3>
            <span className="formula try" onClick={fillInput}>{testFormula}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpModal;
