/**
 * 恐龙类
 */
import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { IPoint, ISpeed } from "./types";

export class Dinosaur extends Square {

  private _timer: number | undefined = undefined;
  private _g = 1200; //向下的速度，单位：像素/秒²
  private _maxY = GameConfig.PANEL_HEIGHT - GameConfig.DINOSAUR_SIZE - GameConfig.landSize.height;
  private _jumting = false;
  private _jumtsing = false;//第二次跳

  /**
   * 
   * @param duration 持续时间
   */
  move(duration: number) {
    super.move(duration)

    //根据加速度改变速度
    this.speed = {
      x: 0,
      y: this.speed.y + this._g * duration
    }

  }

  onMove(): void {
    if (this.point.y <= 0) {
      this.point = {
        x: this.point.x,
        y: 0
      }
    } else if (this.point.y > this._maxY) {
      //落地了
      this._jumting = false;
      this._jumtsing = false;
      this.point = {
        x: this.point.x,
        y: this._maxY
      }

      this.viewer.dom?.css({
        "transition": "none",
        transform: "rotate(0deg)",
      })

    }

    this.running(true);

  }


  /**
   * 跳
   * @returns 
   */
  jump() {

    // debugger
    if (this._jumting && this._jumtsing) {
      //已经 跳了两次
      return;
    }

    if (this._jumting && !this._jumtsing) {
      //已经 跳第一次,可以跳第二次
      this._jumtsing = true;

      this.viewer.dom?.css({
        "transition": "transform .3s"
      })

      this.viewer.dom?.attr("left")


      this.viewer.dom?.css({
        transform: "rotate(360deg)",
      })



    }


    this._jumting = true;

    this.speed = {
      x: 0,
      y: -450
    }
  }

  /**
   * 跑
   * @param gameStatus 游戏状态 
   */
  running(gameStatus: boolean) {
    if (gameStatus && !this._jumting) {
      this.background = GameConfig.dinosaurs[1]
    } else {
      this.background = GameConfig.dinosaurs[0]
    }
  }


  constructor(_point: IPoint, _background: string, _speed: ISpeed) {
    super(_point, _background, GameConfig.DINOSAUR_SIZE, GameConfig.DINOSAUR_SIZE, _speed);
  }



}