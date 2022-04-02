import { Square } from "../Square";
import { IViewer } from "../types";
import PageConfig from "./PageConfig";
import $ from "jquery"

/**
 * 一个方块的显示类
 */
export class SquarePageViewer implements IViewer {

    private dom?: JQuery<HTMLElement>; //方法的Jquery 对象
    private isRemove: boolean = false;  //是否已经移除

    shwo(): void {
        //TODO 为什么要标记`是否移除`，标记后，一个`方块视图对象`移除后就不能再显示，如需在显示，就需要重新构建`视图对象`(new SquarePageViewer),而这行的话，就会重新创建dom对象，并添加到 document 中，而如果不标记，就不需要创建dom对象，因为已经有了，直接添加到 document 中就好

        if (this.isRemove) {
            return;
        }

        if (!this.dom) {
            this.dom = $("<div>").css({
                position: "absolute",
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: "1px solid lightgray",
                boxSizeing: "border-box"
            }).appendTo(this.container);
        }

        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width + "px",
            top: this.square.point.y * PageConfig.SquareSize.height + "px",
            background: this.square.color
        })

    }

    remove(): void {
        //移除的是界面的显示，但dom对象还是在
        if (this.dom && !this.isRemove) {
            this.dom.remove()

            this.isRemove = true
        }
    }

    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ) {

    }

}