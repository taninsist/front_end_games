import { Square } from "./Square";
import { TShape } from "./Tetris";
import { IPoint, Shape } from "./types";

export class SquareGroup {
	private _squares: ReadonlyArray<Square> = []; //方块对象数组

	get squares() {
		return this._squares;
	}

	/**
	 * 移动中心点
	 */
	set centerPoint(point: IPoint) {

		this._centerPoint = point

		this._setSquarePoints()

	}

	get centerPoint(): IPoint {
		return this._centerPoint;
	}

	get shape(): Shape {
		return this._shape;
	}

	/**
	 * 根据中心点坐标，以及形状(各方块的逻辑坐标的数组)，设置每一个方块的坐标
	 */
	private _setSquarePoints() {
		this._shape.forEach((p, i) => {
			this._squares[i].point = {
				x: this._centerPoint.x + p.x,
				y: this._centerPoint.y + p.y
			}
		})
	}

	constructor(
		private _shape: Shape,  //形状
		private _centerPoint: IPoint, //中心点
		private _color: string //颜色
	) {
		const arr: Square[] = [];
		this._shape.forEach(p => {
			const sq = new Square(this._centerPoint, this._color);
			sq.point = {
				x: this._centerPoint.x + p.x,
				y: this._centerPoint.y + p.y
			}
			arr.push(sq);
		})

		this._squares = arr;
	}

	/**
	 * 旋转方向是否为顺时针
	 */
	private _isClock = true;

	set isClock(v: boolean) {
		this._isClock = v;
	}

	get isClock() {
		return this._isClock;
	}

	//返回旋转之后的形状,中心点是不会动的。
	afterRotateShape(): Shape {
		if (this._isClock) {
			//顺时针
			return this._shape.map(p => {
				const newP: IPoint = {
					x: -p.y,
					y: p.x
				}
				return newP
			})
		} else {
			//逆时针
			return this._shape.map(p => {
				const newP: IPoint = {
					x: p.y,
					y: -p.x
				}
				return newP
			})
		}
	}

	//旋转,中心点是不会动的。
	rotate() {

		const newShape = this.afterRotateShape();
		// group.shape = newP;
		this._shape = newShape;


		this._setSquarePoints()
	}

}