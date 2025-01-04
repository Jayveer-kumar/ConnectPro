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

const parent = document.querySelector('.herosectionimageContainer');
const child = document.querySelector('.heromainimage');

let angle = 0;

// Function to rotate the parent and adjust the child
function rotateParent() {
    angle += 1; // Increment rotation angle
    parent.style.transform = `rotate(${angle}deg)`;
    child.style.transform = `rotate(${-angle}deg)`; // Counter rotation
    requestAnimationFrame(rotateParent); // Continue animation
}

// Start the animation
rotateParent();