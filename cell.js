//Objects that the player targets
class Cell {
    constructor(type, surface_proteins) {
        this.type = type;
        this.surface_proteins = surface_proteins;

        this.current_protein_idx = 0;
    }

    //incrementally rotate the cell
    rotate(clockwise) {
        if (clockwise) {
            ++this.current_protein_idx
        } else {
            --this.current_protein_idx
        }
    }

    //work out how long a virus will take to attach by a particular protein combo

}