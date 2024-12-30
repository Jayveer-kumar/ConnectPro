// Toggle the mobile navbar when the hamburger menu is clicked
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScrollPosition = currentScrollPosition;
});

function toggleUserInfo(event) {
    // Prevent the click event from bubbling up to the parent div
    event.stopPropagation();
    
    const userInfoPopup = document.getElementById("userInfoPopup");
    if (userInfoPopup.style.display === "block") {
        userInfoPopup.style.display = "none";
    } else {
        userInfoPopup.style.display = "block";
    }
}

// Optional: Close the popup if clicking outside of it
window.onclick = function(event) {
    const userInfoPopup = document.getElementById("userInfoPopup");
    if (event.target !== userInfoPopup && !userInfoPopup.contains(event.target)) {
        userInfoPopup.style.display = "none";
    }
};

