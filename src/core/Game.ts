import { Dinosaur } from "./Dinosaur";
import GameConfig from "./GameConfig";
import { GameStatus, GameViewer } from "./types";
import { SquarePageViewer } from "./viewer/SquarPageViewer";
import $ from "jquery"
import { Square } from "./Square";
import { createObstacle, Obstacle, ObstacleProducer } from "./Obstacle";


export class Game {
  //游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  //计时器
  private _timer: number | null = null;
  //当前游戏中，已保存的小方块
  private _exists: Obstacle[] = [];
  //可见障碍物最大数
  private _maxObstacle: number = 2
  //恐龙类
  private _dinosaur: Dinosaur = new Dinosaur({
    x: 20,
    y: GameConfig.PANEL_HEIGHT - GameConfig.DINOSAUR_SIZE - GameConfig.landSize.height,
  },
    GameConfig.dinosaurs[0],
    {
      x: 0,
      y: -200
    }
  );

  //障碍物创建者
  private _obstacleProducer: ObstacleProducer = new ObstacleProducer();

  //间隔
  private _interval: number = 16 / 1000;

  set gameStatus(v: GameStatus) {
    this._gameStatus = v;

  }

  get gameStatus() {
    return this._gameStatus
  }

  init() {

  }

  /**
   * 开始游戏
   */
  start() {
    if (this._gameStatus === GameStatus.palying) {
      return;
    }

    this._gameStatus = GameStatus.palying;
    this._obstacleProducer.startProducer();

    this._timer = setInterval(() => {

      //移动恐龙
      this._dinosaur.move(this._interval);

      //生成障碍物

      this._obstacleProducer.obstacles.forEach(ob => {
        ob.move(this._interval * 3)
      })

      if (this.isGameOver()) {
        console.log("over");

      }


    }, 20)

  }

  /**
   * 暂停游戏
   */
  pause() {
    this._gameStatus = GameStatus.pause;
    clearInterval(this._timer!);
    this._timer = null;
    //停止生产障碍物
    this._obstacleProducer.stopProducer()

  }

  /**
   * 判断两个矩形是否碰撞
   * @param rec1 
   * @param rec2 
   */
  isHit(rec1: Dinosaur, rec2: Obstacle) {

    const centerX1 = rec1.point.x + rec1.width / 2;
    const centerY1 = rec1.point.y + rec1.height / 2;
    const centerX2 = rec2.point.x + rec2.width / 2;
    const centerY2 = rec2.point.y + rec2.height / 2;

    const disX = Math.abs(centerX1 - centerX2)
    const disY = Math.abs(centerY1 - centerY2)
    if (disX < (rec1.width + rec2.width) / 2
      && disY < (rec1.height + rec2.height) / 2) {
      return true
    } else {
      return false;
    }


  }

  isGameOver() {

    console.log();
    let len = this._obstacleProducer.obstacles.length;


    for (let i = 0; i < 3; i++) {
      console.log(i);

      const ob = this._obstacleProducer.obstacles[i];

      if (this.isHit(this._dinosaur, ob)) {
        return true;
      }
      return false;

    }

  }

  //恐龙跳
  jumt() {
    this._dinosaur.jump();

  }

  constructor(private _viewer: GameViewer) {
    this._dinosaur.viewer = new SquarePageViewer(this._dinosaur, $("#container"), this._dinosaur.width, this._dinosaur.height)
    this._viewer.init(this);

  }

}
