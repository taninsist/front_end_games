import { SquareGroup } from "./SquareGroup";
import { IPoint, Shape } from "./types";
import { getRandom } from "./utils";
/**
 * 俄罗斯方块的生产者
 */

// 中心点以 `&` 表示
/**   $  
 *   $&$
 *    
 */
export class TShape extends SquareGroup {
    constructor(
        _centerPoint: IPoint,
        _color: string) {
        super([
            { x: 0, y: -1 },
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
        ], _centerPoint, _color);
    }

    //覆盖重写父级的 旋转方法

}

/**    
 *     $ 
 *   $&$
 */
export class LShape extends SquareGroup {
    constructor(
        _centerPoint: IPoint,
        _color: string) {
        super([
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
        ], _centerPoint, _color);
    }

}

/**    
 *   $   
 *   $&$
 */
export class LMirrorShape extends SquareGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 1, y: 0 },
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
        ], _centerPoint, _color)
    }
}

/**    
 *   $$   
 *  $& 
 */
export class SShape extends SquareGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 1, y: - 1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: -1, y: 0 },
        ], _centerPoint, _color)
    }

    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock;
    }
}

/**    
 *   $$   
 *    &$
 */
export class SMirrorShape extends SquareGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ], _centerPoint, _color)
    }

    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock;
    }
}


/**    
 *   $$   
 *   &$ 
 */
export class SquareShape extends SquareGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 0, y: -1 },
            { x: 1, y: -1 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
        ], _centerPoint, _color)
    }

    afterRotateShape(): Shape {
        return this.shape
    }

    // rotate() {

    // }

}

/**    
 *   $&$$ 
 */
export class LineShape extends SquareGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
        ], _centerPoint, _color)
    }

    rotate(): void {
        super.rotate()
        this.isClock = !this.isClock;
    }
}

export const shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape
]

export const colors = [
    "red",
    "green",
    "blue",
    "orange"
]


/**
 * 生产一个 形状
 * @param centerPoint 中心逻辑点
 * @returns 
 */
export function createTetris(centerPoint: IPoint): SquareGroup {
    let index = getRandom(0, shapes.length);
    const shape = shapes[index];
    index = getRandom(0, colors.length);

    const color = colors[index];

    return new shape(centerPoint, color);
}







