import { Injectable } from "@angular/core";

@Injectable()
export class FlowModel {
    label: string = ""
    staticBoundary: number[][] = [];
    dynamicBoundary: number[][] = [];
    defaultVelocity: number[] = [200.0, 0.0]
    simulationTime: number = 5.0;
    simulationTimeStep: number = 0.01;
    pointSpacingRange: number[] = [2, 3];
    staticBoundarySnapshot: number[][] = [];
    dynamicBoundarySnapshots: number[][][] = [];

    static fieldHeight = 560.0;
    static fieldWidth = 1000.0;

    CloseBoundaries(): void {
        if (this.staticBoundary[-1] != this.staticBoundary[0]) {
            this.staticBoundary.push(this.staticBoundary[0]);
        }
        if (this.dynamicBoundary[-1] != this.dynamicBoundary[0]) {
            this.dynamicBoundary.push(this.dynamicBoundary[0]);
        }
    }

    ClearBoundaries(): void {
        this.staticBoundary.splice(0, this.staticBoundary.length);
        this.dynamicBoundary.splice(0, this.dynamicBoundary.length);
    }
}
