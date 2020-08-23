const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Is Running"));

// Define Routes

app.use("/post", require("./routes/post"));
app.use("/users", require("./routes/user"));
app.use("/picture", require("./routes/picture"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
