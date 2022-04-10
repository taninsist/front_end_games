import cactus_1 from "../assets/cactus_1.png"
import cactus_2 from "../assets/cactus_2.png"
import cactus_3 from "../assets/cactus_3.png"
import shit from "../assets/shit.png"


import dinosaur_quiet from "../assets/dinosaur_quiet.png"
import dinosaur_running from "../assets/dinosaur_running.gif"

const PANEL_WIDTH = 800; //面板的宽度
const PANEL_HEIGHT = 150 + 100; //面板的高度

const LAND_WIDTH = PANEL_WIDTH; //土地的宽度
const LAND_HEIGHT = 15; //土地的高度

const DINOSAUR_SIZE = 45;

//

export default {
  PANEL_WIDTH,
  PANEL_HEIGHT,

  LAND_WIDTH,
  LAND_HEIGHT,

  DINOSAUR_SIZE,

  /**
   * 恐龙的大小
   */
  dinosaurSize: {
    width: 40,
    height: 40
  },

  /**
   * 土地的大小，px
   */
  landSize: {
    width: PANEL_WIDTH,
    height: 15
  },

  /**
   * 仙人掌
   */
  obstacles: [cactus_1, cactus_2, cactus_3, shit],

  /**
   * 恐龙
   */
  dinosaurs: [dinosaur_quiet, dinosaur_running],

  levels: [
    { score: 0, interval: 24 / 1000 },
    { score: 1000, interval: 32 / 1000 },
    { score: 2000, interval: 40 / 1000 }
  ]

}