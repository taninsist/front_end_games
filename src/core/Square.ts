import { IPoint, ISpeed, IViewer } from "./types";

export abstract class Square {

  private _viewer?: IViewer
  abstract onMove(): void;

  get viewer() {
    return this._viewer as IViewer;
  }

  set viewer(v: IViewer) {
    this._viewer = v;
  }

  set background(v) {
    this._background = v;

    this._viewer?.show()
  }

  get background() {
    return this._background;
  }

  set point(v: IPoint) {
    this._point = v;

    this._viewer?.show()
  }

  get point() {
    return this._point;
  }

  set width(v: number) {
    this._width = v;
  }

  get width() {
    return this._width;
  }

  set height(v: number) {
    this._width = this._height;
  }

  get height() {
    return this._height
  }

  get speed() {
    return this._speed;
  }

  set speed(v: ISpeed) {
    this._speed = v;
  }

  move(duration: number) {
    const xDis = this.speed.x * duration;
    const yDis = this.speed.y * duration;
    this.point = {
      x: this.point.x + xDis,
      y: this.point.y + yDis
    }

    this.onMove()

  }

  /**
   * 
   * @param _point 位置 x,y
   * @param _background 背景
   * @param _size 大小
   * @param _speed 移动速度
   */
  constructor(
    private _point: IPoint,
    private _background: string,
    private _width: number,
    private _height: number,
    private _speed: ISpeed
  ) {

  }



}


