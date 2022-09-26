// Objective: Make a matchmaking lobby server to handle clients by placing them in 
// matchmaking before placing them in a dedicated room.

const http = require('http');
const express = require('express');
const renderer = require('./renderer');
const bp = require('body-parser');
const uuid = require('uuid');
const lobbyPort = 3000;
let activePlayers = [];
let matchmakingQueue = [];

// 1. create lobby server
const lobbyServer = express();

var jsonParser = bp.json()

lobbyServer.get('/', (req, res) => {
    let lobbyPage = renderer.prepare('lobby/lobby.html', {});
    res.status(200)
        .set('Content-Type', 'text/html')
        .send(lobbyPage);
});
lobbyServer.post('/matchmaking', jsonParser, (req, res) => {
    let reqData = req.body;
    if (reqData.status == 1) {
        let data = {
            userId: generateUserId(),
            message: "User added to matchmaking queue"
        };
        res.status(200)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data));
    } else if (reqData.status == 2) {
        let userId = reqData.userId;
        let data = {
            message: "User removed from matchmaking queue"
        };

        res.status(200)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data));
        removeUserId(userId);
    }

    console.log(activePlayers);
});

lobbyServer.get('/nicepage.css', (req, res) => {
    res.status(200)
        .set('Content-Type', 'text/css')
        .sendFile(__dirname + "/client/lobby/nicepage.css");
});

lobbyServer.get('/client.js', (req, res) => {
    res.status(200)
        .set('Content-Type', 'application/javascript')
        .sendFile(__dirname + "/client/lobby/client.js")
});

lobbyServer.get('/lobby.css', (req, res) => {
    res.status(200)
        .set('Content-Type', 'text/css')
        .sendFile(__dirname + "/client/lobby/lobby.css");
});


// 2. listen for matchmaking request on lobby server
lobbyServer.listen(3000);

// 3. on request, place client in matchmaking queue
function generateUserId() {
    let newId = uuid.v4();
    activePlayers.push(newId);
    matchmakingQueue.push(newId);
    return newId;
}
function removeUserId(userId) {
    let playerIndex = activePlayers.indexOf(userId);
    activePlayers.splice(playerIndex, 1);
}
function addToQueue() {

}
// 3.1 if client disconnects or send quit request, remove from queue

// 4. when 2 people in queue, place into dedicated web server with different port
// 4.1 if client disconnects or sends quit request, return player2 into matchmaking queue and KILL dedicated web server