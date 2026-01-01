import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { KeyValuePipe, NgFor } from '@angular/common';
import { FlowModel } from '../services/flowModel.service';
import { HttpService } from '../services/http.service';
import { KonvaBoard } from '../services/draw.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { LogService } from '../services/log.service';

enum AnimationState {
  Playing,
  Paused,
  Stopped
}

@Component({
  selector: 'app-model-list',
  standalone: true,
  imports: [NgFor, KeyValuePipe, FormsModule],
  providers: [HttpService, FlowModel],
  templateUrl: './model-list.component.html',
  styleUrl: './model-list.component.css'
})
export class ModelListComponent implements OnInit, OnDestroy{
  models: Map<string, FlowModel> = new Map<string, FlowModel>();
  loadStatuses: Map<string, boolean> = new Map<string, boolean>();
  board!: KonvaBoard;
  httpService: HttpService = inject(HttpService);
  alertService: AlertService = inject(AlertService);
  logService: LogService = inject(LogService);

  selectedModelId: string | undefined = undefined;
  selectedModel: FlowModel | undefined = undefined;
  currentSnapshot: number = 0;
  animationSpeed: number = 1;
  animationState: AnimationState = AnimationState.Stopped;

  ngOnInit(): void {
    this.board = new KonvaBoard(
      'animationBoard', 
      FlowModel.fieldWidth, 
      FlowModel.fieldHeight
    );
    this.GetModelReferenceList();
    this.alertService.reloadModelListTrigger.subscribe(
      () => {
        this.GetModelReferenceList();
      }
    );
  }

  ngOnDestroy(): void {
    this.alertService.reloadModelListTrigger.unsubscribe();
  }

  GetModel(id: string): void {
    if (this.loadStatuses.get(id) == true) {
      return;
    }
    this.httpService.GetModel(id).subscribe(
      (response: any) => {
        this.logService.AddLog("Loading model: " + response.result);
        if (response.result == "Ok") {
          let model: FlowModel = new FlowModel();
          model.label = response.model._id;
          model.staticBoundarySnapshot = response.model.staticBoundarySnapshot;
          model.dynamicBoundarySnapshots = response.model.dynamicBoundarySnapshots;
          this.models.set(model.label, model);
          this.loadStatuses.set(model.label, true);
        }
      }
    );
  }

  GetModelReferenceList(): void {
    this.httpService.GetModelReferenceList().subscribe(
      (response: any) => {
        this.logService.AddLog("Loading model list: " + response.result);
        if (response.result == "Ok") {
          for (let responseModel of response.models){
            if (this.models.has(responseModel._id)) {
              continue;
            }
            let model: FlowModel = new FlowModel();
            model.label = responseModel._id;
            this.models.set(model.label, model);
            this.loadStatuses.set(model.label, false);
            this.GetModel(model.label);
          }
        }
      }
    );
  }

  IsModelSelected(id: string): boolean {
    return (id == this.selectedModelId);
  }

  SelectModel(id: string): void {
    this.StopModelAnimation();
    this.selectedModelId = id;
    this.selectedModel = this.models.get(this.selectedModelId)!;
    this.board.DrawCalculatedFlow(this.selectedModel, this.currentSnapshot);
  }

  UpdateBoard(): void {
    if (this.selectedModel) {
      this.board.DrawCalculatedFlow(this.selectedModel, this.currentSnapshot);
    }
    else {
      this.board.Clear();
    }
  }

  DeleteModel(id: string): void {
    this.models.delete(id);
    this.loadStatuses.delete(id);
    if (id == this.selectedModelId) {
      this.selectedModelId = undefined;
      this.selectedModel = undefined;
      this.StopModelAnimation();
      this.UpdateBoard();
    }
    this.httpService.DeleteModel(id).subscribe(
      (response: any) => {
        this.logService.AddLog("Deleting model: " + response.result);
      }
    );
  }

  StartModelAnimation(): void {
    if (this.animationState == AnimationState.Playing) {
      return;
    }
    this.animationState = AnimationState.Playing;
    this.Animate();
  }

  PauseModelAnimation(): void {
    this.animationState = AnimationState.Paused;
  }

  StopModelAnimation(): void {
    this.animationState = AnimationState.Stopped;
    this.currentSnapshot = 0;
    this.UpdateBoard();
  }

  Animate(): void {
    setTimeout(
      () => {
        if (!this.selectedModel) {
          return;
        }
        if (this.animationState != AnimationState.Playing) {
          return;
        }
        if (this.currentSnapshot >= this.selectedModel.dynamicBoundarySnapshots.length - 1) {
          this.animationState = AnimationState.Paused;
          return;
        }
        this.currentSnapshot += 1;
        this.UpdateBoard();
        this.Animate();
      },
      1000 / this.animationSpeed
    );
  }
}
