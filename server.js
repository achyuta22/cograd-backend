const express = require("express"); // Import the Express module
const app = express(); // Create an instance of Express
const cors = require("cors"); // Import cors

const PORT = 3000; // Define the port to listen on
const SignInUP = require("./routes/SignInUp");
const Event = require("./routes/event");
require("./connection/db");
app.use(express.json());
app.use(cors());

// Create a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Start the server and listen on the defined port
app.use("/api/users", SignInUP);
app.use("/api/events", Event);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
