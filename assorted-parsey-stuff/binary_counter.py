def pprint(l):
  # print(list(map(lambda x: 1 if x else 0, l)))
  print("[{}],".format(", ".join(map(lambda x: 'true' if x else 'false', l))))

def nextAssignment(assignment):
  flipIndex = len(assignment) - 1
  while flipIndex >= 0 and assignment[flipIndex]:
    flipIndex -= 1

  if flipIndex == -1:
    return False

  assignment[flipIndex] = True

  for i in range(flipIndex + 1, len(assignment)):
    assignment[i] = False

  return True

a = [False] * 4
pprint(a)
while nextAssignment(a):
  pprint(a)
