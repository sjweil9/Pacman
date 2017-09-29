/* current bugs:
    pacman starting on top of coin doesnt eat it
    dynamic created ghosts move 2-3 times then disappear (but still exist)
*/

$(document).ready(function(){
    // initial score target and level
    var scoretarget = 1000;
    var level = 1;
    // array with world grid
    var world = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ];
    // create a random world
    function randomWorld(worldarray) {
        function getRnd(num) {
            return Math.floor(Math.random()*num);
        };
        for (var i = 0; i < worldarray.length; i++) {
            for (var j = 0; j < worldarray[i].length; j++) {
                if (i == 0 || i == worldarray.length-1 || j == 0 || j == worldarray[i].length-1) {
                    worldarray[i][j] = 2;
                }
                else {
                    if (worldarray[i-1][j] != 2 && worldarray[i+1][j] != 2 &&worldarray[i][j-1] != 2 &&worldarray[i][j+1] != 2) {
                        worldarray[i][j] = getRnd(3);                        
                    }
                    else {
                        worldarray[i][j] = getRnd(2);
                    }
                }
            }
        }
        return worldarray;
    };

    // object w pacman location
    var pacman = {
        x: 1,
        y: 1,
        score: 0,
        lives: 5,
    };
    // object w ghost location
    var ghost = [{
        x: 6,
        y: 3
    }, {
        x: 4,
        y: 4
    }];
    // create new ghosts
    function addGhost() {
        ghost.length++;
        ghost[ghost.length-1] = {
            x: 6,
            y: 3
        };
        var ghostdiv = "<div class='ghost' id='" + ghost.length + "'></div>";
        $('body').append(ghostdiv);
        displayGhost();
    };
    // redraws the game board
    function createWorld(){
        var worldhtml = "";        
        for (var i = 0; i < world.length; i++) {
            var divhtml = "<div class='row' id='" + i + "'>";
            worldhtml += divhtml;
            for (var j = 0; j < world[i].length; j++) {
                if (world[i][j] == 3) {
                    worldhtml += "<div class='cherry'></div>"
                }
                else if (world[i][j] == 2) {
                    worldhtml += "<div class='brick'></div>";
                }
                else if (world[i][j] == 1) {
                    worldhtml += "<div class='coin'></div>";
                }
                else if (world[i][j] == 0) {
                    worldhtml += "<div class='empty'></div>";
                }
            }
            worldhtml += "</div>";
        }
        $('#gamewrap').html(worldhtml);
    };
    // check if pacman died
    function checkDeath(){
        for (var i = 0; i < ghost.length; i++) {
            if (pacman.x == ghost[i].x && pacman.y == ghost[i].y) {
                $('#message').text("Ouch! You were killed by a ghost.")            
                $('#pacman').fadeOut(200, function(){
                    pacman.x = 1;
                    pacman.y = 1;
                    pacman.lives--;
                    $('#lives').text('Lives: ' + pacman.lives);                
                    if (pacman.lives <= 0) {
                        $('#message').text("Sorry. You are out of lives.");
                        $('#pacman').hide();
                        pacman.x = 0;
                        pacman.y = 0;
                    }
                    else {
                        movePacman();                
                        $('#pacman').fadeIn();
                    }
                });
            }
        }       
    };
    // actually change pacman position
    function movePacman() {
        $('#pacman').css({
            left : pacman.x*40,
            top : pacman.y*40
        });
    };
    // change ghost position
    function displayGhost() {
        for (var i = 0; i < ghost.length; i++) {
            var ghostnum = 'div#' + (i+1) + '.ghost';
            $(ghostnum).css({
                left : ghost[i].x*40,
                top : ghost[i].y*40
            });
        }
    };
    // set new scores
    function changeScore() {
        $('#score').text("Score: " + pacman.score);
        checkScore();
    };
    // determine if score enough for next level
    function checkScore() {
        if (pacman.score >= scoretarget) {
            $('#message').text("Congratulations! You beat the level. Time for a new one.");
            $('#pacman').fadeOut(200, function() {
                scoretarget += 1000*level;
                level++;
                $('#level').text('Level: ' + level);
                pacman.x = 1;
                pacman.y = 1;
                $('#gamewrap').fadeOut(200, function() {
                    randomWorld(world);
                    createWorld();
                    movePacman();
                    $('#gamewrap').fadeIn(200);
                    $('#pacman').fadeIn(200);
                    addGhost();
                });
            });
        }
    };
    // determine direction to send pacman, and call function to move him
    $(document).keydown(function(e){
        if (e.which == 37) {
            if (world[pacman.y][pacman.x-1] != 2) {
                pacman.x -= 1;
                $('div#pacman').css('background-image', 'url(images/pacmanleft.png)');                
            }
        }
        else if (e.which == 39) {
            if (world[pacman.y][pacman.x+1] != 2) {
                pacman.x += 1;
                $('div#pacman').css('background-image', 'url(images/pacman.png)');
            }
        }
        else if (e.which == 38) {
            if (world[pacman.y-1][pacman.x] != 2) {
                pacman.y -= 1;
                $('div#pacman').css('background-image', 'url(images/pacmanup.png)');
            }
        }
        else if (e.which == 40) {
            if (world[pacman.y+1][pacman.x] != 2) {
                pacman.y += 1;
                $('div#pacman').css('background-image', 'url(images/pacmandown.png)');
            }
        }
        movePacman();                    
            // check if pacman hits a ghost - send back to start
        checkDeath();   
            // check if pacman scored!
        if (world[pacman.y][pacman.x] == 1) {
            world[pacman.y][pacman.x] = 0;
            pacman.score += 50;
            changeScore();
            createWorld();
        }
        else if (world[pacman.y][pacman.x] == 3) {
            world[pacman.y][pacman.x] = 0;
            pacman.score += 250;
            changeScore();
            createWorld();
        }
    });

    // move the ghost around
    var intervalId;

    function ghostInterval() {
        intervalId = setInterval(moveGhost, 500);
    };

    function moveGhost() {
        for (var i = 0; i < ghost.length; i++) {
            var randomDir = Math.floor(Math.random()*4);
            if (randomDir == 0 && world[ghost[i].y][ghost[i].x+1] != 2) {
                ghost[i].x += 1;
            }
            else if (randomDir == 1 && world[ghost[i].y][ghost[i].x-1] != 2) {
                ghost[i].x -= 1;
            }
            else if (randomDir == 2 && world[ghost[i].y+1][ghost[i].x] != 2) {
                ghost[i].y += 1;
            }
            else if (randomDir == 3 && world[ghost[i].y-1][ghost[i].x] != 2) {
                ghost[i].y -= 1;
            }
        }
        displayGhost();
        checkDeath();
    };
    // make cherries randomly appear
    // first set interval
    var cherryIntervalId;
    
    function cherryInterval() {
        cherryIntervalId = setInterval(createCherry, 10000);
    };

    // define function that makes cherry appear

    function createCherry() {
        var ranx = Math.floor(Math.random()*(world[0].length));
        var rany = Math.floor(Math.random()*(world.length));
        if (world[rany][ranx] != 2) {
            world[rany][ranx] = 3;
            createWorld();
        }
        else {
            createCherry();
        }
    };

    // get shit started
    randomWorld(world);
    createWorld();
    ghostInterval();
    cherryInterval();
});