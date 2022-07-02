function validateUser(data: string) {
  const userToCheck = JSON.parse(data);

  if (
    userToCheck.hasOwnProperty('username') &&
    typeof userToCheck.username === 'string' &&
    userToCheck.hasOwnProperty('age') &&
    typeof userToCheck.age === 'number' &&
    userToCheck.hasOwnProperty('hobbies') &&
    Array.isArray(userToCheck.hobbies)
  ) {
    return userToCheck;
  }
  return false;
}

export default validateUser;
