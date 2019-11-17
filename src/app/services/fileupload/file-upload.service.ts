import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {map} from "rxjs/operators";
import { environment } from '../../../environments/environment';
interface Response {
  message: string;
  status: Number;
  duplicateRecords: Array<record>;
  invalidEndBalanceRecords: Array<record>;
}
interface record {
  transactionRef: string;
  accountNumber: string;
  startBalance: string;
  mutation: string;
  description: string;
  endBalance: string;
}
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }
  postFile(fileToUpload: File): Observable<Response> {
    const endpoint = environment.endpoint;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData)
      .pipe(map((response: any) =>
      {
        return response;
      }));
  }
}
