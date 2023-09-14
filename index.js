function handleButtonClick(event) {
    const buttonId = event.target.id;

    if (buttonId === 'admin-button') {
   
        window.location.href = 'admin/login.html';
    } else if (buttonId === 'user-button') {

        window.location.href = 'register.html'; 
    }
}


const adminButton = document.getElementById('admin');
const userButton = document.getElementById('user');

adminButton.addEventListener('click', handleButtonClick);
userButton.addEventListener('click', handleButtonClick);



function navigateTo(route) {
    if (route === 'user.html' || route === 'dashboard.html') {
        if (!isLoggedIn()) {
            alert('You need to log in first.');
            return;
        }
    }
    window.location.href = route;
}