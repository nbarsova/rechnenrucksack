export type MapCoordinate =
    {
        x: number;
        y: number;
    }

export enum Axis {
    Vertical = "vertical",
    Horizontal = "horizontal"
}

export type Direction = "dirUp" | "dirDown" | "dirLeft" | "dirRight";