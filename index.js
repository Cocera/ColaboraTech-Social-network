const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const {handleTypeError} = require("./middlewares/errors");
const {dbConnection} = require("./config/config");

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/projects", require("./routes/projects"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/teams", require("./routes/teams"));
app.use("/invitations", require("./routes/teamInvitations"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(handleTypeError);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
