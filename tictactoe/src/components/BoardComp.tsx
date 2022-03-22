import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import "./BoardComp.css"
import React from "react";

interface IProps {
    chesses: ChessType[]
    onClick?: (index: number) => void
    isGameOver?: boolean //游戏是否结束
}

/**
 * 棋盘组件，包裹9个棋子组件
 * @param props 
 * @returns 
 */
const BoardComp: React.FC<IProps> = function (props: IProps) {

    const isGameOver = props.isGameOver!  //! 非空断言，可以去掉 undefined

    const list = props.chesses.map((type, i) => {
        return (
            <ChessComp key={i} type={type} onClick={() => {
                if (props.onClick && !isGameOver) {
                    props.onClick(i);
                }

            }} />
        )
    })

    return (
        <div className="board">
            {list}
        </div>
    )
}

//设置默认值
BoardComp.defaultProps = {
    isGameOver: false
}

/**
 * es6 导出变量规定要导出一个变量是要导出声明的，
 * 如
 * export let a = 1
 * 
 * 
 * 但如果要直接导出一个变量，就用大括号包裹
 * 如
 * let b = 2; export { b }  
 * 
 *  
 */
export let a = 1
export { BoardComp }

let b = 2; export { b }





