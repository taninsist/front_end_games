import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface IPoint {
    readonly x: number
    readonly y: number
}

export interface IViewer {
    /**
     * 显示
     */
    shwo(): void
    /**
     * 移除
     */
    remove(): void
}

/**
 * 形状,是一个IPoint 数组，方块的逻辑点数组
 */
export type Shape = IPoint[];

export enum moveDirection {
    right,
    left,
    down
};

export enum GameStatus {
    /**
     * 未开始
     */
    init,
    /**
     * 进行中
     */
    playing,
    /**
     * 暂停
     */
    pause,
    /**
     * 游戏结束
     */
    over
}

export interface GameViewer {
    /**
     * 显示下一个
     * @param tetris `下一个` 方块对象 
     */
    showNext(tetris: SquareGroup): void

    /**
     * 视图：值的是页面显示位置
     * 把 `下一个`方块的视图位置，切换到 `当前`方块的视图出生位置
     * @param tetris `下一个`方块
     */
    switch(tetris: SquareGroup): void

    init(game: Game): void;

    showScore(num: number): void

}