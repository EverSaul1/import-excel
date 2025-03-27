import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  url: string = 'https://4975-38-25-45-204.ngrok-free.app/api';

  constructor(private http: HttpClient) { }

  postImport(data: any) {
    return this.http.post<any>(this.url + '/upload-temp', data);
  }

  getTem(params: any) {
    return this.http.get<any>(this.url + '/get-temp', {params});
  }
}
