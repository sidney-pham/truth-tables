class Parser:
  """
  Parse the following context-free grammar.
  <s> ::= "a" <s> "b"
  <s> ::= "e"
  """
  def __init__(self, tokens):
    self._tokens = tokens
    self._length = len(tokens)
    self._upto = 0

  def end(self):
    return self._upto == self._length

  def peek(self):
    return None if self.end() else self._tokens[self._upto]

  def next(self):
    if not self.end():
      self._upto += 1

  def _parse(self):
    if self.peek() == 'a':
      self.next()
      ret = self._parse()
      if not ret:
        return False
      if self.peek() != 'b':
        return False
      self.next()
    elif self.peek() == 'e':
      self.next()
    else:
      return False
    return True

  def parse(self):
    return self._parse() and self.end()