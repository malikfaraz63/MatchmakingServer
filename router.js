
function lobby(request, response) {
    
    switch (request.url) {
        case "/nicepage.css":
            response.writeHead(200, {"Content-Type": "text/css"});
            renderer.view('lobby/nicepage.css', {}, response);
        case "/lobby.css":
            response.writeHead(200, {"Content-Type": "text/css"});
            renderer.view('lobby/lobby.css', {}, response);
        default:
            response.writeHead(200, {"Content-Type": "text/html"});
            renderer.view('lobby/index.html', {}, response);
    }
    response.end();
}

function matchmakingRequest(request, response) {

}

module.exports.lobby = lobby;
module.exports.matchmakingRequest = matchmakingRequest;

