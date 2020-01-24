
const express = require('express');

const ProjectsRouter = require('./Projects/projects-router');
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.json({
        message: "yay"
    })
})


server.use('/api/projects', ProjectsRouter);

module.exports = server;