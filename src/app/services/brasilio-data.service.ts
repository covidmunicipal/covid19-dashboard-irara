import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrasilIoDataService {

  lastEntryResult: any;

  constructor(private http: HttpClient) {
    this.updateDataFromApi();
  }

  async updateDataFromApi() {
    try {
      const result: any = await this.http.get(`https://brasil.io/api/dataset/covid19/caso_full/data/?city=${environment.targetLocation}&is_last=true`).toPromise();
      this.lastEntryResult = result.results[0];
    } catch (e) {}
  }

}
