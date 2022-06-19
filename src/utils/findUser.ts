import User from '../user';

function findUser(idToFind: string, userDB: User[]) {
  const userFound = userDB.find((user) => user.id === idToFind);

  if (userFound) {
    return userFound;
  }
  return false;
}

export default findUser;
