function validateUser(data: string) {
  const userToCheck = JSON.parse(data);

  if (
    userToCheck.hasOwnProperty('username') &&
    userToCheck.hasOwnProperty('age') &&
    userToCheck.hasOwnProperty('hobbies')
  ) {
    return userToCheck;
  }
  return false;
}

export default validateUser;
