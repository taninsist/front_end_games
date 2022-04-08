import { Game } from "../Game";
import { GameStatus, GameViewer } from "../types";
import $ from "jquery";
import GameConfig from "../GameConfig"

export class GamePageViewer implements GameViewer {

  private panelDom = $("#container");
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

    this.bindEvent(game)

  }

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