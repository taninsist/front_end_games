import { Dinosaur } from "./Dinosaur";
import GameConfig from "./GameConfig";
import { GameStatus, GameViewer } from "./types";
import { SquarePageViewer } from "./viewer/SquarPageViewer";
import $ from "jquery"
import { Obstacle, ObstacleProducer } from "./Obstacle";


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
  private _dinosaur: Dinosaur;
  //障碍物创建者
  private _obstacleProducer: ObstacleProducer = new ObstacleProducer();
  //间隔
  private _interval: number = 24 / 1000;
  //得分
  private _score: number = 0;

  set timer(v: number | null) {
    if (v == null) {
      clearInterval(this._timer!);
      this._timer = null;
      this._obstacleProducer.stopProducer();
      this._gameStatus = GameStatus.pause;
      this._dinosaur.running(false)

    } else {
      this._timer = v;
    }
  }

  set score(v: number) {
    this._score = v;
    this._viewer.updateScore(this._score);

    const level = GameConfig.levels.filter(it => it.score <= v).pop()!;
    if (level.interval != this._interval) {

      this.timer = null;
      this._interval = level.interval;

      this.start()

    }


  }

  get score() {
    return this._score;
  }

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
    //改变游戏状态
    this._gameStatus = GameStatus.palying;
    //生产障碍物
    this._obstacleProducer.startProducer();

    this.timer = setInterval(() => {
      //移动恐龙
      this._dinosaur.move(16 / 1000);
      //移动障碍物
      this._obstacleProducer.obstacles.forEach(ob => {
        ob.move(this._interval * 3)
      })
      //游戏是否结束
      if (this.isGameOver()) {
        this.gameOver();
      }

    }, 20)

  }

  /**
   * 暂停游戏
   */
  pause() {
    this._gameStatus = GameStatus.pause;
    this.timer = null;

  }

  /**
   * 结束游戏
   */
  gameOver() {
    this.gameStatus = GameStatus.over;
    this.timer = null;
    alert("游戏结束,刷新页面重新开始");
  }

  /**
   * 判断两个矩形是否碰撞
   * @param rec1 
   * @param rec2 
   */
  isHit(rec1: Dinosaur, rec2: Obstacle) {
    if (!rec1 || !rec2) return;

    const centerX1 = rec1.point.x + rec1.width / 2;
    const centerY1 = rec1.point.y + rec1.height / 2;
    const centerX2 = rec2.point.x + rec2.width / 2;
    const centerY2 = rec2.point.y + rec2.height / 2;

    //两个中心点的 x 轴距离
    const disX = centerX1 - centerX2
    //两个中心点的y轴距离
    const disY = centerY1 - centerY2

    //两个中心点 水平方向 相切的距离
    const tangentX = (rec1.width + rec2.width) / 2
    //两个中心点 垂直方向 相切的距离
    const tangentY = (rec1.height + rec2.height) / 2

    if (Math.abs(disX) < tangentX - 10 && Math.abs(disY) < tangentY - 10) {
      //碰撞了
      return true
    } else if (this.isCross(rec1, rec2)) {
      //是否越过了
      this.score++;
      return false;
    } else {
      return false
    }
  }

  isCross(rec1: Dinosaur, rec2: Obstacle): boolean {
    let dinosaurLeft = rec1.point.x;
    let obstacleLeft = rec2.point.x;

    if (dinosaurLeft > obstacleLeft + rec2.width) {
      return true;
    } else {
      return false;
    }

  }

  //判断是否越过，即得分


  //游戏是否结束，判断恐龙是否碰到了障碍物
  isGameOver() {

    for (let i = 0; i < 3; i++) {

      const ob = this._obstacleProducer.obstacles[i];

      //判断龙和障碍物是否碰撞
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

    //恐龙类
    this._dinosaur = new Dinosaur({
      x: 30,
      y: GameConfig.PANEL_HEIGHT - GameConfig.DINOSAUR_SIZE - GameConfig.landSize.height,
    },
      GameConfig.dinosaurs[0],
      {
        x: 0,
        y: -200
      }
    );

    this._dinosaur.viewer = new SquarePageViewer(this._dinosaur, $("#container"), this._dinosaur.width, this._dinosaur.height)
    this._viewer.init(this);

  }

}


