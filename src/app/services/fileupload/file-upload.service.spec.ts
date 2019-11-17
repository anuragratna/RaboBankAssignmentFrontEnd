import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [FileUploadService]
  }).compileComponents());

  it('should be created', () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    expect(service).toBeTruthy();
  });
  it('should be initialized', inject([FileUploadService], (fileUploadService: FileUploadService) => {
    expect(fileUploadService).toBeTruthy();
  }));
  it(
    'should perform file upload correctly',
    fakeAsync(
      inject(
        [FileUploadService, HttpTestingController],
        (fileUploadService: FileUploadService, backend: HttpTestingController) => {

          // Set up
          const url = 'http://localhost:8080/rabobank/uploadStatement';
          const responseObject = {
            message: 'Invalid Input',
            status: 0
          }
          let response = null;
          // End Setup
          // @ts-ignore
          const file = new File([3555], 'test-file.jpg');
          fileUploadService.postFile(file).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {
              response = error;
            }
          );

          const requestWrapper = backend.expectOne({url: 'http://localhost:8080/rabobank/uploadStatement'});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.status).toBe(0);
        }
      )
    )
  );
});
