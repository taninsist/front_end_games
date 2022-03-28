import { Square } from "../Square";
import { IViewer } from "../types";
import PageConfig from "./PageConfig";


/**
 * 将一个方块显示在页面上
 */
export class SquareConsoleViewer implements IViewer {

    private dom?: JQuery<HTMLElement>

    shwo(): void {
        if (!this.dom) {
            this.dom = $("<div>").css({
                position: "absolute",
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: "1px solid lightgray"
            })
        }
    }
    remove(): void {
    }

    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ) {

    }

}