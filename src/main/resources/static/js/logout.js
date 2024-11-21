document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutB');

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    function logout() {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
});
