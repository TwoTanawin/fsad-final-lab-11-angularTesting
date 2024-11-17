const express = require('express');
const app = express();
const port = 3500;
const mongoose = require('mongoose');
const cors = require('cors')
const verifyToken = require("./middleware/auth.guard")
const setupChatWebSocket = require('./socket/chat.socket')

const http = require('http');
const server = http.createServer(app);

const mongoURI = 'mongodb://localhost:4500/studentdb';

const userRoutes = require("./routes/user")
const projectRoutes = require("./routes/project")
const chatRoutes = require("./routes/chat")

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
   .then(() => {
    console.log('Connected to MongoDB');
   })
   .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});  

app.use(cors({
    origin: 'http://localhost:4200',
}))

app.use(express.json());

app.use("/user", userRoutes)
app.use("/projects", verifyToken, projectRoutes)
app.use("/chats", verifyToken, chatRoutes)


// Define a simple route
app.get('/', (req, res) => {
 res.send('Hello, Express!');
});

setupChatWebSocket(server)

// Start the server
server.listen(port, () => {
 console.log(`Express app listening at http://localhost:${port}`);
});
