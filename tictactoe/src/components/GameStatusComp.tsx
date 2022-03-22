import { ChessType, GameStatus } from "../types/enums"
import "./GameStatusComp.css"


interface IProps {
    status: GameStatus,
    next: ChessType.red | ChessType.black
}

/**
 * 
 * @param props 游戏状态，显示游戏的进程
 * @returns 
 */
export function GameStatusComp(props: IProps) {

    let content: JSX.Element;
    if (props.status === GameStatus.gaming) {
        if (props.next === ChessType.red) {
            content = <div className="next red">红方落子</div>
        } else {
            content = <div className="next black">黑方落子</div>
        }
    } else {
        if (props.status === GameStatus.redWin) {
            content = <div className="win red">红方胜利</div>
        } else if (props.status === GameStatus.blackWin) {
            content = <div className="win black">黑方胜利</div>
        } else {
            content = <div className="win draw">平局</div>
        }
    }

    return (
        <div className="status">
            {content}
        </div>
    )
}