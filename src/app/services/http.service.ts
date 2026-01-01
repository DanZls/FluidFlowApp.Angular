import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { FlowModel } from "./flowModel.service";
import { Observable } from "rxjs";
import { backendUrl } from "../../environment/environment";

@Injectable()
export class HttpService {
    http: HttpClient = inject(HttpClient);
    backendUrl: string;

    constructor() {
        this.backendUrl = backendUrl;
    }

    GetModelReferenceList(): Observable<any> {
        let response: Observable<any> = this.http.get<any>(this.backendUrl + "/GetModelReferenceList");
        return response;
    }

    GetModel(id: string): Observable<any> {
        let response: Observable<any> = this.http.get<any>(this.backendUrl + "/GetModel/" + id);
        return response;
    }

    GetAllModels(): Observable<any> {
        let response: Observable<any> = this.http.get<any>(this.backendUrl + "/GetModelList");
        return response;
    }

    SaveModel(model: FlowModel): Observable<any> {
        let response: Observable<any> = this.http.post(this.backendUrl + "/SaveModel", model);
        return response;
    }

    DeleteModel(id: string): Observable<any> {
        let response: Observable<any> = this.http.delete<any>(this.backendUrl + "/DeleteModel/" + id);
        return response;
    }
}