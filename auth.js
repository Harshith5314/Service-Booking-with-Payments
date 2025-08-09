const USER_KEY = 'service_users';
function getUsers() { return JSON.parse(localStorage.getItem(USER_KEY)) || []; }
function saveUsers(users) { localStorage.setItem(USER_KEY, JSON.stringify(users)); }

document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.querySelector('.auth-form');
  const regForm = document.querySelector('.reg-form');

  if(authForm) {
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      const role = authForm.dataset.role;
      const email = authForm.email.value.trim();
      const pwd = authForm.password.value;
      const user = getUsers().find(u => u.email === email && u.role === role);
      if(user && user.password === pwd) {
        window.location.href = role === 'seeker' ? 'seeker-dashboard.html' : 'provider-dashboard.html';
      } else {
        alert('Invalid credentials!');
      }
    });
  }

  if(regForm) {
    regForm.addEventListener('submit', e => {
      e.preventDefault();
      const role = regForm.dataset.role;
      const email = regForm.email.value.trim();
      const users = getUsers();
      if(users.find(u => u.email === email && u.role === role)) {
        alert('Account already exists!');
        return;
      }
      users.push({
        name: regForm.name.value.trim(),
        email: email,
        password: regForm.password.value,
        mobile: regForm.mobile.value.trim(),
        role: role
      });
      saveUsers(users);
      alert('Registration successful! Please login.');
      window.location.href = role === 'seeker' ? 'login-seeker.html' : 'login-provider.html';
    });
  }
});
