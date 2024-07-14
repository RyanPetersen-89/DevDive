function logout() {
  fetch('/api/users/logout', {
      method: 'POST'
  })
  .then(response => {
      if (response.ok) {
          window.location.href = '/';
      }
  })
  .catch(error => console.error('Error:', error));
}