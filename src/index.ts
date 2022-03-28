import { Square } from "./core/Square"
import { IViewer } from "./core/types"

class SquareConsoleViewer implements IViewer {
    shwo(): void {
        console.log(this.square.point, this.square.color);

    }
    remove(): void {
    }

    constructor(private square: Square) {

    }

}

const sq = new Square({ x: 1, y: 1 }, "red")

sq.viewer = new SquareConsoleViewer(sq);
sq.viewer.shwo()

sq.point = {
    x: 5,
    y: 1
}

export { }