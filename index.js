// Node Native 
const http = require('http');
const path = require('path');

// Others
require('dotenv').config({
    path: path.join(__dirname,'env'),
});

const WHITE_LIST = ['http://example1.com', 'http://example2.com'];
const cors = require('cors');
const express = require("express");




// Express Application
const app = express();

// Express HBS engine
app.set('view engine', 'hbs');  //View engine
app.set('views', path.join(__dirname , './src/views/') ) //Views path
require('./src/helpers/hbs');
require('hbs').registerPartials(path.join(__dirname,'./src/views/partials'))



// Global middlewraes here
app.use(cors({
    origin: (requestOrigin, callback) => {
        if (WHITE_LIST.includes(requestOrigin) || !requestOrigin) return callback(null, true);
        return callback(new Error("Blocked by cors"),false);
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})
);  //  Handle Cors policy
app.use(express.json());  //Append a body object to the request when the Content-Type 
app.use(express.static('public'));//Chek for static files
app.use('/info', (req,resp)=>{
   resp.render('info', {req})
})

// Create a server using our express app
const server = http.createServer(app);


// Server events handlers
server.on("connection", () => {
    console.log('someone connected!');
});

server.on("close", () => {
    console.log('Server has been closed');
});
server.on('listening', () => {
    console.log("Server listening");
});
server.on('error', (err) => {
    const { code, message } = err;
    console.log("There has been an error getting up the server, our engeniers are working on it !");
    console.error(message)
    switch (code) {
        case 'EADDRINUSE':
            const { port: currentPort } = err;
            //Try again in one sec;
            setTimeout(() => {
                server.listen(process.env.PORT || currentPort + 1)
            }, 1000);;

            break;

        default:
            console.log("Ups , somethig went wrong when getting up the server");
            console.error(err);
            break;
    }

})




// Gracefull Shotdown of the process;
process.on("SIGINT", () => {
    console.log("SIGINT");
    server.close();
})

process.on("SIGTERM", () => {
    console.log("SIGTERM");
})
server.listen(process.env.PORT || 3444);


return server;
