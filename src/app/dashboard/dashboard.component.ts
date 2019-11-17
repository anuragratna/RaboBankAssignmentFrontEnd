import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploadService} from '../services/fileupload/file-upload.service';
import {Subscription} from 'rxjs';

interface record {
  transactionRef: string;
  accountNumber: string;
  startBalance: string;
  mutation: string;
  description: string;
  endBalance: string;
}
interface Response {
  message: string;
  status: Number;
  duplicateRecords: Array<record>;
  invalidEndBalanceRecords: Array<record>;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy{
  @ViewChild('labelImport', null)
  labelImport: ElementRef;
  fileToUpload: File = null;
  subs: Subscription;
  formImport: FormGroup;

  bannerMessage: string;

  duplicateRecords: Array<record>;
  duplicateHeader = 'Duplicate Records:'
  erroneousRecords: Array<record>;
  invalidHeader = 'Erroneous End Balance Records:';

  response:Response;
  showSuccessBanner: boolean;
  constructor(private readonly fileUploadService: FileUploadService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', [Validators.required])
    });
  }
  /**
   * This method is called every time input file is changed
   */
  onFileChange(files: FileList) {
    this.bannerMessage = null;
    this.response = null;
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    if(files && files.length > 0) {
      this.fileToUpload = files.item(0);
      console.log(this.fileToUpload.type);
    } else {
      this.formImport.setErrors({invalid: true});
    }
  }

  onSubmit() {
    this.subs = this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      this.response = data;
      if(this.response['status'] == 200) {
        this.showSuccessBanner = true;
      } else {
        this.showSuccessBanner = false;
        this.duplicateRecords = this.response['duplicateRecords'];
        this.erroneousRecords = this.response['invalidEndBalanceRecords'];
      }
      this.bannerMessage = this.response['message'];

    }, error => {
      this.bannerMessage = error.error.message || error.statusText;
      this.showSuccessBanner = false;
      this.response = null;
    });
  }

  /**
   * Unsubscribe to avoid memory leak
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
