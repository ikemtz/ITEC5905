import { TestBed } from '@angular/core/testing';
import { MediaUploadRequestsModule } from './media-upload-requests.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MediaUploadRequestsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MediaUploadRequestsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(MediaUploadRequestsModule).toBeDefined();
    const module = new MediaUploadRequestsModule();
    expect(module).toBeTruthy();
  });
});
