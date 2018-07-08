// This saddens me too.
Array.prototype.peek = function() {
  return this[this.length - 1];
};

Array.prototype.empty = function() {
  return this.length == 0;
}

// The operators to support. The eval method modifies a provided stack with the
// required result.
// TODO: Provide support for symbols like '~' and '->'.
const OPERATORS = {
  and: {
    precedence: 3,
    eval: stack => {
      const right = stack.pop();
      const left = stack.pop();
      const res = left && right;
      stack.push(res);
    }
  },
  or: {
    precedence: 2,
    eval: stack => {
      const right = stack.pop();
      const left = stack.pop();
      const res = left || right;
      stack.push(res);
    }
  },
  xor: {
    precedence: 2, // I actually don't know what this should be.
    eval: stack => {
      const right = stack.pop();
      const left = stack.pop();
      const res = left !== right;
      stack.push(res);
    }
  },
  implies: {
    precedence: 1,
    eval: stack => {
      const right = stack.pop();
      const left = stack.pop();
      const res = !left || right;
      stack.push(res);
    }
  },
  not: {
    precedence: 4,
    eval: stack => {
      const operand = stack.pop();
      const res = !operand;
      stack.push(res);
    }
  }
};

// Convert tokens from the lexer in infix notation into Reverse Polish Notation
// using the shunting-yard algorithm.
function parse(input) {
  // TODO: Associativity? Do I need this?
  const stack = [];
  const queue = [];
  for (const token of input) {
    const isVariable = !isOperator(token) && !isParen(token);
    if (isVariable) {
      queue.push(token);
    } else if (isOperator(token)) {
      // Only push to stack if the top of the stack is of lower precedence.
      // If this is not the case, pop items off the stack onto the queue as necessary.
      // If the top of the stack is '(', we can push on top of it no matter what.
      while (!(stack.empty() || stack.peek() === '(')
            && getPrecedence(stack.peek()) > getPrecedence(token)) {
        queue.push(stack.pop());
      }
      stack.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      // Pop operators off the stack until the matching '(' is found, and discard it.
      while (stack.peek() !== '(') {
        queue.push(stack.pop());

        // If there isn't a matching '(', parentheses are mismatched.
        if (stack.peek() === undefined) {
          throw new Error('Mismatched ")".');
        }
      }
      // Discard matching '('.
      stack.pop();
    }
  }
  // Once at the end of the formula, empty the stack onto the queue.
  while (!stack.empty()) {
    // There shouldn't be any '('s on the stack now.
    if (stack.peek() === '(') {
      throw new Error('Mismatched "(".');
    }
    queue.push(stack.pop());
  }

  return queue;
}

// Convert propositional formula into a bunch of tokens.
// This is basically splitting the string and taking into account parentheses.
function lex(input) {
  // Make everything lowercase because we're not pretentious.
  input = input.toLowerCase();

  const stack = [];
  let token = '';
  for (const char of input) {
    if (isParen(char)) {
      if (token !== '') {
        stack.push(token);
        token = '';
      }
      stack.push(char);
    } else if (char === ' ') {
      if (token !== '') {
        stack.push(token);
        token = '';
      }
    } else {
      token += char;
    }
  }
  if (token !== '') {
    stack.push(token);
  }

  return stack;
}

// Return an array of all unique variables given the RPN form.
function getVariables(parsedInput) {
  const variables = [];
  // A variable is a token that isn't an operator and isn't already a variable.
  for (const token of parsedInput) {
    if (!isOperator(token) && !variables.includes(token)) {
      variables.push(token);
    }
  }
  return variables.sort();
}

// A truth assignment is a permutation of truth-values for each variable.
// Return an array of all possible truth assignments.
// The nice recursive version is thanks to @quadrupleslap.
function getTruthAssignments(variables) {
  const truthAssignments = [];
  if (variables.length !== 0) {
    const f = (truths, done) => {
      if (done === variables.length) {
        return truthAssignments.push(Object.assign({}, truths));
      }

      truths[variables[done]] = true;
      f(truths, done + 1);
      truths[variables[done]] = false;
      return f(truths, done + 1);
    };
    f({}, 0);
  }
  return truthAssignments;
}

// Evaluate the last column of a row in the truth table. That is,
// given a propositional formula and the truth values of the variables,
// evaluate the result of the formula.
// Takes in the formula in RPN.
function evaluate(formula, truthValues) {
  const stack = [];
  // Go along the formula, when an operator is found, pop the required number of
  // operands off the stack, then push the result of the operation onto the stack.
  for (const token of formula) {
    if (isOperator(token)) {
      OPERATORS[token].eval(stack);
    } else {
      stack.push(truthValues[token]);
    }
  }

  // The result is the last remaining element in the stack.
  return stack.pop();
}

function isOperator(token) {
  return OPERATORS.hasOwnProperty(token);
}

function isParen(token) {
  return token === '(' || token === ')';
}

function getPrecedence(operator) {
  return OPERATORS[operator].precedence;
}

export {
  parse,
  lex,
  getVariables,
  getTruthAssignments,
  evaluate
};
