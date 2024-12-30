const postBtn = document.getElementById("postBtn");
const userDivForPost = document.querySelector(".messagebox");
const closeBtn = document.getElementById("closeBtn");
postBtn.addEventListener("click", () => {
    document.body.classList.add("freeze");
    userDivForPost.style.display="block";
});

closeBtn.addEventListener("click", () => {
    document.body.classList.remove("freeze");
    userDivForPost.style.display = "none";
});