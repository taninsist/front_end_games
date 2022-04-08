import { IViewer } from "../types";
import $ from "jquery"
import PageConfig from "./PageConfig";
import { Square } from "../Square";
import GameConfig from "../GameConfig";

export class SquarePageViewer implements IViewer {

  dom?: JQuery<HTMLElement> | undefined;

  private isRemove: boolean = false;

  show(): void {

    if (this.isRemove) {
      return;
    }

    if (!this.dom) {

      this.dom = $("<div>").css({
        position: "absolute",
        width: this.width + "px",
        height: this.height + "px",
      }).appendTo(this.container)
    }

    /**
     * 移动速度 = 加速度 * 时间
     * 
     * 距离 = 移动速度 * 时间
     *     
     */

    this.dom.css({
      left: this.square.point.x + "px",
      top: this.square.point.y + "px",
      background: "url(" + this.square.background + ")",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "98%"
    })

  }
  clear(): void {
    this.dom?.remove();
    this.isRemove = true;
  }

  constructor(
    private square: Square,
    private container: JQuery<HTMLElement>,
    private width: number,
    private height: number
  ) {

    this.show()
  }

}