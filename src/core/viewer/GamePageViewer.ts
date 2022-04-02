import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {


  private nextDom = $("#next");
  private panelDom = $("#panel")
  private scoreDom = $("#score")

  init(game: Game): void {
    //1. 设置宽高，
    this.panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width + "px",
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height + "px"
    })
    this.nextDom.css({
      width: GameConfig.NextPanelSize.width * PageConfig.SquareSize.width + "px",
      height: GameConfig.NextPanelSize.height * PageConfig.SquareSize.height + "px"
    })

    //2. 注册键盘事件

    $(document).on("keydown", (e) => {
      const key = e.code
      if (key === "ArrowDown") {
        game.controlDown();
      } else if (key === "ArrowLeft") {
        game.controlLeft()
      } else if (key === "ArrowRight") {
        game.controlRight()
      } else if (key === "ArrowUp") {
        game.controlRotate()
      } else if (key === "Space") {
        game.controlDownDirct()
      } else if (key === "KeyP") {
        if (game.gameStatus === GameStatus.playing) {
          game.pause();
        } else {
          game.start()
        }
      }
    })


    // (e => {
    //   
    //  
    // })
  }

  showScore(v: number): void {
    this.scoreDom.text(v)
  }


  /**
   * 在页面展示 下一个方块
   * @param tetris adasdasd
   */
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $("#next"))
    })
  }

  /**
   * 在页面中，将下一个方块展示到 当前方块 出身的位置。
   * @param tetris 
   */
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer?.remove();
      sq.viewer = new SquarePageViewer(sq, $("#panel"))
    })
  }

}