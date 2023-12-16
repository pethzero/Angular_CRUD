import { Component, OnInit } from '@angular/core';
import { ApiService } from '../myservice/api.service';
import { ChangeDetectorRef } from '@angular/core';

export interface DataJson {
  id: number;
  name: string;
  editing?: boolean;
}


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  listdata: any[] = [];
  dataname: string = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAction();
  }

  getAction() {
    this.apiService.GetDataBase().subscribe(
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
    this.apiService.PostDataBase(this.dataname).subscribe(
      (data) => {
        console.log('Data added successfully:', data);

        // หลังจาก Insert สำเร็จ อัปเดตข้อมูลในตาราง
        this.getAction();

        // ให้ Angular ทราบว่ามีการเปลี่ยนแปลง
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
    // ทำบันทึกข้อมูล ณ ตรงนี้
    console.log('Saved:', resdata);
    resdata.editing = false;

    this.apiService.PutDataBase(resdata.id, resdata.name).subscribe(
      (data) => {
        console.log('Employee updated successfully:', data);
        // ทำอย่างอื่น ๆ ตามต้องการ
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );

  }

  cancelAction(resdata: DataJson): void {
    console.log('Edit canceled');
    resdata.editing = false;
  }

  deleteAction(resdata: any): void {
    const DataID = resdata.id;
    // ให้แสดง Alert Box แบบ Confirm
    const userConfirmed = window.confirm('คุณแน่ใจใช่ไหม?');
    if (userConfirmed) {
      // ผู้ใช้กด "ตกลง" (OK)
      this.apiService.DeleteDataBase(DataID).subscribe(
        () => {
          console.log('Employee deleted successfully:', DataID);
          // หลังจาก Delete สำเร็จ อัปเดตข้อมูลในตาราง
          this.getAction();
          // ให้ Angular ทราบว่ามีการเปลี่ยนแปลง
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      // ผู้ใช้กด "ยกเลิก" (Cancel)
      console.log('User canceled deletion.');
    }
  }
  
  


  trackByData(index: number, resdata: any): number {
    return resdata.id;
  }
}
