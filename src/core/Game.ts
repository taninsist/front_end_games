import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTetris, TShape } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GameStatus, GameViewer, moveDirection } from "./types";

const nextOrgin = {
  x: 0,
  y: 0
}

export class Game {
  //游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  //当前玩家操作的方块
  private _curTetris?: SquareGroup;
  //下一个方块是啥
  private _nextTetris: SquareGroup
  //计时器
  private _timer?: number
  //自动下落时间
  private _duration: number;
  //当前游戏中，已保存的小方块
  private _exists: Square[] = [];
  //当前获取的积分
  private _score: number = 0;

  get gameStatus() {
    return this._gameStatus;
  }

  set score(v: number) {
    this._score = v
    this._viewer.showScore(this._score);
    console.log(GameConfig.levels.filter(it => it.score < v));

    const level = GameConfig.levels.filter(it => it.score <= v).pop()!
    if (level.duration !== this._duration) {
      clearInterval(this._timer);
      this._timer = undefined;
      this._duration = level.duration;
      this.autoDrop()
    }


  }
  get score() {
    return this._score;
  }

  constructor(private _viewer: GameViewer) {
    this._duration = GameConfig.levels[0].duration;
    this._nextTetris = createTetris(nextOrgin); //没有实际含义的代码，只是让ts不报错
    this.createNext()
    this._viewer.init(this);
  }

  /**
   * 创建下一个方块
   */
  private createNext() {
    this._nextTetris = createTetris(nextOrgin)
    this.resetCenterPoint(GameConfig.NextPanelSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }

  init() {
    this._exists.forEach(sq => {
      sq.viewer?.remove();
    })
    this._exists = [];
    this._curTetris = undefined;
  }

  /**
   * 游戏开始
   */
  start() {
    //游戏状态改变
    if (this._gameStatus === GameStatus.playing) {
      return
    } else if (this._gameStatus === GameStatus.over) {
      //游戏结束后重新开始
      this.init();
    }

    this._gameStatus = GameStatus.playing
    if (!this._curTetris) {

      this.switchTetris()
    }
    //让当前方块自动下落
    this.autoDrop()
  }

  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  controlLeft() {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._curTetris, moveDirection.left, this._exists)
    }
  }

  controlRight() {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._curTetris, moveDirection.right, this._exists)
    }
  }

  controlDown() {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._curTetris, moveDirection.down, this._exists)
    }
  }

  controlDownDirct() {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.moveDirect(this._curTetris, moveDirection.down, this._exists)
      this.hitBottom()
    }
  }

  controlRotate() {
    if (this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.rotate(this._curTetris, this._exists)
    }
  }

  /**
   * 当前方块的自由下落
   */
  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }

    this._timer = setInterval(() => {
      if (this._curTetris) {
        if (!TetrisRule.move(this._curTetris, moveDirection.down, this._exists)) {
          //触底了
          this.hitBottom()
        };
      }
    }, this._duration)
  }

  /**
   * 切换方块。把当前方块切换成下一个方块，在创建一个新的放块给下一个方块
   */
  private switchTetris() {
    this._curTetris = this._nextTetris;

    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)

    if (!TetrisRule.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._exists)) {
      //游戏结束
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer)
      this._timer = undefined;

      //清除下一个的视图
      this._nextTetris.squares.forEach(sq => {
        sq.viewer?.remove()
      })
      alert("游戏结束")
      return;
    }

    //这个位置 this._curTetris 指向的就是  this._nextTetris
    this._viewer.switch(this._curTetris)

    this.createNext();
  }

  /**
   * 设置方块的坐标，以达到让方块出现在区域的中上方
   * @param width 
   * @param tetris 
   */
  private resetCenterPoint(width: number, tetris: SquareGroup) {
    const x = width / 2 - 1;
    const y = 1;

    tetris.centerPoint = { x, y };

    while (tetris.squares.some(it => it.point.y < 0)) {
      TetrisRule.move(tetris, moveDirection.down, this._exists);

    }
  }

  //当前方块触底了
  private hitBottom() {
    //将当前的俄罗斯方块包含的小方块，加入到已存在的方块数组中。
    if (this._curTetris) {
      this._exists = this._exists.concat(this._curTetris.squares)
    }

    //处理移除
    const num = TetrisRule.deleteSquare(this._exists);

    //增加积分
    this.addScore(num)

    //切换方块
    this.switchTetris();
  }

  addScore(line: number) {
    if (line === 0) {
      return;
    } else if (line === 1) {
      this.score += 10;
    } else {
      this.score += line * 10 + (line * 10 / 2)
    }
    // console.log(this._score);

  }
}