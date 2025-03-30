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
        if (res.data && Array.isArray(res.data)) {
          this.data = res.data.map((m: any) => {
            m.data = JSON.parse(m.data);
            return m;
          });
        }
        console.log(this.data);
      }
    })
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
  procesar() {
    const entidade_id = 1;

    const validData = this.data.filter(item => item.is_valid && !item.is_processed);
    const ids = validData.map(item => item.id);

    const sendPair = async (pair: number[]) => {
      const params = {
        entidade_id,
        ids: pair
      };
      return this.service.getProcessedTemp(params).toPromise();
    };

    const processAll = async () => {
      for (let i = 0; i < ids.length; i += 2) {
        const pair = ids.slice(i, i + 2);
        try {
          await sendPair(pair);

          // Marca como procesados en el frontend
          this.data.forEach(item => {
            if (pair.includes(item.id)) {
              item.is_processed = true;
            }
          });

        } catch (error) {
          console.error('Error al procesar:', pair, error);
        }
      }
    };

    processAll();
  }
}
