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


document.addEventListener("DOMContentLoaded",()=>{
    const toggelbtnDiv=document.querySelector(".toggelDiv");
    const linkContainer=document.querySelector(".linkContainer");
    const allLinksContainer=document.querySelector("#allLinks");
    const showNavbar=document.querySelector(".showNavbar");
    const toggelButtonContent=document.getElementById("toggelButtonContent");

    toggelbtnDiv.addEventListener("click", () => {
        console.log("Toggle Button Activated:");
        if (showNavbar.classList.contains("Show")) {
            showNavbar.classList.remove("Show");
            setTimeout(() => {
                // Move each child of allLinksContainer into showNavbar
                while (allLinksContainer.firstChild) {
                    showNavbar.appendChild(allLinksContainer.firstChild);
                }
                toggelButtonContent.textContent = "Back";
                showNavbar.classList.add("visiable");
            }, 30);
        } else {
            showNavbar.classList.remove("visiable");
            setTimeout(() => {
                toggelButtonContent.textContent = "More";
                showNavbar.classList.add("Show");
    
                // Move links back into allLinksContainer
                while (showNavbar.firstChild) {
                    allLinksContainer.appendChild(showNavbar.firstChild);
                }
                linkContainer.appendChild(allLinksContainer);
            }, 1000);
        } 
});
    
   // Handel Resize

   window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        // Move links back to the original container if screen size increases
        if (!linkContainer.contains(allLinksContainer)) {
            linkContainer.appendChild(allLinksContainer);
        }
    }
});
})


