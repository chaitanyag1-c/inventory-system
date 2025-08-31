export function getUserDetail(field = null) {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) return null;

    const user = JSON.parse(userString);
    if (!user) return null;

    if (field) {
      return user[field] !== undefined ? user[field] : null;
    }
    return user;
  } catch (error) {
    console.error('Error parsing user data', error);
    return null;
  }
}
