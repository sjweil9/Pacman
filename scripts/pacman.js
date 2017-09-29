$(document).ready(function(){
    // array with world grid
    var world = [
        [2,2,2,2,2,2,2,2,2,2],
        [2,0,1,1,2,1,1,1,1,2],
        [2,1,0,1,2,1,1,1,1,2],
        [2,1,1,1,2,1,1,1,1,2],
        [2,1,1,1,2,1,1,0,1,2],
        [2,1,1,0,1,1,1,1,1,2],
        [2,1,1,1,1,1,1,1,1,2],
        [2,1,1,1,2,2,2,2,1,2],
        [2,1,1,1,4,1,2,1,3,2],
        [2,2,2,2,2,2,2,2,2,2]
    ]
    // object w pacman location
    var pacman = {
        x: 1,
        y: 1,
        score: 0,
        lives: 5,
    }
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
                else if (world[i][j] == 4) {
                    worldhtml += "<div class='ghost'></div>";
                }
            }
            worldhtml += "</div>";
        }
        $('#gamewrap').html(worldhtml);
    };
    // actually change pacman position
    function movePacman() {
        $('#pacman').css({
            left : pacman.x*40,
            top : pacman.y*40
        });

    }
    // set new scores
    function changeScore() {
        $('#score').text("Score: " + pacman.score);
    }

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
            // check if pacman hits a ghost - send back to start
        if (world[pacman.y][pacman.x] == 4) {
            $('#message').text("Ouch! You were killed by a ghost.")            
            $('#pacman').fadeOut(1000, function(){
                pacman.x = 1;
                pacman.y = 1;
                pacman.lives--;
                $('#lives').text('Lives: ' + pacman.lives);
                movePacman();                
                $('#pacman').fadeIn();
            });
        }
        movePacman();            
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

    // get shit started
    createWorld();
})