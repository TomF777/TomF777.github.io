    // Info about the code.
    // The below code is based on the source:  https://breakout.enclavegames.com/
    // However I changed most of the code and customized it to my need to achive "Fire the Ball" game.

    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;

    // random ball start position
    var ballX = (canvas.width / 2) + Math.random() * 200;
    var ballY = (canvas.height / 2) + Math.random() * 200;

    // steps for ball motoion
    var dx = 3;
    var dy = -3;

    // current player score
    var score = 0;

    // game started / stopped
    var gameStarted = false;

    var gameInterval;

    // indicator that ball was properly clicked by the player
    var ballClicked = false;

    // number of function call when ball was properly clicked (i.e. 'fired')
    var fireCount = 0;

    // game difficulty. 1=easy, 2=middle, 3=advanced
    var gameLevel = 1;

    // dropdown for level selection
    var dropdownItems = document.querySelectorAll('.dropdown-item');

    // image for "fire icon"
    const imgFire = new Image();
    imgFire.src = '/images/game/fire.png'

    // intro message
    ctx.font = "22px Lucida Console";
    ctx.fillStyle = "rgb(45,45,120)";
    ctx.fillText("PRESS START/STOP", canvas.width-290, 100);


    function drawBall() {
        // if ball clicked properly display fire icon (score++)
        // else display normal ball icon

        if (fireCount >= 4) {
              ballClicked = false;
              fireCount = 0;
        }

        if (ballClicked && fireCount < 4) {
            ctx.drawImage(imgFire, ballX - 2 * ballRadius, ballY - 2 * ballRadius, 40, 40);
            fireCount++;
        } else {
              ctx.beginPath();
              ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
              ctx.fillStyle = "rgb(77,255,70)";
              ctx.fill();
              ctx.closePath();
        }
    }


    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "rgb(45,45,120)";
        ctx.fillText("Score: "+score, 8, 20);
    }

    function drawGameLevel() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "rgb(45,45,120)";
        ctx.fillText("Level: "+gameLevel, canvas.width-260, 20);
    }


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawScore();
        drawGameLevel();

        //
        if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
            dx = -dx;
          }
          if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
            dy = -dy;
          }

        ballX += dx;
        ballY += dy;
    }

    function startStopGame() {
        if (!gameStarted) {
                         gameInterval = setInterval(draw, 50 * (4 - gameLevel));
                         gameStarted = true;
        } else {
                clearInterval(gameInterval);
                gameStarted = false;
        }

      }

    document.getElementById("startStopButton").addEventListener("click", function () {
      startStopGame();
    });

    // check if mouse click on the canvas
    canvas.addEventListener('click', function(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // check if player clicked on the ball
        if ((mouseX <= ballX + ballRadius) && (mouseX >= ballX - ballRadius) &&
           (mouseY <= ballY + ballRadius) && (mouseY >= ballY - ballRadius)) {
            score++;
            ballClicked = true;
           }

    });

    // determine game level from dropdown position
    dropdownItems.forEach(function(el) {
      el.addEventListener('click', function() {
          switch (el.innerHTML) {
            case "Level 1":
              gameLevel = 1;
              break;
            case "Level 2":
              gameLevel = 2;
              break;
            case "Level 3":
              gameLevel = 3;
              break;
            deafault:
            gameLevel = 1;
          }
          startStopGame();
          startStopGame();
      });
  });

