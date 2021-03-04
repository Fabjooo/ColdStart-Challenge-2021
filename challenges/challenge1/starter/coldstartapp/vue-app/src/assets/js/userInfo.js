async function getUserInfo() {
  try {
    console.log('getUserInfo');
    if (window.location.host.indexOf('localhost') !== -1) {
      return {
        identityProvider: 'github',
        userId: 'e7c304a728484caab48cec3e11fc4323',
        userDetails: 'fabjooo',
        userRoles: ['authenticated', 'anonymous', 'contributer'],
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
