import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {FileUploadService} from '../services/fileupload/file-upload.service';
import {of} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let fileUploadSpy;
  let fileUploadService: jasmine.SpyObj<FileUploadService>;
  beforeEach(async(() => {
    fileUploadSpy = jasmine.createSpyObj('FileUploadService', ['postFile']);
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {provide: FileUploadService, useValue: fileUploadSpy}],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fileUploadSpy.postFile.and.returnValue(of([{foo: 'test'}]));
    fileUploadService = TestBed.get(FileUploadService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onFileChange', () => {
    expect(component.onFileChange).toBeTruthy();
  });

  it('should call fileUploadService', () => {
    component.onSubmit();
    expect(fileUploadService.postFile).toHaveBeenCalled();
  });
});
