var button = document.getElementById("button");
var money = document.getElementById("money");

button.addEventListener("click", function() {
  money.style.visibility = "visible";
  money.style.transform = "translateX(-205%)";
  
  var moveLeft = setInterval(function() {
    var currentLeft = parseInt(money.style.left);
    if (currentLeft >= -90) {
      money.style.left = (currentLeft - 10) + "px";
    } else {
      clearInterval(moveLeft);
      setTimeout(function() {
        money.style.visibility = "hidden";
      }, 400);
      setTimeout(function(){
        money.style.transform = "translateX(205%)";
      },1100);
    }
  }, 50);
})
//счет
if (localStorage.getItem("score1")) {
  var score = parseInt(localStorage.getItem("score1"));
} else {
  var score = 0;
}

if (localStorage.getItem("lastUpdated")) {
  var lastUpdated = parseInt(localStorage.getItem("lastUpdated"));
} else {
  var lastUpdated = 0;
}

$("#score1").text(score);

$("#button").click(function() {
  var currentTime = new Date().getTime();
  if (currentTime - lastUpdated >= 86400000 ) {
    score++;
    $("#score1").text(score);
    localStorage.setItem("score1", score);
    lastUpdated = currentTime;
    localStorage.setItem("lastUpdated", lastUpdated);
  }
});
//form
    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)
