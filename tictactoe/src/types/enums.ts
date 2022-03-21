export enum ChessType {
    none,
    red,
    black
}

export enum NextChess {
    red = ChessType.red,   //这样就可以保证两个的关联
    black = ChessType.black
}

/**
 * 游戏状态
 */
export enum GameStatus {
    /**
     * 游戏中
     */
    gaming,

    /**
     * 红方胜利
     */
    redWin,

    /**
     * 黑方胜利
     */
    blackWin,

    /**
     * 平局
     */
    draw
}