import React from 'react';
import styles from './style.css';
import {
  parse,
  lex,
  getVariables,
  getTruthAssignments,
  evaluate
} from './helpers';

class TruthTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const TRUE = 'T';
    const FALSE = 'F';
    const { formula } = this.props;
    try {
      const parsedFormula = parse(lex(formula));
      const variables = getVariables(parsedFormula);
      const truthAssignments = getTruthAssignments(variables);
      // Get formula.
      // Lex and then parse the formula to create something like ['p', 'q', 'and'].
      // Get the variables in the formula.
      // Create a column for each variable in the formula.
      // Create the 2^n rows, where n is the number of variables, containing all possible truth value assignments.
      // Create the final column which calculates the result of the formula given a truth assignment.

      return (
        <table className={styles.truthTable}>
          <thead>
            <tr>
              {variables.map(variable => (
                <th key={variable}>{variable}</th>
              ))}
              {variables.length !== 0 && // Only display formula if non-empty.
                <th>{formula}</th>
              }
            </tr>
          </thead>
          <tbody>
            {truthAssignments.map((truthAssignment, index) => (
              <tr key={index}>
                {variables.map(variable => (
                  <td key={variable}>{truthAssignment[variable] ? TRUE : FALSE}</td>
                ))}
                <td>{evaluate(parsedFormula, truthAssignment) ? TRUE : FALSE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (e) {
      const error = e.toString();
      return <h4>Don't be dumb. {error}</h4>;
    }
  }
}

export default TruthTable;
