document.querySelector("#signup-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value;
  console.log(username);
  const password = document.querySelector("#password").value;
  console.log(password);

  fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(() => {
    window.location.href = "/";
    console.log("redirect");
  });
});
