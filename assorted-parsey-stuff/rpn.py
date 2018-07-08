def parse(rpn_input):
  """
  Take a string in RPN and output the result.
  Support standard operators.
  Operands must be integers.
  Result may be a float.
  """
  symbols = rpn_input.strip().split()
  stack = []
  for symbol in symbols:
    if is_number(symbol):
      stack.append(int(symbol))
    else: # An operand.
      if len(stack) < 2:
        raise Exception("Invalid input.")
      second_operand = stack.pop()
      first_operand = stack.pop()
      stack.append(calculate(symbol, first_operand, second_operand))
    print(stack)
  if len(stack) != 1:
    raise Exception("Invalid input.")
  return stack.pop()

def calculate(operator, operand1, operand2):
  if operator == "+":
    result = operand1 + operand2
  elif operator == "-":
    result = operand1 - operand2
  elif operator == "*":
    result = operand1 * operand2
  elif operator == "/":
    result = operand1 / operand2
  elif operator == "//":
    result = operand1 // operand2
  elif operator == "%":
    result = operand1 % operand2
  elif operator == "**" or operator == "^":
    result = operand1 ** operand2
  else:
    raise Exception("Invalid operator " + operator)
  return result

def is_number(symbol):
  try:
    int(symbol)
    return True
  except ValueError:
    return False
