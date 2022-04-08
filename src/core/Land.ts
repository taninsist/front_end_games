/**
 * 跑道类
 */

import { Square } from "./Square";
import { IPoint, ISpeed } from "./types";

export class Land extends Square {
  onMove(): void {
    throw new Error("Method not implemented.");
  }

  constructor(_point: IPoint, _background: string, _width: number, _height: number, _speed: ISpeed) {
    super(_point, _background, _width, _height, _speed)
  }
}