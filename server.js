
const express = require('express');

const RecipesRouter = require('./recipes/recipes-router');
const IngredientsRouter = require('./recipes/ingredients-router')
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.json({
        message: "yay"
    })
})


server.use('/api/recipes', RecipesRouter);
server.use('/api/ingredients', IngredientsRouter)

module.exports = server;