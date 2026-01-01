import { Component, OnInit, inject } from '@angular/core';
import { FlowModel } from '../services/flowModel.service';
import { KonvaBoard } from '../services/draw.service';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { LogService } from '../services/log.service';

@Component({
    selector: 'app-modifying-board',
    standalone: true,
    imports: [FormsModule],
    providers: [HttpService],
    templateUrl: './modifying-board.component.html',
    styleUrl: './modifying-board.component.css'
})
export class ModifyingBoardComponent implements OnInit {
    flow: FlowModel = new FlowModel();
    board!: KonvaBoard;
    httpService: HttpService = inject(HttpService);
    alertService: AlertService = inject(AlertService);
    logService: LogService = inject(LogService);
    step: string = "Add static boundary";

    ngOnInit(): void {
        this.board = new KonvaBoard(
            "modifyingBoard", 
            FlowModel.fieldWidth,
            FlowModel.fieldHeight
        );
    }

    NextStep(): void {
        this.step = "Add dynamic boundary";
    }

    IsCalculateAndSaveDisabled(): boolean {
        return this.step != "Add dynamic boundary" ||
            this.GetCurrentBoundary().length < 3 ||
            this.flow.defaultVelocity[0] < 0 ||
            this.flow.defaultVelocity[0] < 0 ||
            this.flow.simulationTime < 0 ||
            this.flow.simulationTimeStep < 0 ||
            this.flow.pointSpacingRange[0] < 0 ||
            this.flow.pointSpacingRange[1] < 0 ||
            this.flow.pointSpacingRange[0] >= this.flow.pointSpacingRange[1];
    }

    IsNextStepHidden(): boolean {
        return this.step != "Add static boundary";
    }

    IsNextStepDisabled(): boolean {
        return this.GetCurrentBoundary().length < 3;
    }

    IsDeletePointsHidden(): boolean {
        return this.GetCurrentBoundary().length < 1;
    }

    GetCurrentBoundary(): number[][] {
        if (this.step == "Add static boundary") {
            return this.flow.staticBoundary;
        }
        else if (this.step == "Add dynamic boundary") {
            return this.flow.dynamicBoundary;
        }
        else {
            return [];
        }
    }

    GetCurrentBoundaryLength(): number {
        return this.GetCurrentBoundary().length;
    }

    AddPoint(): void {
        let boundaryPoints: number[][] = this.GetCurrentBoundary();
        let point: number[] = this.board.GetPointerPosition();
        boundaryPoints.push(point);
        this.UpdateBoard();
    }

    CalculateAndSave(): void {
        this.flow.CloseBoundaries();
        let result: Observable<any> = this.httpService.SaveModel(this.flow);
        result.subscribe(
            (response: any) => {
                this.logService.AddLog("Saving model: " + response.result);
                this.alertService.reloadModelListTrigger.next(true);
            }
        );
        this.ResetBoard();
    }

    UpdateBoard(): void {
        this.board.DrawFlow(this.flow);
    }

    ResetBoard(): void {
        this.step = "Add static boundary";
        this.flow = new FlowModel();
        this.UpdateBoard();
    }

    DeleteLastPoint(): void {
        let boundaryPoints: number[][] = this.GetCurrentBoundary();
        boundaryPoints.pop();
        this.UpdateBoard();
    }

    DeleteAllPoints(): void {
        let boundaryPoints: number[][] = this.GetCurrentBoundary();
        while (boundaryPoints.length > 0) {
            boundaryPoints.pop();
        }
        this.UpdateBoard();
    }
}
