document.querySelector("#blogpostform").addEventListener("submit", (event) => {
  event.preventDefault();

  const blogpostid = document.querySelector("#blogpostid").value;
  const post = document.querySelector("#comment").value;

  fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogPostId: blogpostid,
      content: input,
    }),
  }).then((res) => {
    location.reload();
  });
});
