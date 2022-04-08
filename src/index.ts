import { Dinosaur } from "./core/Dinosaur";
import { Game } from "./core/Game"
import GameConfig from "./core/GameConfig";
import { GamePageViewer } from "./core/viewer/GamePageViewer"
import { SquarePageViewer } from "./core/viewer/SquarPageViewer";
import $ from "jquery"


const game = new Game(new GamePageViewer());


// const lg = new Dinosaur({
//   x: 10,
//   y: GameConfig.PANEL_HEIGHT - GameConfig.DINOSAUR_SIZE - GameConfig.landSize.height,
// },
//   GameConfig.dinosaurs[0],
//   {
//     x: 0,
//     y: 100
//   }
// );

// lg.viewer = new SquarePageViewer(lg, $("#container"), lg.width, lg.height)


// $(document).on("keydown", function (e) {
//   if (e.key === " ") {
//     lg.jump()
//   }
// })






export { }