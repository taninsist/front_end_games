import { Game } from "./Game"

/**
 * 方块的展示者
 */
export interface IViewer {
  /**
   * 展示控件到页面
   */
  show(): void
  /**
   * 重页面清除控件
   */
  clear(): void

  /**
   * dom对象
   */
  dom?: JQuery<HTMLElement>
}

/**
 * 方块的位置
 */
export interface IPoint {
  readonly x: number,
  readonly y: number
}

/**
 * 
 * 移动速度
 * x: x轴 横向速度，单位（像素/秒），正数是向右，负数向左
 * y: y轴 纵向速度，单位（像素/秒），正数是向下，负数向上
 * 
 */
export interface ISpeed {
  readonly x: number,
  readonly y: number
}

/**
 * 游戏状态
 */
export enum GameStatus {
  /**
   * 未开始
   */
  init,

  /**
   * 游戏中
   */
  palying,

  /**
   * 暂停中
   */
  pause,

  /**
   * 游戏结束
   */
  over
}

/**
 * 游戏的展示者，用于展示游戏
 */
export interface GameViewer {
  /**
   * 初始化游戏
   * @param game 游戏类 
   */
  init(game: Game): void

  /**
   * 更新分数
   * @param v 
   */
  updateScore(v: number): void
}
