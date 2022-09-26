
let selfId = "";

const button = document.querySelector("#play-button");
const messageView = document.querySelector("#message");

button.addEventListener("click", () => {
  if (button.innerHTML == "Play") {
    button.innerHTML = "Cancel";
    button.style.backgroundColor = "red";
    sendMatchmakingRequest();
  } else if (button.innerHTML == "Cancel") {
    button.innerHTML = "Play"
    button.style.backgroundColor = null;
    sendCancelRequest();
  }
});


function sendMatchmakingRequest() {
  let data = {
    status: 1
  };
  sendRequest(data);
}

function sendCancelRequest() {
  let data = {
    status: 2,
    userId: selfId
  };
  sendRequest(data);
}

function sendRequest(data) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/matchmaking', true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let resData = JSON.parse(xhr.response);
      messageView.innerHTML = resData.message;
      
      if (data.status == 1) {
        selfId = resData.userId;
      } else {
        userId = "";
      }
    }
  }

  xhr.send(JSON.stringify(data));
}

  // fetch("/matchmaking", {
  //   method: "POST",
  //   headers: {'Content-Type': 'application/json'}, 
  //   body: JSON.stringify(data)
  // }).then((res) => {
  //   let resData = JSON.parse(res.body);
  //   if (data.status == 1) {
  //     selfId = resData.userId;
  //   } else {
  //     userId = "";
  //   }
  // });



