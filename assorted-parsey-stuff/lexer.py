def lex(formula):
  out = []
  token = ''

  for char in formula:
    if char == ' ':
      if token != '':
        out.append(token)
        token = ''
    elif char == '(' or char == ')':
      if token != '':
        out.append(token)
        token = ''
      out.append(char)
    else:
      token += char
  if token != '':
    out.append(token)

  return out

