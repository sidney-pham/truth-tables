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
      const error = e.message;
      return <h4>{error}</h4>;
    }
  }
}

export default TruthTable;
