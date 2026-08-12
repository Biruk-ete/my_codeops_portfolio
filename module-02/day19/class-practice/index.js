const form = document.querySelector("#loginForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;

    console.log("First Name:", fname);
    console.log("Last Name:", lname);
});