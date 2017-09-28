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
        [2,1,1,1,1,1,2,1,1,2],
        [2,2,2,2,2,2,2,2,2,2]
    ]
    // object w pacman location
    var pacman = {
        x: 1,
        y: 1,
        score: 0
    }
    // redraws the game board
    function createWorld(){
        var worldhtml = "";        
        for (var i = 0; i < world.length; i++) {
            var divhtml = "<div class='row' id='" + i + "'>";
            worldhtml += divhtml;
            for (var j = 0; j < world[i].length; j++) {
                if (world[i][j] == 2) {
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
        movePacman();
        if (world[pacman.y][pacman.x] == 1) {
            world[pacman.y][pacman.x] = 0;
            pacman.score += 50;
            changeScore();
            createWorld();
        }
    });

    // get shit started
    createWorld();
})