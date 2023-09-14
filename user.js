

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

   
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', true);
        navigateTo('dashboard.html');
    } else {
        alert('wrong credentials');
    }
}


loginForm.addEventListener('submit', handleLogin);


