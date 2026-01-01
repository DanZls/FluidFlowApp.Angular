import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Circle } from "konva/lib/shapes/Circle";
import { Line } from "konva/lib/shapes/Line";
import { FlowModel } from "./flowModel.service";


export class KonvaBoard {
    private stage: Stage;
    private defaultColor: string = 'white';

    constructor(container: string, width: number, height: number) {
        this.stage = new Stage({
          container: container,
          width: width,
          height: height
        });
    }

    GetPointerPosition(): number[] {
        return [this.stage.getPointerPosition()!.x, this.stage.getPointerPosition()!.y];
    }

    DrawFlow(flow: FlowModel): void {
        this.stage.destroyChildren();
        let layer = new Layer();
        this.AddBoundaryPoints(layer, flow.staticBoundary);
        this.AddBoundaryLines(layer, flow.staticBoundary);
        this.AddBoundaryPoints(layer, flow.dynamicBoundary);
        this.AddBoundaryLines(layer, flow.dynamicBoundary);
        this.stage.add(layer);
        this.stage.batchDraw();
    }

    DrawCalculatedFlow(flow: FlowModel, index: number): void {
        this.stage.destroyChildren();
        let layer = new Layer();
        this.AddBoundaryPoints(layer, flow.staticBoundarySnapshot);
        this.AddClosedBoundaryLines(layer, flow.staticBoundarySnapshot, true);
        this.AddBoundaryPoints(layer, flow.dynamicBoundarySnapshots[index]);
        this.AddClosedBoundaryLines(layer, flow.dynamicBoundarySnapshots[index]);
        this.stage.add(layer);
        this.stage.batchDraw();
    }

    AddBoundaryPoints(layer: Layer, boundary: number[][]): void {
        for (let point of boundary) {
            let x: number = point.at(0)!;
            let y: number = point.at(1)!;
            const circle: Circle = new Circle({
              x: x,
              y: y,
              radius: 2.1,
              fill: this.defaultColor,
            });
            layer.add(circle);
        }
    }

    AddBoundaryLines(layer: Layer, boundary: number[][]): void {
        if (boundary.length < 2) {
            return;
        }

        let points: number[] = [];
        for (let index = 0; index < boundary.length; index++) {
            let x: number = boundary.at(index)!.at(0)!;
            let y: number = boundary.at(index)!.at(1)!;
            points.push(x, y);
        }
        const line: Line = new Line({
            points: points,
            stroke: this.defaultColor,
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round'
        });
        layer.add(line);

        if (boundary.length > 2) {
            let xn: number = boundary.at(-1)!.at(0)!;
            let yn: number = boundary.at(-1)!.at(1)!;
            let x0: number = boundary.at(0)!.at(0)!;
            let y0: number = boundary.at(0)!.at(1)!;
            const line: Line = new Line({
                points: [xn, yn, x0, y0],
                stroke: this.defaultColor,
                strokeWidth: 2,
                dash: [5, 5],
                lineCap: 'round',
                lineJoin: 'round',
            });
            layer.add(line);
        }
    }

    AddClosedBoundaryLines(layer: Layer, boundary: number[][], isFilled: boolean = false): void {
        if (boundary.length < 2) {
            return;
        }

        let points: number[] = [];
        for (let index = 0; index < (boundary.length - 1); index++) {
            let x: number = boundary.at(index)!.at(0)!;
            let y: number = boundary.at(index)!.at(1)!;
            points.push(x, y);
        }
        const line: Line = new Line({
            points: points,
            stroke: this.defaultColor,
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
            closed: true,
            fill: isFilled ? this.defaultColor : undefined
        });
        layer.add(line);
    }

    Clear(): void {
        this.stage.destroyChildren();
    }
}
