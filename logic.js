const postBtn = document.getElementById("postBtn");
const userDivForPost = document.querySelector(".message-box");
const closeBtn = document.getElementById("closeBtn");
postBtn.addEventListener("click", () => {
    userDivForPost.style.display="block";
});

closeBtn.addEventListener("click", () => {
    userDivForPost.style.display = "none";
});


  