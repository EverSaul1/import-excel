import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  url: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  postImport(data: any) {
    return this.http.post<any>(this.url + '/upload-temp', data);
  }

  getTem(params: any) {
    return this.http.get<any>(this.url + '/get-temp', {params});
  }
  getProcessedTemp(params: any) {
    return this.http.get('/api/processed-temp', { params });
  }
}
