const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY20xZ290ZjJtMDAwMDQ4dTk4dnBkM2lqOCIsIm5hbWUiOm51bGwsInBob25lIjoiNjI4OTY5NzMzODgyMSJ9LCJpYXQiOjE3MjcxOTgzMTEsImV4cCI6MTk0ODEwMTUxMX0.XVD8VBnxfjCG62GcVCEUb-TJNFiVyGgCkkW2PQQYRMY";

(async () => {
  const res = await fetch("https://wibu-ai.wibudev.com/api/ollama/chat/tiny-dolphin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `you are a helpful assistant`
        },
        {
          role: "user",
          content: `example python code`
        }
      ]
    })
  });

  console.log(res.status);
  console.log(await res.text());
})();
