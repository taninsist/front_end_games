import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { IPoint, moveDirection, Shape } from "./types";

function isPoint(targetPoint: any): targetPoint is IPoint {
	if (targetPoint.x === undefined) {
		return false
	}
	return true
}

/**
 * 该类中提供一系列函数，根据游戏规则判断是否可以移动
 */
export class TetrisRule {

	/**
	 * 判断某个形状的方块，是否能够移动到目标位置
	 * @param shape 形状的逻辑点数组
	 * @param targetPoint 中心点要移到的目标位置
	 * @param exists 界面以存在的小方块数组
	 * @returns true false
	 */
	static canIMove(shape: Shape, targetPoint: IPoint, exists: Square[]): boolean {

		//假设形状已经移动到目标位置
		const targetSquarePoint: IPoint[] = shape.map(p => {
			return {
				x: p.x + targetPoint.x,
				y: p.y + targetPoint.y
			}
		})

		//判断有符合条件的，true false
		const result: Boolean = targetSquarePoint.some(p => {

			return p.x < 0 || p.x > GameConfig.panelSize.width - 1
				|| p.y < 0 || p.y > GameConfig.panelSize.height - 1
		})

		if (result) {
			return false
		}

		//要判断是否与已有的方块重叠
		if (targetSquarePoint.some(sq => exists.some(s => s.point.x === sq.x && s.point.y === sq.y))) {
			//有重叠，不能移动
			return false;
		}


		return true
	}

	/**
	 * 移动形状
	 * @param tetris 一个方块组 SquareGroup 对象
	 * @param targetPointOrDirection 中心点要移到的目标位置
	 * @returns 
	 */
	static move(tetris: SquareGroup, direction: moveDirection, exists: Square[]): boolean;
	static move(tetris: SquareGroup, targetPointOrDirection: IPoint, exists: Square[]): boolean;
	static move(tetris: SquareGroup, targetPointOrDirection: IPoint | moveDirection, exists: Square[]): boolean {

		if (isPoint(targetPointOrDirection)) {

			if (this.canIMove(tetris.shape, targetPointOrDirection, exists)) {
				tetris.centerPoint = targetPointOrDirection;

			} else {
				return false
			}
		} else {
			//移动的是方向
			let direction = targetPointOrDirection;

			let targetPoint: IPoint;

			if (direction === moveDirection.down) {
				targetPoint = {
					x: tetris.centerPoint.x,
					y: tetris.centerPoint.y + 1
				}
			} else if (direction === moveDirection.right) {
				targetPoint = {
					x: tetris.centerPoint.x + 1,
					y: tetris.centerPoint.y
				}
			} else {
				targetPoint = {
					x: tetris.centerPoint.x - 1,
					y: tetris.centerPoint.y
				}
			}
			return this.move(tetris, targetPoint, exists);

		}

		return true;
	}

	/**
	 * 移动到某各方向的最边缘
	 * @param tetris 形状对象
	 * @param direction  方向 right | left | down
	 */
	static moveDirect(tetris: SquareGroup, direction: moveDirection, exists: Square[]) {
		while (this.move(tetris, direction, exists)) {

		}
	}

	static rotate(tetris: SquareGroup, exists: Square[]): boolean {

		const newShape = tetris.afterRotateShape()
		if (this.canIMove(newShape, tetris.centerPoint, exists)) {
			tetris.rotate()
			return true
		} else {
			return false
		}
	}
	/**
		 * 获取指定行的方块
		 * @param exists 
		 * @param y 
		 * @returns 
		 */
	static getLineSquare(exists: Square[], y: number): Square[] {
		return exists.filter(sq => sq.point.y === y);
	}


	static deleteSquare(exists: Square[]): number {
		//1. 获取y坐标数组
		const ys = exists.map(sq => sq.point.y);
		//2. 获取最大和最小的y 坐标
		const maxY = Math.max(...ys);
		const minY = Math.min(...ys);
		//循环判断每一行是否可以消除
		let num = 0;
		for (let i = minY; i <= maxY; i++) {
			if (this.deleteLine(exists, i)) {
				num++
			};
		}

		return num
	}

	private static deleteLine(exists: Square[], y: number): boolean {
		const squares = exists.filter(sq => sq.point.y === y);
		// debugger
		if (squares.length === GameConfig.panelSize.width) {
			//这一行可以消除
			squares.forEach(sq => {
				//1. 从界面移除
				if (sq.viewer) {
					sq.viewer.remove()
				}

				//2. 删除数组中的
				const index = exists.indexOf(sq)
				exists.splice(index, 1)

			})

			//3. 剩下的，y坐标比当前y小的方块，y + 1 ,只运行一次
			const last = exists.filter(sq => sq.point.y < y);
			last.forEach(sq => {
				sq.point = {
					x: sq.point.x,
					y: sq.point.y + 1
				}
			})

			return true
		}


		return false;
	}



}