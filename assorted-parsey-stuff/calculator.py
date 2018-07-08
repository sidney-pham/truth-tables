import re

class Parser:
  RE_NUMBER = re.compile(r'-?[0-9]+')

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

  def _parse_e3(self):
    """
    <e3> ::= "-"? ( "0" | "1" | ... | "9" )+
    <e3> ::= "(" <e1> ")"
    """
    if self.peek() == '(':
      self.next()
      node = self._parse_e1()
      if self.peek() != ')':
        raise Exception('Missing closing parenthesis.')
      self.next()
    elif re.match(Parser.RE_NUMBER, self.peek()):
      node = LiteralNode(int(self.peek()))
      self.next()
    return node

  def _parse_e2(self):
    """
    <e2> ::= <e3> ( "*" <e2> )?
    """
    node = self._parse_e3()
    if self.peek() == '*':
      self.next()
      node2 = self._parse_e2()
      node = MultNode(node, node2)
    return node

  def _parse_e1(self):
    """
    <e1> ::= <e2> ( "+" <e1> )?
    """
    node = self._parse_e2()
    if self.peek() == '+':
      self.next()
      node2 = self._parse_e1()
      node = AddNode(node, node2)
    return node

  def parse(self):
    node = self._parse_e1()
    if not self.end():
      raise Exception('Extra content at end of input.')
    return node

class Node:
  def __init__(self, left, right):
    self.left = left
    self.right = right

  def eval(self):
    raise NotImplementedError()

class AddNode(Node):
  def eval(self):
    return self.left.eval() + self.right.eval()

class MultNode(Node):
  def eval(self):
    return self.left.eval() * self.right.eval()

class LiteralNode(Node):
  def __init__(self, value):
    super().__init__(None, None)
    self.value = value
  
  def eval(self):
    return self.value