import User from '../user';

function findIndex(idToFind: string, userDB: User[]) {
  const index = userDB.findIndex((user) => user.id === idToFind);
  return index;
}

export default findIndex;
