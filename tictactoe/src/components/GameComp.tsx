import React from "react"
import { ChessType, GameStatus } from "../types/enums"
import { BoardComp } from "./BoardComp"
import { GameStatusComp } from "./GameStatusComp"

interface IStats {
    cheeses: ChessType[]
    gameStatus: GameStatus
    nextChess: ChessType.red | ChessType.black
}

/**
 * 游戏组件，控制整个游戏的进程
 */
export class Game extends React.Component<{}, IStats> {

    state: IStats = {
        cheeses: [],
        gameStatus: GameStatus.gaming,
        nextChess: ChessType.black
    }

    /**
     * 当组建完成页面的嵌入时 触发
     */
    componentDidMount() {
        this.init()
    }

    /**
     * 初始化数据
     */
    init() {
        const arr: ChessType[] = []
        for (let i = 0; i < 9; i++) {
            arr.push(ChessType.none)
        }

        this.setState({
            cheeses: arr,
            gameStatus: GameStatus.gaming,
            nextChess: ChessType.black
        })

    }

    /**
     * 处理棋子的点击事件
     * 如果该函数运行，说明：
     * 1. 游戏没有结束
     * 2. 点击的位置没有棋子
     * @param i 棋的下标
     */
    handleChessClick(i: number) {
        const cheeses: ChessType[] = [...this.state.cheeses];
        cheeses[i] = this.state.nextChess;

        this.setState(prevState => ({ //异步方法
            cheeses,
            nextChess: prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red,
            gameStatus: this.getStatus(cheeses, i)
        }))

    }

    /**
     * 获取游戏的状态
     * @param chesses 
     * @param index  落字的位置，索引值
     */
    getStatus(chesses: ChessType[], index: number): GameStatus {
        //1. 判断是否有一方获得胜利
        const horMinIndex = Math.floor(index / 3) * 3 //水平最小棋子的位置
        const verMinIndex = index % 3;

        if (
            //判断水平方向是否成立 赢
            (chesses[horMinIndex] === chesses[horMinIndex + 1] && chesses[horMinIndex] === chesses[horMinIndex + 2])
            ////判断垂直方向是否成立 赢
            || (chesses[verMinIndex] === chesses[verMinIndex + 3] && chesses[verMinIndex] === chesses[verMinIndex + 6])
            //判断斜线方向,1 - 8
            || (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none)
            //判断斜线方向,2 - 6
            || (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)
        ) {
            //这里的 nextChess 是这当前这步棋的棋方（red | black） 
            if (this.state.nextChess === ChessType.black) {
                //黑方获胜

                return GameStatus.blackWin
            } else {
                //红方获胜
                return GameStatus.redWin
            }
        }
        //2. 判断是否平局
        if (chesses.indexOf(ChessType.none) === -1) {
            return GameStatus.draw //平局
        }
        //游戏正在运行

        return GameStatus.gaming;
    }

    render() {
        return (
            <div className="game" style={{ "textAlign": "center" }}>
                <h1>井字棋游戏</h1>
                <GameStatusComp status={this.state.gameStatus} next={this.state.nextChess} />
                <BoardComp
                    chesses={this.state.cheeses}
                    isGameOver={this.state.gameStatus !== GameStatus.gaming}
                    onClick={this.handleChessClick.bind(this)}
                />
                <button
                    style={{
                        margin: "0 auto",
                        display: "block"
                    }}
                    className="restart"
                    onClick={() => this.init()}
                >重新开始</button>
            </div>
        )
    }

}