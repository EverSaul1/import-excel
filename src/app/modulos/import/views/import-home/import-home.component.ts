import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {ImportService} from "../../services/import.service";
import {ResultTem} from "../../models/models";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-import-home',
  templateUrl: './import-home.component.html',
  styleUrls: ['./import-home.component.scss']
})
export class ImportHomeComponent implements OnInit {
  data: ResultTem[] = [];
  headers: string[] = [];
  formData: FormData| null = null;
  filter: { name: string, value: any }[] = [{name: 'Todos', value: 'all'},{name: 'Procesado', value: 1}, {name: 'Sin procesar', value: 0}];
  formSelectFilter: any = new FormControl(['']);
  constructor(private service: ImportService) { }

  ngOnInit(): void {
    this.formSelectFilter.setValue('all')
    this.getTempData();
  }
  onFileChange(event: any): void {
    this.formData = new FormData();
    this.formData.append('file', event.target.files[0]);
    this.formData.append('entidade_id', '1');

  }
  sendData(): void {
    if (this.formData) {
      console.log(this.formData);
      this.service.postImport(this.formData).subscribe({
        next: (res: any) => {
          this.getTempData();
        },
        error: (err) => {
          console.error('Error al subir archivo:', err);
        }
      });
    }
  }
  selectionData(event: any): void {
    this.getTempData()
  }
  private getTempData() {
    const params = {
      entidade_id: '1',
      is_processed: this.formSelectFilter.value
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
        ids: pair.join(',')
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
