import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker platform");
});

app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
