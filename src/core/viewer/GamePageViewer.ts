import { Game } from "../Game";
import { GameStatus, GameViewer } from "../types";
import $ from "jquery";
import GameConfig from "../GameConfig"
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {

  private rootDom = $("#root")
  private panelDom = $("#container");
  private scoreDom = $(".score");
  private _timer: number | null = null;

  /**
   * 
   * @param game 初始化
   */
  init(game: Game): void {
    this.panelDom.css({
      width: GameConfig.PANEL_WIDTH + "px",
      height: GameConfig.PANEL_HEIGHT + "px"
    })

    this.updataScore(0);

    this.bindEvent(game)

  }

  /**
   * 更新分数
   * @param v 
   */
  updataScore(v: number) {
    this.scoreDom.text(v);
    
    if (v > 100 && Math.floor(v / 100) % 7 == 4 || Math.floor(v / 100) % 7 == 3) {
      this.rootDom.css({
        "background-color": PageConfig.timeMode.evening
      })

    } else {
      this.rootDom.css({
        "background-color": PageConfig.timeMode.daytime
      })
    }

  }

  //绑定事件
  bindEvent(game: Game) {
    const that = this;

    $(document).on("keydown", function (e) {
      const key = e.key;
      if (game.gameStatus !== GameStatus.palying) {
        if (key === "Enter") {
          game.start();
        }
        return;
      }

      if (key === " ") {
        //按空格，使恐龙跳
        game.jumt()
      } else if (key === "Enter") {
        game.pause()
      }

    })

  }

}