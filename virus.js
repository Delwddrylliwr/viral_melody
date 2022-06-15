// The main player character, travels through the environment and interacts with cells and proteins based on its own proteins, which can mutate
class Virus {
    constructor(proteins, size, position, velocity) {
        //@TODO check inputs for type and size
        this.proteins = proteins;
        this.protein = protein[0];
        this.size = size;
        this.position = position;
        this.velocity = velocity;
    }

    //Modify the velocity vector to reflect an angular change
    turn(clockwise, degrees) {
        if (clockwise) {
            angle = -degrees
        }
        cos = Math.cos(-degrees);
        sin = Math.sin(-degrees);
        x = this.velocity[0] * cos - this.velocity[1] * sin;
        y = this.velocity[0] * sin + this.velocity[1] * cos;
    }

    //Replace a protein
    mutate(index, new_protein) {
        this.protein[index] = new_protein;
    }

    //Infect a cell, generating lots of new copies
    //Try to attach for long enough to penetrate
    attach(cell) {
        //establish the protein on the cell that will be the point of attachment
        attachment_protein = cell.get_current_protein()

        //work out how long it will take to attach by this protein
        attachment_time = cell.get_attachment_time(this.protein, attachment_protein)

        //start a timer before attachment will complete
        setTimeout(this.infect, attachment_time)
    }

    //Penetrate and begin infection: uncoat, replicate, assemnble and release
    infect(cell) {
        //Create copies of this virus
        replicants = cell.replicate(this)

        //Destroy the host cell
        cell.release()

        //Pass control to one of the replicants
        game.player_virus = replicants[0]
    }

    //@TODO draw an arrow to represent the virus, with the current note in the middle
    //Draw the virus on the canvas
    render() {
        let x = this._getTipPos().x;
        let y = this._getTipPos().y

        game.ctx.beginPath();
        let opposite = this.heading <= 180 ? this.heading + 180 : this.heading - 180;
        let startAngle = Utils.toRadians(opposite - 22.5);
        let endAngle = Utils.toRadians(opposite + 22.5);
        game.ctx.arc(x, y, this.size, startAngle, endAngle);
        game.ctx.lineTo(x, y);
        game.ctx.closePath();
        game.ctx.lineWidth = 2;
        game.ctx.strokeStyle = '#77ffff';
        game.ctx.stroke();
    }

    _getTipPos() {
        return {
            x: this.position[0] + Utils.dXFromAngleAndHypot(this.heading, this.size / 2),
            y: this.position[1] + Utils.dYFromAngleAndHypot(this.heading, this.size / 2)
        };
    }
}