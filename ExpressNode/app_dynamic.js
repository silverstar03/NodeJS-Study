const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("hi dynamic");
});

app.get("/dynamic", (req, res) => {
  //hello 5번만 li로 출력
  let list = "";
  for (let i = 0; i < 5; i++) {
    list += "<li>hello</li>";
  }
  let output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>
        ${list}
    </ul>    
</body>
</html> `;
  res.send(output);
});

app.listen(3300, () => {
  console.log("Running express server at localhost...");
});
