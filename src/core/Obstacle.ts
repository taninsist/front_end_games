/**
 * 仙人掌类
 */
import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { IPoint, ISpeed } from "./types";
import { getRandom } from "./utils";
import { SquarePageViewer } from "./viewer/SquarPageViewer";
import $ from "jquery"

export class Obstacle extends Square {
  onMove(): void {
    if (this.point.x <= -this.width) {
      this.viewer.clear()
    }

  }

  constructor(_point: IPoint, _background: string, _width: number, _height: number, _speed: ISpeed) {
    super(_point, _background, _width, _height, _speed);
  }

}

/**
 * 矮的
 */
class shortCactus extends Obstacle {
  constructor() {
    super(
      {
        x: GameConfig.PANEL_WIDTH,
        y: GameConfig.PANEL_HEIGHT - 40 - GameConfig.LAND_HEIGHT
      },
      GameConfig.obstacles[0],
      40, 40,
      {
        x: -100,
        y: 0
      }
    )
  }
}

class highCactus extends Obstacle {
  constructor() {
    super(
      {
        x: GameConfig.PANEL_WIDTH,
        y: GameConfig.PANEL_HEIGHT - 55 - GameConfig.LAND_HEIGHT
      },
      GameConfig.obstacles[1],
      40, 55,
      {
        x: -100,
        y: 0
      }
    )
  }
}

class fatCactus extends Obstacle {
  constructor() {
    super(
      {
        x: GameConfig.PANEL_WIDTH,
        y: GameConfig.PANEL_HEIGHT - 40 - GameConfig.LAND_HEIGHT
      },
      GameConfig.obstacles[2],
      88, 40,
      {
        x: -100,
        y: 0
      }
    )
  }
}

class shitCactus extends Obstacle {
  constructor() {
    super(
      {
        x: GameConfig.PANEL_WIDTH,
        y: GameConfig.PANEL_HEIGHT - 40 - GameConfig.LAND_HEIGHT
      },
      GameConfig.obstacles[3],
      40, 40,
      {
        x: -100,
        y: 0
      }
    )
  }
}

const Obstacles = [
  shortCactus,
  highCactus,
  fatCactus,
  shitCactus
]


/**
 * 障碍物构造者，用于不断生产障碍物
 */
export class ObstacleProducer {

  //计时器
  private _timer: number | null = null;
  //间隔
  private _interval: number = 1500;
  //
  private _obstacles: Obstacle[] = [];

  set interval(v: number) {
    this._interval = v;
  }

  get obstacles() {
    return this._obstacles;
  }

  /**
   * 是否已移除视野 
   */
  isRemoveView(obstacle: Obstacle) {
    return obstacle.point.x <= -obstacle.width
  }

  /**
   * 开始生产
   */
  startProducer() {
    this._timer = setInterval(() => {
      const ob = createObstacle();
      ob.viewer = new SquarePageViewer(ob, $("#container"), ob.width, ob.height);
      ob.viewer?.show();
      this._obstacles.push(ob)
      console.log(this._obstacles);

      for (let i = 0; i < this._obstacles.length; i++) {
        const ob = this._obstacles[i]
        if (this.isRemoveView(ob)) {

          // this._obstacles.splice(i);
          // i--;
        }
      }

    }, this._interval)


  }

  /**
   * 关闭生产
   */
  stopProducer() {
    clearInterval(this._timer!);
    this._timer = null;

  }

}


export function createObstacle(): Obstacle {
  let index = getRandom(0, Obstacle.length - 1);
  const obstacle = Obstacles[index]

  return new obstacle();
}







