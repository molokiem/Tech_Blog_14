document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  console.log(username);
  const password = document.querySelector("#password").value;
  console.log(password);

  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.username) {
        window.location.href = "/";
      } else {
        alert("USERNAME/PASSWORD FAIL");
      }
    });
});
