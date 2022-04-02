import { Game } from "./core/Game"
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from "jquery"

const g = new Game(new GamePageViewer());



$(".stopBtn").on("click", function () {
    g.pause()
})
$(".startBtn").on("click", function () {
    g.start()


})

export { }