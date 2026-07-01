require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`server is up now on port ${PORT}`);
});