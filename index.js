const express = require("express");
const app = express();
const PORT = 8080;

const {handleTypeError} = require("./middlewares/errors");
const {dbConnection} = require("./config/config");

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/projects",require("./routes/projects"))

app.use(handleTypeError);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
