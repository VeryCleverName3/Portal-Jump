antiCheat();
	function antiCheat() {
		setInterval(function(){
			if(localStorage.highscore > highscore){
				localStorage.highscore = highscore;	
			}
		}, 1);
            var c = document.getElementById("gameCanvas");
	    var winPlayer = new Image();
	    winPlayer.src = "winPlayer.png";
            var ctx = c.getContext("2d");
            var x = 400;
            var y = 250;
            var mouseX;
            var mouseY;
            var keyDown = [];
            var mouseDown = [];
            var velocityY = 0;
            var portalDirection = [];
            var portalX = [];
            var portalY = [];
            var isShooting = false;
            var canShoot = true;
            var obstacleDraw = [];
            var obstacleDraw2 = [];
            var gameOver = false;
	    setInterval(function(){if(!document.hasFocus()) gameOver = true;}, 1);
            var score = 0;
            var antiGrav = false;
            var antiGravOnGround = false;
            var blackOut = false;
            var highscore = localStorage.highscore;
            var loop;
            var gameStarted = false;
            var stagesStarted = [];
	    var stagesStarted2 = [];
            var impossible = false;
            var metaGame = false;
            var metaPos = 0;
            var metaObstacle = [];
            var metaGameStarted = false;
            var metaLoop1;
            var metaLoop2;
            var phaseShift = false;
            var phaseLoop;
            var phaseShiftStarted = false;
            var phase = 1;
	    var mobileDirection = 1;
	    var bossImage = new Image();
	    bossImage.src = "Boss.png";
	    var bossFight = false;
	    var bossFightStarted = false;
	    var bossX = 400;
	    var bossY = -270;
	    var bossYVelocity = 0;
	    var bossHealth = 3;
	    if (typeof(localStorage.playerImage) == "undefined") localStorage.playerImage = "";
	    var hasWon = false;
	    var playerImage = new Image();
	    playerImage.src = "" + localStorage.playerImage;
	    if(localStorage.playerImage.length >= 20){
		playerImage.height = 50;
		playerImage.width = 50;
	    }
	    if(localStorage.highscore >= 300){
		hasWon = true;    
	    }
            for (var i = 0; i <= 3; i++) {
                stagesStarted[i] = false;
                stagesStarted2[i] = false;
                metaObstacle[i] = -50;
            }
            if (!(highscore >= 0)) {
                highscore = 0;
            }
            document.addEventListener("keydown", function(e) {
		if(e.which == 32 || (e.which >= 37 && e.which <= 40)){
                	e.preventDefault();
		}
		if(e.which == 76) {
			window.location.reload(true);
		}
                keyDown[e.which] = true;
            });
            document.addEventListener("keyup", function(e) {
                keyDown[e.which] = false;
            });
            onmousemove = function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
	    ontouchmove = function(e) {
		mouseX = e.touches[0].clientX;
		mouseY = e.touches[0].clientY;
		if(e.touches[0].clientX >= 250 && e.touches[0].clientX <= 400 && e.touches[0].clientY >= 800){
			keyDown[68] = true;
		} else {
			keyDown[68] = false;
		}
		if(e.touches[0].clientX <= 150 && e.touches[0].clientY >= 800){
			keyDown[65] = true;
		} else {
			keyDown[65] = false;
		}
		if(e.touches[0].clientY <= 1025 && e.touches[0].clientY >= 800 && e.touches[0].clientX <= 400){
			keyDown[87] = true;
		} else keyDown[87] = false;
		if(e.touches[0].clientY >= 1125 && e.touches[0].clientX <= 400){
			keyDown[83] = true;
		} else keyDown[83] = false;
            }
            document.addEventListener("mousedown", function(e) {
                mouseDown[e.which] = true;
		if(gameOver){
			window.location.reload(true);
		}
                if (!gameStarted) {
                    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 400 && mouseY <= 500) {
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 400 && mouseY <= 500 && highscore >= 50) {
                        score = 50;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 550 && mouseX <= 750 && mouseY >= 400 && mouseY <= 500 && highscore >= 100) {
                        score = 100;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 550 && mouseY <= 650 && highscore >= 150) {
                        score = 150;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 550 && mouseY <= 650 && highscore >= 200) {
                        score = 200;
			phaseShift = true;
			phaseManager();
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 550 && mouseX <= 750 && mouseY >= 550 && mouseY <= 650 && highscore >= 250) {
                        score = 250;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
		    if(mouseX >= 300 && mouseX <= 500 && mouseY >= 700 && highscore >= 300) {
			score = 300;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;  
		    }
                }
            });
	    ontouchstart = function(e) {
		for(var i = 0; i < e.touches.length; i++){
			if(e.touches[i].clientX >= 500 && e.touches[i].clientX <= 700 && e.touches[i].clientY >= 1100 && e.touches[i].clientY <= 1300){
				keyDown[32] = true;
			} else keyDown[32] = false;
			if(e.touches[i].clientX >= 500 && e.touches[i].clientX <= 700 && e.touches[i].clientY >= 850 && e.touches[i].clientY <= 1050){
				mouseDown[1] = true;
			} else {
				mouseDown[1] = false;
			}
			if(e.touches[i].clientY < 800 && e.touches[i].clientX < 400){
				keyDown[37] = true;
				keyDown[39] = false;
			} else if(e.touches[i].clientY < 800 && e.touches[i].clientX > 400){
				keyDown[39] = true;
				keyDown[37] = false;
			}
		}
		mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
		if(mouseX <= 100 && mouseY <= 100){
			document.location = "PlayerSheet.html";
		}
		if(mouseX <= 100 && mouseY <= 200 && mouseY > 100){
			document.location = "SaveCodePage.html";
		}
		if(mouseX <= 100 && mouseY <= 300 && mouseY > 200){
			document.location = "ContactPage.html";
		}
		if(gameOver){
			window.location.reload(true);
		}
                if (!gameStarted) {
                    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 400 && mouseY <= 500) {
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 400 && mouseY <= 500 && highscore >= 50) {
                        score = 50;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 550 && mouseX <= 750 && mouseY >= 400 && mouseY <= 500 && highscore >= 100) {
                        score = 100;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 50 && mouseX <= 250 && mouseY >= 550 && mouseY <= 650 && highscore >= 150) {
                        score = 150;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 550 && mouseY <= 650 && highscore >= 200) {
                        score = 200;
			phaseShift = true;
			phaseManager();
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
                    if (mouseX >= 550 && mouseX <= 750 && mouseY >= 550 && mouseY <= 650 && highscore >= 250) {
                        score = 250;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;
                    }
		    if(mouseX >= 300 && mouseX <= 500 && mouseY >= 700 && highscore >= 300) {
			score = 300;
                        loop = setInterval(function() {
                            draw();
                        }, 1000 / 60);
                        obstacleManager();
                        clearInterval(startMenu);
                        gameStarted = true;  
		    }
                }
	    }
            document.addEventListener("mouseup", function(e) {
                mouseDown[e.which] = false;
            });
	    ontouchend = function(e) {
                mouseDown[e.which] = false;
		keyDown[32] = false;
		mouseDown[1] = false;
            }
            var startMenu = setInterval(function() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 600, 800, 200);
		ctx.strokeStyle = "black";
                ctx.fillStyle = "black";
		if(!hasWon){
			ctx.drawImage(playerImage, x - (playerImage.width / 2), y - (playerImage.height / 2), playerImage.width, playerImage.height);
			if(localStorage.pwd == "CorrectHorseBatteryStaple"){
				var grd = ctx.createLinearGradient(0, 0, 0, 600);
				grd.addColorStop(0, "red");
				grd.addColorStop(1/4, "orange");
				grd.addColorStop(2/4, "yellow");
				grd.addColorStop(3/4, "green");
				grd.addColorStop(1, "blue");
				ctx.fillStyle = grd;
			}
                 if(!hasWon && (localStorage.playerImage.length <= 1)) ctx.fillRect(x - 25, y - 25, 50, 50);
		}
		ctx.fillStyle = "lightgray";
		ctx.fillRect(50, 400, 200, 100);
		ctx.fillRect(300, 400, 200, 100);
		ctx.fillRect(550, 400, 200, 100);
		ctx.fillRect(50, 550, 200, 100);
		ctx.fillRect(300, 550, 200, 100);
		ctx.fillRect(550, 550, 200, 100);
		ctx.strokeRect(50, 400, 200, 100);
		ctx.strokeRect(300, 400, 200, 100);
		ctx.strokeRect(550, 400, 200, 100);
		ctx.strokeRect(50, 550, 200, 100);
		ctx.strokeRect(300, 550, 200, 100);
		ctx.strokeRect(550, 550, 200, 100);
                ctx.fillStyle = "white";
		ctx.fillRect(50, 400, 200, 100);
                ctx.strokeRect(50, 400, 200, 100);
                ctx.fillStyle = "black";
                ctx.fillRect(125, 450, 50, 50);
                ctx.fillStyle = "cyan";
                if (highscore >= 50) {
                    ctx.fillRect(300, 400, 200, 100);
                    ctx.fillStyle = "black";
                    ctx.fillRect(375, 400, 50, 50);
                }
                if (highscore >= 150) {
		    ctx.fillStyle = "white";
		    ctx.fillRect(50, 550, 200, 100);
                    ctx.strokeRect(50, 550, 200, 100);
                    ctx.strokeRect(125, 600, 50, 50);
                    ctx.fillStyle = "blue";
                    ctx.fillRect(140, 640, 20, 10);
                }
                ctx.fillStyle = "black";
                if (highscore >= 100)
                    ctx.fillRect(550, 400, 200, 100);
                ctx.fillStyle = "darkred";
                if (highscore >= 250) {
                    ctx.fillRect(550, 550, 200, 100);
                    ctx.fillStyle = "black";
                    ctx.fillRect(625, 600, 50, 50);
                }
                if (highscore >= 200) {
		    ctx.fillStyle = "white";
		    ctx.fillRect(300, 550, 200, 100);
                    ctx.fillStyle = "violet";
                    ctx.fillRect(300, 550, 100, 100);
                    ctx.strokeRect(300, 550, 200, 100);
                    ctx.fillStyle = "black";
                    ctx.fillRect(375, 600, 50, 50);
                }
                drawMouse();
                ctx.font = "55px Impact";
                ctx.fillStyle = "black";
		ctx.textAlign = "center";
		if(hasWon){
			ctx.fillText("You've Won the Game!", 400, 275);
		}
		ctx.fillText("Portal Jump!", 400, 100);
                ctx.font = "20px Impact";
		ctx.fillText("By Carter Semrad", 400, 150);
		if(screen.width <= 699){
			ctx.textAlign = "start";
			ctx.fillText("Skin Select", 10, 30);
			ctx.fillText("Save Code", 10, 130);
			ctx.fillText("Contact Me", 10, 230);
			ctx.textAlign = "center";
		}
		ctx.font = "55px Impact";
                ctx.fillText("Highscore: " + highscore, 400, 200);
		ctx.fillText("Level Select", 400, 350);
		ctx.textAlign = "start";
            }, 1000 / 60);
            function draw() {
                c = document.getElementById("gameCanvas");
                ctx = c.getContext("2d");
                ctx.fillStyle = "white";
                if (impossible)
                    ctx.fillStyle = "darkred";
                ctx.fillRect(0, 0, 800, 800);
                if (keyDown[65] && x > 25) {
                    x -= 5;
                    if (impossible)
                        x -= 5;
		    if(screen.width <= 699) {
			    mouseX = x - 50;
			    mouseY = y;
			    mobileDirection = 1;
		    }
                }
                if (keyDown[68] && x < 775) {
                    x += 5;
                    if (impossible)
                        x += 5;
		    if(screen.width <= 699){
			    mouseX = x + 50;
			    mouseY = y;
			    mobileDirection = 2;
		    }
                }
		if(screen.width <= 699) {
			if(mobileDirection == 1){
				mouseX = x - 50;
				mouseY = y;
			} else {
				mouseX = x + 50;
				mouseY = y;
			}
		}
                if (keyDown[87] && onGround() && !antiGrav) {
                    velocityY = 15;
		    if(impossible) velocityY = 20;
                }
                if (y < 0) {
                    y = 25;
                    velocityY = 0;
                }
                y -= velocityY;
                if (!onGround() && (velocityY >= -50) && !antiGrav) {
                    velocityY -= 0.5;
		    if(impossible) velocityY -= 0.5;
                }
		if(antiGrav){
			ctx.fillStyle = "cyan";
			ctx.fillRect(0, 0, 800, 800);
		}
                shooting();
                phaseManager();
                drawObstacles();
                drawObstacles2();
                if (impossible) {
                    drawObstacles();
                    drawObstacles2();
                }
		bossManager();
                ctx.fillStyle = "black";
		if(hasWon && localStorage.playerImage.length <= 1){
			ctx.fillStyle = ctx.strokeStyle;
			ctx.drawImage(winPlayer, x - 25, y - 25);
			ctx.strokeStyle = "black";
			ctx.strokeRect(x - 25, y - 25, 50, 50);
			ctx.fillRect(x - 5, y - 5, 10, 10);
			ctx.strokeRect(x - 5, y - 5, 10, 10);
		}
		if(!metaGame) ctx.drawImage(playerImage, x - (playerImage.width / 2), y - (playerImage.height / 2), playerImage.width, playerImage.height);
		if(localStorage.pwd == "CorrectHorseBatteryStaple"){
			var grd = ctx.createLinearGradient(0, 0, 0, 600);
			grd.addColorStop(0, "red");
			grd.addColorStop(1/4, "orange");
			grd.addColorStop(2/4, "yellow");
			grd.addColorStop(3/4, "green");
			grd.addColorStop(1, "blue");
			ctx.fillStyle = grd;
		}
                if(!hasWon && (localStorage.playerImage.length <= 1)) ctx.fillRect(x - 25, y - 25, 50, 50);
                metaGameManager();
                ctx.fillStyle = "black";
                portals();
                ctx.fillStyle = "black";
                ctx.fillRect(0, 625, 800, 175);
		if(localStorage.playerImage == "wizard.png" && !metaGame) ctx.drawImage(playerImage, x - (playerImage.width / 2), y - (playerImage.height / 2), playerImage.width, playerImage.height);
                if (portalDirection[1]) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(portalX[1], portalY[1], 100, 10);
                }
                blackOutManager();
                ctx.font = "30px Impact";
                ctx.fillStyle = "black";
                if (blackOut)
                    ctx.fillStyle = "white";
                ctx.fillText("Score: " + score, 20, 30);
                drawMouse();
                localStorage.highscore = highscore;
                if (score > highscore) {
                    highscore = score;
		    pass.innerText = highscore * 367423786;
                }
                if (gameOver) {
		    clearInterval(loop);
		    setInterval(function(){
                    	ctx.fillStyle = "red";
                    	ctx.fillRect(0, 0, 800, 800);
		    	ctx.font = "55px Impact";
		    	ctx.fillStyle = "black";
		    	ctx.strokeStyle = "black";
		    	ctx.textAlign = "center";
		    	ctx.fillText("Game Over!", 400, 300);
		    	ctx.strokeText("Game Over!", 400, 300);
		    	ctx.fillText("Final Score: " + score, 400, 500);
		    	ctx.strokeText("Final Score: " + score, 400, 500);
		    	ctx.fillText("Click the Mouse to Play Again!", 400, 600);
		    	ctx.strokeText("Click the Mouse to Play Again!", 400, 600);
			drawMouse();
		    }, 1000 / 60);
                }
            }
            function portals() {
                //down portal
                if (keyDown[83] && keyDown[32] && (!portalDirection[1] && !portalDirection[2] && !portalDirection[3] && !portalDirection[4])) {
                    portalDirection[1] = true;
                    portalX[1] = x - 50;
                    portalY[1] = y + 25;
                    if (!impossible) {
                        setTimeout(function check() {
                            if (!(keyDown[83] && keyDown[32])) {
                                portalDirection[1] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 500);
                        }, 500);
                    } else
                        setTimeout(function check() {
                            if (!(keyDown[83] && keyDown[32])) {
                                portalDirection[1] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 100);
                        }, 100);
                }
                if (portalDirection[1]) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(portalX[1], portalY[1], 100, 10);
                    ctx.fillStyle = "orange";
                    ctx.fillRect(portalX[1], 0, 100, 10);
                    if ((x >= portalX[1]) && (x <= (portalX[1] + 100)) && (y >= portalY[1] - 25) && (y <= portalY[1] + 25)) {
                        y = 0;
                    }
                }
                //up portal
                if (keyDown[87] && keyDown[32] && (!portalDirection[1] && !portalDirection[2] && !portalDirection[3] && !portalDirection[4])) {
                    portalDirection[2] = true;
                    portalX[2] = x - 50;
                    portalY[2] = y - 35;
                    if (!impossible) {
                        setTimeout(function check() {
                            if (!(keyDown[87] && keyDown[32])) {
                                portalDirection[2] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 500);
                        }, 500);
                    } else
                        setTimeout(function check() {
                            if (!(keyDown[87] && keyDown[32])) {
                                portalDirection[2] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 100);
                        }, 100);
                    setTimeout(function() {
                        y = 599;
                    }, 50);
                }
                if (portalDirection[2]) {
                    ctx.fillStyle = "orange";
                    ctx.fillRect(portalX[2], portalY[2], 100, 10);
                    ctx.fillStyle = "blue";
                    ctx.fillRect(portalX[2], 615, 100, 10);
                    if ((x >= portalX[2]) && (x <= (portalX[2] + 100)) && (y >= portalY[2] - 25) && (y <= portalY[2] + 25)) {
                        if (antiGrav) {
                            y = 599;
                        } else
                            setTimeout(function() {
                                y = 599
                            }, 50);
                    }
                }
                //left portal
                if (keyDown[65] && keyDown[32] && (!portalDirection[1] && !portalDirection[2] && !portalDirection[3] && !portalDirection[4])) {
                    portalDirection[3] = true;
                    portalX[3] = x - 35;
                    portalY[3] = y - 50;
                    if (!impossible) {
                        setTimeout(function check() {
                            if (!(keyDown[65] && keyDown[32])) {
                                portalDirection[3] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 500);
                        }, 500);
                    } else
                        setTimeout(function check() {
                            if (!(keyDown[65] && keyDown[32])) {
                                portalDirection[3] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 100);
                            }, 100);
                        if(!impossible && !phaseShift) setTimeout(function() {
                            x = 800;
                        }, 50);
		        if(impossible || phaseShift) x = 800;
                    }
                if (portalDirection[3]) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(portalX[3], portalY[3], 10, 100);
                    ctx.fillStyle = "green";
                    ctx.fillRect(790, portalY[3], 10, 100);
                    if ((x >= portalX[3] - 25) && (x <= (portalX[3] + 25)) && (y >= portalY[3]) && (y <= portalY[3] + 100)) {
                    	if(!impossible && !phaseShift) setTimeout(function() {
                    	    x = 800;
                    	}, 50);
		    	if(impossible || phaseShift) x = 800;
                    }
                }
                //right portal
                if (keyDown[68] && keyDown[32] && (!portalDirection[1] && !portalDirection[2] && !portalDirection[3] && !portalDirection[4])) {
                    portalDirection[4] = true;
                    portalX[4] = x + 25;
                    portalY[4] = y - 50;
                    if (!impossible) {
                        setTimeout(function check() {
                            if (!(keyDown[68] && keyDown[32])) {
                                portalDirection[4] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 500);
                        }, 500);
                    } else
                        setTimeout(function check() {
                            if (!(keyDown[68] && keyDown[32])) {
                                portalDirection[4] = false;
                            } else
                                setTimeout(function() {
                                    check();
                                }, 100);
                        }, 100);
                    if(!impossible && !phaseShift) setTimeout(function() {
                        x = 0;
                    }, 50);
		    if(impossible || phaseShift) x = 0;
                }
                if (portalDirection[4]) {
                    ctx.fillStyle = "green";
                    ctx.fillRect(portalX[4], portalY[4], 10, 100);
                    ctx.fillStyle = "red";
                    ctx.fillRect(0, portalY[4], 10, 100);
                    if ((x >= portalX[4] - 25) && (x <= (portalX[4] + 25)) && (y >= portalY[4]) && (y <= portalY[4] + 100)) {
                    	if(!impossible && !phaseShift) setTimeout(function() {
                    	    x = 0;
                    	}, 50);
		    	if(impossible || phaseShift) x = 0;
                    }
                }
            }
            function shooting() {
                if (!metaGame) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(mouseX + ((mouseX - x) * 30), mouseY + ((mouseY - y) * 30));
                    ctx.strokeStyle = "red";
                    ctx.stroke();
                    ctx.closePath();
                    if (mouseDown[1] && !isShooting && canShoot) {
                        isShooting = true;
                        canShoot = false;
                        setTimeout(function() {
                            isShooting = false;
                        }, 300);
                        setTimeout(function() {
                            canShoot = true
                        }, 750);
                    }
                    if (isShooting) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(mouseX + ((mouseX - x) * 30), mouseY + ((mouseY - y) * 30));
                        ctx.strokeStyle = "blue";
                        ctx.lineWidth = 10;
                        ctx.stroke();
                        ctx.lineWidth = 1;
                        ctx.closePath();
                    }
                }
            }
            function isShootingNow(x1, x2, y1, y2) {
                if (isShooting) {
                    var m = (mouseY - y) / (mouseX - x);
                    var b = ((0 - m) * x) + y;
                    if ((mouseX - x > 0 && x1 - x > 0) || (mouseX - x < 0 && x1 - x < 0)) {
                        for (var i = x1; i <= x2; i++) {
                            if ((((m * i) + b) >= y1) && (((m * i) + b) <= y2)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
            function onGround() {
                if (phase == 1) {
                    if (y >= obstacleDraw[10] - 25 && y <= obstacleDraw[10] + 25) {
                        y = obstacleDraw[10] - 25;
                        if (antiGrav) {
                            velocityY = 0;
                        } else
                            velocityY = 5;
                        return true;
                    }
                    if (y >= obstacleDraw[10] + 25 && y <= obstacleDraw[10] + 75) {
                        y = obstacleDraw[10] + 70;
                        if (antiGrav) {
                            velocityY = 5;
                        } else
                            velocityY = 0;
                        antiGravOnGround = true;
                    } else
                        antiGravOnGround = false;
                    if (y >= 600) {
                        y = 600;
                        velocityY = 0;
                        return true;
                    }
                    if (y >= obstacleDraw[9] - 25 && y <= obstacleDraw[9] + 50) {
                        y = obstacleDraw[9] - 20;
                        if (antiGrav) {
                            velocityY = 0;
                        } else
                            velocityY = -5;
                        return true;
                    }
                    return false;
                }
                if (phase == 2) {
                    if (y >= obstacleDraw2[10] - 25 && y <= obstacleDraw2[10] + 25) {
                        y = obstacleDraw2[10] - 25;
                        if (antiGrav) {
                            velocityY = 0;
                        } else
                            velocityY = 5;
                        return true;
                    }
                    if (y >= obstacleDraw2[10] + 25 && y <= obstacleDraw2[10] + 75) {
                        y = obstacleDraw2[10] + 70;
                        if (antiGrav) {
                            velocityY = 5;
                        } else
                            velocityY = 0;
                        antiGravOnGround = true;
                    } else
                        antiGravOnGround = false;
                    if (y >= 600) {
                        y = 600;
                        velocityY = 0;
                        return true;
                    }
                    if (y >= obstacleDraw2[9] - 25 && y <= obstacleDraw2[9] + 50) {
                        y = obstacleDraw2[9] - 20;
                        if (antiGrav) {
                            velocityY = 0;
                        } else
                            velocityY = -5;
                        return true;
                    }
                    return false;
                }
            }
            function spawnObstacle2(type) {
		if(phase == 2){
                if (type == 1) {
                    obstacleDraw2[1] = 0;
                }
                if (type == 2) {
                    obstacleDraw2[2] = 0;
                }
                if (type == 3) {
                    obstacleDraw2[3] = 0;
                }
                if (type == 4) {
                    obstacleDraw2[4] = 800;
                }
                if (type == 5) {
                    obstacleDraw2[5] = -50;
                }
                if (type == 6) {
                    obstacleDraw2[6] = 800;
                }
                if (type == 7) {
                    obstacleDraw2[7] = -50;
                }
                if (type == 8) {
                    obstacleDraw2[8] = -50;
                }
                if (type == 9) {
		    if(bossFight){
			    type = 10;
		    } else obstacleDraw2[9] = -100;
                }
                if (type == 10) {
                    obstacleDraw2[10] = 700;
                }
		if(!gameOver){
			score += 1;
		}
		}
            }
            function drawObstacles2() {
                if (phase == 2) {
                    if (score >= 50 && score < 100) {
                        antiGrav = true;
                    }
                    if (score >= 100 && score < 150) {
                        antiGrav = false;
                        blackOut = true;
                    }
                    if (score >= 150 && score < 200) {
                        antiGrav = false;
                        blackOut = false;
                        metaGame = true;
                    }
                    if (score >= 200 && score < 250) {
                        antiGrav = false;
                        metaGame = false;
                        blackOut = false;
                        phaseShift = true;
                    }
                    if (score >= 250 && score < 300) {
                        antiGrav = false;
                        metaGame = false;
                        blackOut = false;
                        phaseShift = false;
                        impossible = true
                    }
                    if (antiGrav) {
                        if (y > 25) {
                            velocityY += 0.5;
                        } else {
                            y = 25;
                            velocityY = 0;
                            if (keyDown[83]) {
                                velocityY = -15;
                            }
                        }
                        if (antiGravOnGround && keyDown[83]) {
                            velocityY = -15;
                        }
                        if (velocityY >= 50) {
                            velocityY = 50;
                        }
                        shooting();
                    }
                    ctx.fillStyle = "violet";
                    ctx.fillRect(0, 0, 800, 800);
                    shooting();
                    if (obstacleDraw2[1] >= 0) {
			obstacleDraw2[1] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(0, 500, 800, 300);
                        shooting();
				if(obstacleDraw2[1] >= 60){
					ctx.fillStyle = "red";
                        		ctx.fillRect(0, 500, 800, 300);
					if(y >= 500 && obstacleDraw2[1] == 60){
						gameOver = true;
					}
					if(obstacleDraw2[1] >= 72){
						obstacleDraw2[1] = -10;
					}
				}
                    }
                    if (obstacleDraw2[2] >= 0) {
			obstacleDraw2[2] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(0, 0, 400, 800);
                        shooting();
			if(obstacleDraw2[2] >= 60){
                        	ctx.fillStyle = "red";
                        	ctx.fillRect(0, 0, 400, 800);
				if(x <= 400 && obstacleDraw2[2] == 60){
					gameOver = true;
				}
				if(obstacleDraw2[2] >= 72){
					obstacleDraw2[2] = -10;
				}
			}
                    }
                    if (obstacleDraw2[3] >= 0) {
			obstacleDraw2[3] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(400, 0, 400, 800);
                        shooting();
			if(obstacleDraw2[3] >= 60){
                        	ctx.fillStyle = "red";
                        	ctx.fillRect(400, 0, 400, 800);
				if(x >= 400 && obstacleDraw2[3] == 60){
					gameOver = true;
				}
				if(obstacleDraw2[3] >= 72){
					obstacleDraw2[3] = -10;
				}
			}
                    }
                    if (obstacleDraw2[4] > -50) {
                        obstacleDraw2[4] -= 5;
                        ctx.fillStyle = "purple";
                        ctx.fillRect(obstacleDraw2[4], 0, 50, 800);
                        if (x >= obstacleDraw2[4] && x <= obstacleDraw2[4] + 50) {
                            gameOver = true;
                        }
                        if (isShootingNow(obstacleDraw2[4], obstacleDraw2[4] + 50, 0, 800)) {
                            obstacleDraw2[4] = -50;
                        }
                    }
                    if (obstacleDraw2[5] < 800) {
                        obstacleDraw2[5] += 5;
                        ctx.fillStyle = "purple";
                        ctx.fillRect(obstacleDraw2[5], 0, 50, 800);
                        if (x >= obstacleDraw2[5] && x <= obstacleDraw2[5] + 50) {
                            gameOver = true;
                        }
                        if (isShootingNow(obstacleDraw2[5], obstacleDraw2[5] + 50, 0, 800)) {
                            obstacleDraw2[5] = 800;
                        }
                    }
                    if (obstacleDraw2[6] > -50) {
                        obstacleDraw2[6] -= 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw2[6], 0, 50, 800);
                        if (x >= obstacleDraw2[6] && x <= obstacleDraw2[6] + 50) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw2[7] < 800) {
                        obstacleDraw2[7] += 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw2[7], 0, 50, 800);
                        if (x >= obstacleDraw2[7] && x <= obstacleDraw2[7] + 50) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw2[8] < 375) {
                        obstacleDraw2[8] += 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw2[8], 0, 50, 800);
                        ctx.fillRect((0 - obstacleDraw2[8]) + 750, 0, 50, 800)
                        if ((x >= obstacleDraw2[8] && x <= obstacleDraw2[8] + 50) || (x >= ((0 - obstacleDraw2[8]) + 750) && x <= ((0 - obstacleDraw2[8]) + 750) + 50)) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw2[9] < 800) {
                        obstacleDraw2[9] += 5;
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, obstacleDraw2[9], 800, 50);
                        ctx.fillStyle = "red";
                        ctx.fillRect(0, obstacleDraw2[9] + 50, 800, 50);
                        if (y >= obstacleDraw2[9] + 50 && y <= obstacleDraw2[9] + 100) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw2[10] > -50) {
                        obstacleDraw2[10] -= 5;
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, obstacleDraw2[10], 800, 50);
                        if (obstacleDraw2[10] > 300) {
                            ctx.fillStyle = "pink";
                            ctx.fillRect(0, 0, 800, 50);
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(mouseX + ((mouseX - x) * 30), mouseY + ((mouseY - y) * 30));
                            ctx.strokeStyle = "red";
                            ctx.stroke();
                            ctx.closePath();
                            shooting();
                        } else {
                            ctx.fillStyle = "red";
                            ctx.fillRect(0, 0, 800, 50);
                            if (y <= 50 && obstacleDraw2[10] > 0) {
                                gameOver = true;
                            }
                        }
                    } else
                        obstacleDraw2[10] = -1000;
                }
            }
            function obstacleManager2() {
                var i = 1;
                var stage1 = setInterval(function() {
                    if (antiGrav && i == 9) {
                        spawnObstacle2(10);
                    } else
                        spawnObstacle2(i);
                    if (keyDown[39])
                        i = 9;
                    i++;
                    if (score >= 10 || i == 10) {
                        clearInterval(stage1);
                        i = 0;
                        var randomNum3 = 0;
                        var randomNum4 = 0;
                        var stage2 = setInterval(function() {
                            var randomNum1 = Math.floor(Math.random() * 10);
                            var randomNum2 = Math.floor(Math.random() * 10);
                            while ((randomNum1 == 2 && randomNum2 == 3) || (randomNum1 == 3 && randomNum2 == 2) || (randomNum1 == 6 && randomNum2 == 7) || (randomNum1 == 7 && randomNum2 == 6)) {
                                randomNum1 = Math.floor(Math.random() * 10);
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 6 && randomNum1 == 3) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 6 && randomNum2 == 3) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 6 && randomNum1 == 3) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 6 && randomNum2 == 3) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 7 && randomNum1 == 2) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 7 && randomNum2 == 2) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 7 && randomNum1 == 2) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 7 && randomNum2 == 2) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            if (antiGrav && randomNum1 == 9) {
                                randomNum1 = 10;
                            }
                            if (antiGrav && randomNum2 == 9) {
                                randomNum2 = 10;
                            }
                            while (metaGame && ((randomNum1 == 4) || (randomNum1 == 5) || (randomNum2 == 4) || (randomNum2 == 5))) {
                                randomNum1 = Math.floor(Math.random() * 10);
                                randomNum2 = Math.floor(Math.random() * 10);
                                while ((randomNum1 == 2 && randomNum2 == 3) || (randomNum1 == 3 && randomNum2 == 2) || (randomNum1 == 6 && randomNum2 == 7) || (randomNum1 == 7 && randomNum2 == 6)) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 6 && randomNum1 == 3) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 6 && randomNum2 == 3) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 6 && randomNum1 == 3) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 6 && randomNum2 == 3) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 7 && randomNum1 == 2) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 7 && randomNum2 == 2) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 7 && randomNum1 == 2) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 7 && randomNum2 == 2) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                if (antiGrav && randomNum1 == 9) {
                                    randomNum1 = 10;
                                }
                                if (antiGrav && randomNum2 == 9) {
                                    randomNum2 = 10;
                                }
                            }
                            spawnObstacle2(randomNum1);
                            spawnObstacle2(randomNum2);
                            if (score >= 20 && !stagesStarted2[3]) {
                                stagesStarted2[3] = true;
                                var stage3 = setTimeout(function() {
                                    setInterval(function() {
                                        randomNum3 = Math.floor(Math.random() * 10);
                                        randomNum4 = Math.floor(Math.random() * 10);
                                        while ((randomNum3 == 2 && randomNum4 == 3) || (randomNum3 == 3 && randomNum4 == 2) || (randomNum3 == 6 && randomNum4 == 7) || (randomNum3 == 7 && randomNum4 == 6)) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 6 && randomNum3 == 3) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 6 && randomNum4 == 3) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 6 && randomNum3 == 3) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 6 && randomNum4 == 3) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 7 && randomNum3 == 2) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 7 && randomNum4 == 2) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 7 && randomNum3 == 2) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 7 && randomNum4 == 2) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        if (antiGrav && randomNum3 == 9) {
                                            randomNum3 = 10;
                                        }
                                        if (antiGrav && randomNum4 == 9) {
                                            randomNum4 = 10;
                                        }
                                        while (metaGame && ((randomNum3 == 4) || (randomNum3 == 5) || (randomNum4 == 4) || (randomNum4 == 5))) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                            randomNum4 = Math.floor(Math.random() * 10);
                                            while ((randomNum3 == 2 && randomNum4 == 3) || (randomNum3 == 3 && randomNum4 == 2) || (randomNum3 == 6 && randomNum4 == 7) || (randomNum3 == 7 && randomNum4 == 6)) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 6 && randomNum3 == 3) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 6 && randomNum4 == 3) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 6 && randomNum3 == 3) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 6 && randomNum4 == 3) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 7 && randomNum3 == 2) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 7 && randomNum4 == 2) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 7 && randomNum3 == 2) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 7 && randomNum4 == 2) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            if (antiGrav && randomNum3 == 9) {
                                                randomNum3 = 10;
                                            }
                                            if (antiGrav && randomNum4 == 9) {
                                                randomNum4 = 10;
                                            }
                                        }
                                        spawnObstacle2(randomNum3);
                                        spawnObstacle2(randomNum4);
                                    }, 3000);
                                }, 1500);
                            }
                        }, 3000);
                    }
                }, 3000);
            }
            function spawnObstacle(type) {
		if(phase == 1) {
                if (type == 1) {
                    obstacleDraw[1] = 0;
                }
                if (type == 2) {
                    obstacleDraw[2] = 0;
                }
                if (type == 3) {
                    obstacleDraw[3] = 0;
                }
                if (type == 4) {
                    obstacleDraw[4] = 800;
                }
                if (type == 5) {
                    obstacleDraw[5] = -50;
                }
                if (type == 6) {
                    obstacleDraw[6] = 800;
                }
                if (type == 7) {
                    obstacleDraw[7] = -50;
                }
                if (type == 8) {
                    obstacleDraw[8] = -50;
                }
                if (type == 9) {
		    if(bossFight){
			    type = 10;
		    } else obstacleDraw[9] = -100;
                }
                if (type == 10) {
                    obstacleDraw[10] = 700;
                }
		if(!gameOver){
                	score += 1;
		}
		}
            }
            function drawObstacles() {
                if (phase == 1) {
                    if (score >= 50 && score < 100) {
                        antiGrav = true;
                    }
                    if (score >= 100 && score < 150) {
                        antiGrav = false;
                        blackOut = true;
                    }
                    if (score >= 150 && score < 200) {
                        antiGrav = false;
                        blackOut = false;
                        metaGame = true;
                    }
                    if (score >= 200 && score < 250) {
                        antiGrav = false;
                        metaGame = false;
                        blackOut = false;
                        phaseShift = true;
                    }
                    if (score >= 250 && score < 300) {
                        antiGrav = false;
                        metaGame = false;
                        blackOut = false;
                        phaseShift = false;
                        impossible = true
                    }
		    if(score >= 300) bossFight = true;
                    if (antiGrav) {
                        if (y > 25) {
                            velocityY += 0.5;
                        } else {
                            y = 25;
                            velocityY = 0;
                            if (keyDown[83]) {
                                velocityY = -15;
                            }
                        }
                        if (antiGravOnGround && keyDown[83]) {
                            velocityY = -15;
                        }
                        if (velocityY >= 50) {
                            velocityY = 50;
                        }
                        shooting();
                    }
                    if (obstacleDraw[1] >= 0) {
			obstacleDraw[1] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(0, 500, 800, 300);
                        shooting();
				if(obstacleDraw[1] >= 60){
					ctx.fillStyle = "red";
                        		ctx.fillRect(0, 500, 800, 300);
					if(y >= 500 && obstacleDraw[1] == 60){
						gameOver = true;
					}
					if(obstacleDraw[1] >= 72){
						obstacleDraw[1] = -10;
					}
				}
                    }
                    if (obstacleDraw[2] >= 0) {
			obstacleDraw[2] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(0, 0, 400, 800);
                        shooting();
			if(obstacleDraw[2] >= 60){
                        	ctx.fillStyle = "red";
                        	ctx.fillRect(0, 0, 400, 800);
				if(x <= 400 && obstacleDraw[2] == 60){
					gameOver = true;
				}
				if(obstacleDraw[2] >= 72){
					obstacleDraw[2] = -10;
				}
			}
                    }
                    if (obstacleDraw[3] >= 0) {
			obstacleDraw[3] += 1;
                        ctx.fillStyle = "pink";
                        ctx.fillRect(400, 0, 400, 800);
                        shooting();
			if(obstacleDraw[3] >= 60){
                        	ctx.fillStyle = "red";
                        	ctx.fillRect(400, 0, 400, 800);
				if(x >= 400 && obstacleDraw[3] == 60){
					gameOver = true;
				}
				if(obstacleDraw[3] >= 72){
					obstacleDraw[3] = -10;
				}
			}
                    }
                    if (obstacleDraw[4] > -50) {
                        obstacleDraw[4] -= 5;
                        ctx.fillStyle = "purple";
                        ctx.fillRect(obstacleDraw[4], 0, 50, 800);
                        if (x >= obstacleDraw[4] && x <= obstacleDraw[4] + 50) {
                            gameOver = true;
                        }
                        if (isShootingNow(obstacleDraw[4], obstacleDraw[4] + 50, 0, 800)) {
                            obstacleDraw[4] = -50;
                        }
                    }
                    if (obstacleDraw[5] < 800) {
                        obstacleDraw[5] += 5;
                        ctx.fillStyle = "purple";
                        ctx.fillRect(obstacleDraw[5], 0, 50, 800);
                        if (x >= obstacleDraw[5] && x <= obstacleDraw[5] + 50) {
                            gameOver = true;
                        }
                        if (isShootingNow(obstacleDraw[5], obstacleDraw[5] + 50, 0, 800)) {
                            obstacleDraw[5] = 800;
                        }
                    }
                    if (obstacleDraw[6] > -50) {
                        obstacleDraw[6] -= 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw[6], 0, 50, 800);
                        if (x >= obstacleDraw[6] && x <= obstacleDraw[6] + 50) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw[7] < 800) {
                        obstacleDraw[7] += 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw[7], 0, 50, 800);
                        if (x >= obstacleDraw[7] && x <= obstacleDraw[7] + 50) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw[8] < 375) {
                        obstacleDraw[8] += 5;
                        ctx.fillStyle = "red";
                        ctx.fillRect(obstacleDraw[8], 0, 50, 800);
                        ctx.fillRect((0 - obstacleDraw[8]) + 750, 0, 50, 800)
                        if ((x >= obstacleDraw[8] && x <= obstacleDraw[8] + 50) || (x >= ((0 - obstacleDraw[8]) + 750) && x <= ((0 - obstacleDraw[8]) + 750) + 50)) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw[9] < 800) {
                        obstacleDraw[9] += 5;
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, obstacleDraw[9], 800, 50);
                        ctx.fillStyle = "red";
                        ctx.fillRect(0, obstacleDraw[9] + 50, 800, 50);
                        if (y >= obstacleDraw[9] + 50 && y <= obstacleDraw[9] + 100) {
                            gameOver = true;
                        }
                    }
                    if (obstacleDraw[10] > -50) {
                        obstacleDraw[10] -= 5;
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, obstacleDraw[10], 800, 50);
                        if (obstacleDraw[10] > 300) {
                            ctx.fillStyle = "pink";
                            ctx.fillRect(0, 0, 800, 50);
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(mouseX + ((mouseX - x) * 30), mouseY + ((mouseY - y) * 30));
                            ctx.strokeStyle = "red";
                            ctx.stroke();
                            ctx.closePath();
                            shooting();
                        } else {
                            ctx.fillStyle = "red";
                            ctx.fillRect(0, 0, 800, 50);
                            if (y <= 50 && obstacleDraw[10] > 0) {
                                gameOver = true;
                            }
                        }
                    } else
                        obstacleDraw[10] = -1000;
                }
            }
            function obstacleManager() {
                obstacleManager2();
                var i = 1;
                var stage1 = setInterval(function() {
                    if (antiGrav && i == 9) {
                        spawnObstacle(10);
                    } else
                        spawnObstacle(i);
                    if (keyDown[39])
                        i = 9;
                    i++;
                    if (score >= 10 || i == 10) {
                        clearInterval(stage1);
                        i = 0;
                        var randomNum3 = 0;
                        var randomNum4 = 0;
                        var stage2 = setInterval(function() {
                            var randomNum1 = Math.floor(Math.random() * 10);
                            var randomNum2 = Math.floor(Math.random() * 10);
                            while ((randomNum1 == 2 && randomNum2 == 3) || (randomNum1 == 3 && randomNum2 == 2) || (randomNum1 == 6 && randomNum2 == 7) || (randomNum1 == 7 && randomNum2 == 6)) {
                                randomNum1 = Math.floor(Math.random() * 10);
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 6 && randomNum1 == 3) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 6 && randomNum2 == 3) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 6 && randomNum1 == 3) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 6 && randomNum2 == 3) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 7 && randomNum1 == 2) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum3 == 7 && randomNum2 == 2) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 7 && randomNum1 == 2) {
                                randomNum1 = Math.floor(Math.random() * 10);
                            }
                            while (randomNum4 == 7 && randomNum2 == 2) {
                                randomNum2 = Math.floor(Math.random() * 10);
                            }
                            if (antiGrav && randomNum1 == 9) {
                                randomNum1 = 10;
                            }
                            if (antiGrav && randomNum2 == 9) {
                                randomNum2 = 10;
                            }
                            while (metaGame && ((randomNum1 == 4) || (randomNum1 == 5) || (randomNum2 == 4) || (randomNum2 == 5))) {
                                randomNum1 = Math.floor(Math.random() * 10);
                                randomNum2 = Math.floor(Math.random() * 10);
                                while ((randomNum1 == 2 && randomNum2 == 3) || (randomNum1 == 3 && randomNum2 == 2) || (randomNum1 == 6 && randomNum2 == 7) || (randomNum1 == 7 && randomNum2 == 6)) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 6 && randomNum1 == 3) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 6 && randomNum2 == 3) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 6 && randomNum1 == 3) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 6 && randomNum2 == 3) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 7 && randomNum1 == 2) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum3 == 7 && randomNum2 == 2) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 7 && randomNum1 == 2) {
                                    randomNum1 = Math.floor(Math.random() * 10);
                                }
                                while (randomNum4 == 7 && randomNum2 == 2) {
                                    randomNum2 = Math.floor(Math.random() * 10);
                                }
                                if (antiGrav && randomNum1 == 9) {
                                    randomNum1 = 10;
                                }
                                if (antiGrav && randomNum2 == 9) {
                                    randomNum2 = 10;
                                }
                            }
                            spawnObstacle(randomNum1);
                            spawnObstacle(randomNum2);
                            if (score >= 20 && !stagesStarted[3]) {
                                stagesStarted[3] = true;
                                var stage3 = setTimeout(function() {
                                    setInterval(function() {
                                        randomNum3 = Math.floor(Math.random() * 10);
                                        randomNum4 = Math.floor(Math.random() * 10);
                                        while ((randomNum3 == 2 && randomNum4 == 3) || (randomNum3 == 3 && randomNum4 == 2) || (randomNum3 == 6 && randomNum4 == 7) || (randomNum3 == 7 && randomNum4 == 6)) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 6 && randomNum3 == 3) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 6 && randomNum4 == 3) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 6 && randomNum3 == 3) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 6 && randomNum4 == 3) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 7 && randomNum3 == 2) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum1 == 7 && randomNum4 == 2) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 7 && randomNum3 == 2) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                        }
                                        while (randomNum2 == 7 && randomNum4 == 2) {
                                            randomNum4 = Math.floor(Math.random() * 10);
                                        }
                                        if (antiGrav && randomNum3 == 9) {
                                            randomNum3 = 10;
                                        }
                                        if (antiGrav && randomNum4 == 9) {
                                            randomNum4 = 10;
                                        }
                                        while (metaGame && ((randomNum3 == 4) || (randomNum3 == 5) || (randomNum4 == 4) || (randomNum4 == 5))) {
                                            randomNum3 = Math.floor(Math.random() * 10);
                                            randomNum4 = Math.floor(Math.random() * 10);
                                            while ((randomNum3 == 2 && randomNum4 == 3) || (randomNum3 == 3 && randomNum4 == 2) || (randomNum3 == 6 && randomNum4 == 7) || (randomNum3 == 7 && randomNum4 == 6)) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 6 && randomNum3 == 3) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 6 && randomNum4 == 3) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 6 && randomNum3 == 3) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 6 && randomNum4 == 3) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 7 && randomNum3 == 2) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum1 == 7 && randomNum4 == 2) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 7 && randomNum3 == 2) {
                                                randomNum3 = Math.floor(Math.random() * 10);
                                            }
                                            while (randomNum2 == 7 && randomNum4 == 2) {
                                                randomNum4 = Math.floor(Math.random() * 10);
                                            }
                                            if (antiGrav && randomNum3 == 9) {
                                                randomNum3 = 10;
                                            }
                                            if (antiGrav && randomNum4 == 9) {
                                                randomNum4 = 10;
                                            }
                                        }
                                        spawnObstacle(randomNum3);
                                        spawnObstacle(randomNum4);
                                    }, 3000);
                                }, 1500);
                            }
                        }, 3000);
                    }
                }, 3000);
            }
            function drawMouse() {
            	ctx.fillStyle = "white";
                ctx.fillRect(mouseX - 2, mouseY - 6, 4, 12);
                ctx.fillRect(mouseX - 6, mouseY - 2, 12, 4);
                ctx.fillStyle = "black";
                ctx.fillRect(mouseX - 1, mouseY - 5, 2, 10);
                ctx.fillRect(mouseX - 5, mouseY - 1, 10, 2);
            }
            function blackOutManager() {
                if (blackOut) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(0, 0, mouseX - 250, 800);
                    ctx.fillRect(0, mouseY + 250, 800, 800);
                    ctx.fillRect(mouseX + 250, 0, 800, 800);
                    ctx.fillRect(0, 0, 800, mouseY - 250);
                }
            }
            function metaGameManager() {
                var temp;
                var cutoff;
                if (metaGame) {
                    if (!metaGameStarted) {
                        metaGameStarted = true;
                        metaLoop1 = setInterval(function() {
                            metaObstacle[Math.floor(Math.random() * 2) + 1] = -35;
                        }, 3000);
                        setTimeout(function() {
                            metaLoop2 = setInterval(function() {
                                metaObstacle[Math.floor(Math.random() * 2) + 3] = -35;
                            }, 3000);
                        }, 1500);
                    }
                    ctx.fillStyle = "white";
                    ctx.fillRect(x - 25, y - 25, 50, 50);
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(x - 25, y - 25, 50, 50);
                    if (keyDown[39]) {
                        metaPos = 1;
                    } else if (keyDown[37]) {
                        metaPos = 2;
                    } else
                        metaPos = 0;
                    ctx.fillStyle = "blue";
                    if (metaPos == 0)
                        ctx.fillRect(x - 10, y + 15, 20, 10);
                    if (metaPos == 1)
                        ctx.fillRect(x, y + 15, 20, 10);
                    if (metaPos == 2)
                        ctx.fillRect(x - 20, y + 15, 20, 10);
                    if (metaObstacle[1] >= -35) {
                        ctx.fillStyle = "red";
                        temp = metaObstacle[1];
                        if (metaObstacle[1] <= -25) {
                            cutoff = 10 - (-25 - metaObstacle[1]);
                            metaObstacle[1] = -25;
                        } else if (metaObstacle[1] >= 15) {
                            cutoff = (25 - metaObstacle[1]);
                        } else
                            cutoff = 10;
                        ctx.fillRect(x - 20, y + metaObstacle[1], 20, cutoff);
                        metaObstacle[1] = temp;
                        metaObstacle[1] += 1;
                        if (metaObstacle[1] > 25)
                            metaObstacle[1] = -50;
                        if (metaObstacle[1] > 5 && metaPos != 1) {
                            gameOver = true;
                        }
                    }
                    if (metaObstacle[4] >= -35) {
                        ctx.fillStyle = "red";
                        temp = metaObstacle[4];
                        if (metaObstacle[4] <= -25) {
                            cutoff = 10 - (-25 - metaObstacle[4]);
                            metaObstacle[4] = -25;
                        } else if (metaObstacle[4] >= 15) {
                            cutoff = (25 - metaObstacle[4]);
                        } else
                            cutoff = 10;
                        ctx.fillRect(x - 20, y + metaObstacle[4], 20, cutoff);
                        metaObstacle[4] = temp;
                        metaObstacle[4] += 1;
                        if (metaObstacle[4] > 25)
                            metaObstacle[4] = -50;
                        if (metaObstacle[4] > 5 && metaPos != 1) {
                            gameOver = true;
                        }
                    }
                    if (metaObstacle[3] >= -35) {
                        ctx.fillStyle = "red";
                        temp = metaObstacle[3];
                        if (metaObstacle[3] <= -25) {
                            cutoff = 10 - (-25 - metaObstacle[3]);
                            metaObstacle[3] = -25;
                        } else if (metaObstacle[3] >= 15) {
                            cutoff = (25 - metaObstacle[3]);
                        } else
                            cutoff = 10;
                        ctx.fillRect(x, y + metaObstacle[3], 20, cutoff);
                        metaObstacle[3] = temp;
                        metaObstacle[3] += 1;
                        if (metaObstacle[3] > 25)
                            metaObstacle[3] = -50;
                        if (metaObstacle[3] > 5 && metaPos != 2) {
                            gameOver = true;
                        }
                    }
                    if (metaObstacle[2] >= -35) {
                        ctx.fillStyle = "red";
                        temp = metaObstacle[2];
                        if (metaObstacle[2] <= -25) {
                            cutoff = 10 - (-25 - metaObstacle[2]);
                            metaObstacle[2] = -25;
                        } else if (metaObstacle[2] >= 15) {
                            cutoff = (25 - metaObstacle[2]);
                        } else
                            cutoff = 10;
                        ctx.fillRect(x, y + metaObstacle[2], 20, cutoff);
                        metaObstacle[2] = temp;
                        metaObstacle[2] += 1;
                        if (metaObstacle[2] > 25)
                            metaObstacle[2] = -50;
                        if (metaObstacle[2] > 5 && metaPos != 2) {
                            gameOver = true;
                        }
                    }
                } else {
                    metaGameStarted = false;
                    clearInterval(metaLoop1);
                    clearInterval(metaLoop2);
                }
            }
            function phaseManager() {
                //if (phaseShift) {
                //    if (!phaseShiftStarted) {
                 //       phaseShiftStarted = true;
                 //       phaseLoop = setInterval(function() {
                 //           if (phase == 1) {
                 //               phase = 2;
                 //           } else if (phase == 2) {
                 //               phase = 1;
                 //           }
                 //       }, 1000);
                 //   }
                //} else {
                  //  phaseShiftStarted = false;
                   // clearInterval(phaseLoop);
		   // phase = 1;
              //  }
		if(phaseShift){
		    if(portalDirection[1] || portalDirection[2] || portalDirection[3] || portalDirection[4]){
			    if(!phaseShiftStarted){
			    	phaseShiftStarted = true;
			    	if(phase == 1){
					phase = 2;
				} else phase = 1;
			    	
			    }
		    } else phaseShiftStarted = false;
		}
            }
		function bossPhaseManager(){
			var stage = 1;
			var tempRand;
			var tempRand2;
			var tempRand3;
			antiGrav = false;
			blackOut = false;
			metaGame = false;
			phaseShift = false;
			impossible = false;
			if(stage >= 1){
				tempRand = Math.floor(Math.random() * 5) + 1;
				if(tempRand == 1){
					antiGrav = true;
				}
				if(tempRand == 2){
					blackOut = true;
				}
				if(tempRand == 3){
					metaGame = true;
				}
				if(tempRand == 4){
					phaseShift = true;
				}
				if(tempRand == 5){
					antiGrav = true;
				}
			}
			if(stage >= 2){
				tempRand2 = Math.floor(Math.random() * 5) + 1;
				while(tempRand2 == tempRand) {
					tempRand2 = Math.floor(Math.random() * 5) + 1;
				}
				if(tempRand2 == 1){
					antiGrav = true;
				}
				if(tempRand2 == 2){
					blackOut = true;
				}
				if(tempRand2 == 3){
					metaGame = true;
				}
				if(tempRand2 == 4){
					phaseShift = true;
				}
				if(tempRand2 == 5){
					antiGrav = true;
				}
			}
			if(stage >= 3){
				tempRand2 = Math.floor(Math.random() * 5) + 1;
				while((tempRand3 == tempRand) || (tempRand3 == tempRand2)) {
					tempRand3 = Math.floor(Math.random() * 5) + 1;
				}
				if(tempRand3 == 1){
					antiGrav = true;
				}
				if(tempRand3 == 2){
					blackOut = true;
				}
				if(tempRand3 == 3){
					metaGame = true;
				}
				if(tempRand3 == 4){
					phaseShift = true;
				}
				if(tempRand3 == 5){
					antiGrav = true;
				}
			}
			if(stage < 3){
				stage++;
			}
			setInterval(function(){
				antiGrav = false;
				blackOut = false;
				metaGame = false;
				phaseShift = false;
				impossible = false;
				if(stage >= 1){
					tempRand = Math.floor(Math.random() * 5) + 1;
					if(tempRand == 1){
						antiGrav = true;
					}
					if(tempRand == 2){
						blackOut = true;
					}
					if(tempRand == 3){
						metaGame = true;
					}
					if(tempRand == 4){
						phaseShift = true;
					}
					if(tempRand == 5){
						impossible = true;
					}
				}
				if(stage >= 2){
					tempRand2 = Math.floor(Math.random() * 5) + 1;
					while(tempRand2 == tempRand) {
						tempRand2 = Math.floor(Math.random() * 5) + 1;
					}
					if(tempRand2 == 1){
						antiGrav = true;
					}
					if(tempRand2 == 2){
						blackOut = true;
					}
					if(tempRand2 == 3){
						metaGame = true;
					}
					if(tempRand2 == 4){
						phaseShift = true;
					}
					if(tempRand2 == 5){
						impossible = true;
					}
				}
				if(stage >= 3){
					tempRand2 = Math.floor(Math.random() * 5) + 1;
					while((tempRand3 == tempRand) || (tempRand3 == tempRand2)) {
						tempRand3 = Math.floor(Math.random() * 5) + 1;
					}
					if(tempRand3 == 1){
						antiGrav = true;
					}
					if(tempRand3 == 2){
						blackOut = true;
					}
					if(tempRand3 == 3){
						metaGame = true;
					}
					if(tempRand3 == 4){
						phaseShift = true;
					}
					if(tempRand3 == 5){
						impossible = true;
					}
				}
				if(stage < 3){
					stage++;
				}
			}, 10000);
		}
		function bossManager()	{
			if(bossFight){
				if(!bossFightStarted){
					bossFightStarted = true;
					impossible = false;
					bossYVelocity = 5;
					bossPhaseManager();
				}
				bossY += bossYVelocity;
				if(bossY >= - 40){
					bossYVelocity = 0;
				}
				ctx.drawImage(bossImage, bossX - (bossImage.width / 2), bossY);
			} else bossFightStarted = false;
		}
	}
