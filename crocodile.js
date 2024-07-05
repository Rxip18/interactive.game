function Crocodile(level = 1) {
    this.x = 0;
    this.y = 0;
    this.baseSpeed = 1; // base speed for level 1
    this.level = level;
    this.speedMultiplier = 2; // multiplier to increase speed progressively
    this.xspeed = this.baseSpeed;
    this.yspeed = 0;
    this.acca = 0;
    this.tailLonger = [];

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.acca++;
            if (this.level === 2) {
                this.speedMultiplier += 0.1; // increase speed multiplier by 0.1 for each food eaten
            }
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        if (this.level === 2) {
            this.xspeed = x * this.baseSpeed * this.speedMultiplier;
            this.yspeed = y * this.baseSpeed * this.speedMultiplier;
        } else {
            this.xspeed = x * this.baseSpeed;
            this.yspeed = y * this.baseSpeed;
        }
    }

    this.eliminated = function() {
        for (var i = 0; i < this.tailLonger.length; i++) {
            var pos = this.tailLonger[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                console.log('Start again');
                this.acca = 0; // when the tail has reached 0 the game ends
                this.tailLonger = [];
                this.speedMultiplier = 1; // reset speed multiplier when the game restarts
                gameOver = true; // Set gameOver to true if the crocodile hits itself
            }
        }
    }

    this.update = function() {
        if (this.acca === this.tailLonger.length) {
            for (var i = 0; i < this.tailLonger.length - 1; i++) {
                this.tailLonger[i] = this.tailLonger[i + 1];
            }
        }
        this.tailLonger[this.acca - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function() {
        fill(0, 255, 0);
        stroke(0, 0, 255);
        strokeWeight(4);
        for (var i = 0; i < this.tailLonger.length; i++) {
            rect(this.tailLonger[i].x, this.tailLonger[i].y, scl, scl);
        }
        fill(0, 255, 0);
        rect(this.x, this.y, scl, scl);
    }
}

// Example usage
let crocLevel1 = new Crocodile(1); // Creates a crocodile with normal speed for level 1
let crocLevel2 = new Crocodile(2); // Creates a crocodile with increased speed for level 2
