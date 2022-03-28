import { IPoint, IViewer } from "./types"

/**
 * 方块类
 */
export class Square {

    //属性：显示者
    private _viewer?: IViewer

    get viewer() {
        return this._viewer;
    }

    set viewer(v) {
        this._viewer = v;
    }

    set point(val) {
        this._point = val
        //完成显示
        if (this._viewer) {
            this._viewer.shwo()
        }
    }

    get point() {
        return this._point;
    }

    get color() {
        return this._color;
    }

    constructor(private _point: IPoint, private _color: string) {

    }

}



