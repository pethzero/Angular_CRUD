import { Component,  Input,OnInit,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../myservice/api.service';
import { ChangeDetectorRef } from '@angular/core';

export interface DataJson {
  id: number;
  name: string;
  address: string;
  editing?: boolean;
}


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  listdata: any[] = [];
  listdata_export: any[] = [];
  dataname: string = '';
  dataaddress: string = '';
  @Input() actionGetValue: string = '';
  @Input() actionPostValue: string = '';
  // @Input() listurl:string = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAction(this.actionGetValue);
  }

  getAction(value:String) {
    let url = `get?sqlquery=${value}`
    this.apiService.GetDataBaseNew(url).subscribe(
      (data) => {
        this.listdata = data;
        console.log('Data Data:', this.listdata);
      },
      (error) => {
        console.error('Error fetching Data data:', error);
      }
    );
  }

  addAction() {
    this.listdata_export = [{ name: this.dataname,address: this.dataaddress}];
    this.apiService.PostDataBaseNew(this.actionPostValue, JSON.stringify(this.listdata_export)).subscribe(
      (data) => {
        console.log('Data added successfully:', data);
        this.getAction(this.actionGetValue);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error adding Data:', error);
      }
    );
  }

  upadteAction(resdata: DataJson): void {
    resdata.editing = true;
  }

  saveAction(resdata: DataJson): void {
    this.listdata_export = [{ id: resdata.id, name: resdata.name, address: resdata.address }];
    resdata.editing = false;
    this.apiService.PutDataBaseNew("SQL0002", resdata.id, JSON.stringify(this.listdata_export)).subscribe(
      (data) => {
        // console.log('Employee updated successfully:', data);
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );

  }

  cancelAction(resdata: DataJson): void {
    resdata.editing = false;
  }

  deleteAction(resdata: any): void {
    const DataID = resdata.id;
    const userConfirmed = window.confirm('คุณแน่ใจใช่ไหม?');
    if (userConfirmed) {
      this.apiService.DeleteDataBaseNew("sqlquery=SQL0003",DataID).subscribe(
        () => {
          console.log('Employee deleted successfully:', DataID);
          this.getAction(this.actionGetValue);
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.log('User canceled deletion.');
    }
  }


  trackByData(index: number, resdata: any): number {
    return resdata.id;
  }
}
