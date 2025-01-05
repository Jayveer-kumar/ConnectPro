const parent = document.querySelector('.herosectionimageContainer');
const child = document.querySelector('.heromainimage');

let angle = 0;

// Function to rotate the parent and adjust the child
function rotateParent() {
    // Check if the window width is large enough to apply the rotation
    if (window.innerWidth > 768) {
        angle += 1; // Increment rotation angle
        parent.style.transform = `rotate(${angle}deg)`;
        child.style.transform = `rotate(${-angle}deg)`; // Counter rotation
    }
    requestAnimationFrame(rotateParent); // Continue animation
}

// Start the animation
rotateParent();