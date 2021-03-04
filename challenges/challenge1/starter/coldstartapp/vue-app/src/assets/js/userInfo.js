async function getUserInfo() {
  try {
    console.log('getUserInfo');
    if (window.location.host.indexOf('localhost') !== -1) {
      return {
        identityProvider: 'github',
        userId: 'MDQ6VXNlcjEwMDg4Nzk0',
        userDetails: 'fabjooo',
        userRoles: ['authenticated', 'anonymous'],
      };
    }
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    console.log(clientPrincipal);
    return clientPrincipal;
  } catch (error) {
    console.log(JSON.parse(error));
    console.error('No profile could be found');
    return undefined;
  }
}

export { getUserInfo as default };
