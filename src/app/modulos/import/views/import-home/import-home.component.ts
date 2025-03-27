import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {ImportService} from "../../services/import.service";
import {ResultTem} from "../../models/models";

@Component({
  selector: 'app-import-home',
  templateUrl: './import-home.component.html',
  styleUrls: ['./import-home.component.scss']
})
export class ImportHomeComponent implements OnInit {
  data: ResultTem[] = [];
  headers: string[] = [];
  constructor(private service: ImportService) { }

  ngOnInit(): void {
    this.getTempData();
  }
  onFileChange(event: any): void {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('entidade_id', '1');
    this.service.postImport(formData).subscribe({
      next: (res: any) => {
        this.getTempData();
      }
    })
  }

  private getTempData() {
    const params = {
      entidade_id: '1',
    }
    this.service.getTem(params).subscribe({
      next: (res: any) => {
        this.data = res.data.map((m: any) => {
          m.data = JSON.parse(m.data)
        })
      }
    })
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
