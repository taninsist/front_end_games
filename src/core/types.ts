export interface IPoint {
    readonly x: number
    readonly y: number
}

export interface IViewer {
    /**
     * 显示
     */
    shwo(): void
    /**
     * 移除
     */
    remove(): void
}