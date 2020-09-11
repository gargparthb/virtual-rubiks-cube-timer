class Cubie {
    constructor(x, y, z, colors, idx, highlight) {
        // this is the location relative to the orgin (0, 0, 0)
        this.x = x;
        this.y = y;
        this.z = z;
        // color order is: up, down, front, back, left, right
        this.colors = colors;

        // debugging tools
        this.idx = idx;
        this.highlight = highlight;
    }

    draw() {
        // don't draw on the invisable layer on even ordered
        if (!this.inInvisibleLayer()) {

            push();
            // even cubes need to be offset to account of invisable layer
            translate(
                translateOffset(this.x),
                translateOffset(this.y),
                translateOffset(this.z)
            );

            if (spdMode) {
                noFill();
            } else {
                fill(0);
            }
            noStroke();

            // the cube for each qb
            box(len);

            // draws each sticker induvidually

            // TOP
            this.drawSticker('y', -1, this.colors[0]);

            // BOTTOM
            this.drawSticker('y', 1, this.colors[1]);

            // FRONT
            this.drawSticker('z', 1, this.colors[2]);

            // BACK
            this.drawSticker('z', -1, this.colors[3]);

            // LEFT
            this.drawSticker('x', -1, this.colors[4]);

            // RIGHT
            this.drawSticker('x', 1, this.colors[5]);

            pop();
        }
    }

    drawSticker(axis, coord, color) {
        if (this[axis] == coord) {
            // drawing vars
            let radius = len / 2 + 1
            let size = len - stickerOffset;

            // blank translation vecotr
            let t = createVector(0, 0, 0);

            push();

            // adjusts and executes the translation
            t[axis] = coord * radius;
            translate(t);

            fill(color);

            // does the rotation 
            if (axis == 'x') {
                rotateY(PI / 2);
            } else if (axis == 'y') {
                rotateX(PI / 2);
            }

            // draws
            plane(size, size, 2);

            // resets the matrix
            pop();
        }
    }

    // deMorgans law
    inInvisibleLayer() {
        return order % 2 == 0 && [this.x, this.y, this.z].includes(0);
    }

    // takes the move and rotates the cubie's colors
    updateColors(axis, dir) {
        // just for readabiliy
        const up = this.colors[0];
        const down = this.colors[1];
        const front = this.colors[2];
        const back = this.colors[3];
        const left = this.colors[4];
        const right = this.colors[5];

        // remaps the colors depending on desired move
        switch (axis) {
            case 'x':
                if (dir == 1) {
                    this.colors = [front, back, down, up, left, right];
                } else {
                    this.colors = [back, front, up, down, left, right];
                }
                break;
            case 'y':
                if (dir == 1) {
                    this.colors = [up, down, right, left, front, back];
                } else {
                    this.colors = [up, down, left, right, back, front];
                }
                break;
            case 'z':
                if (dir == 1) {
                    this.colors = [left, right, front, back, down, up];
                } else {
                    this.colors = [right, left, front, back, up, down];
                }
                break;
        }
    }

    // given a move, check wheather this qb is animating
    inAnimation(move) {
        switch (move.axis) {
            case 'x':
                return move.layers.includes(this.x);
                break;
            case 'y':
                return move.layers.includes(this.y);
                break;
            case 'z':
                return move.layers.includes(this.z);
                break;
        }
    }
}

// squeezes things into the invisable layer
function translateOffset(coord) {
    if (order % 2 == 0) {
        if (coord > 0) {
            return (coord - 0.5) * len;
        } else {
            return (coord + 0.5) * len;
        }
    } else {
        return coord * len;
    }
}