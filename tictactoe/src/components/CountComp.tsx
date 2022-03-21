import React from "react"

interface IProps {
    num: number
    onChange?: (n: number) => void
}

interface IState {
    msg: string
    description: string
}

//类组件
// export class CountComp extends React.Component<IProps> {

//     state: IState = {
//         msg: "",
//         description: ""
//     }
//     render() {
//         return (
//             <div>
//                 <button onClick={() => {
//                     if (this.props.onChange) {
//                         this.props.onChange(this.props.num - 1)
//                     }
//                 }}>-</button>
//                 <span>{this.props.num}</span>
//                 <button onClick={() => {
//                     if (this.props.onChange) {
//                         this.props.onChange(this.props.num + 1)
//                     }
//                 }}>+</button>
//             </div>
//         )
//     }
// }

//函数式组件
export const CountComp: React.FC<IProps> = function (props) {
    return (
        <div>
            <button onClick={() => {
                if (props.onChange) {
                    props.onChange(props.num - 1)
                }
            }}>-</button>
            <span>{props.num}</span>
            <button onClick={() => {
                if (props.onChange) {
                    props.onChange(props.num + 1)
                }
            }}>+</button>
        </div>
    )
}