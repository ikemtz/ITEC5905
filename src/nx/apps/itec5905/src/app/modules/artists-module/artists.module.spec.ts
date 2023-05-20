import { TestBed } from '@angular/core/testing';
import { ArtistsModule } from './artists.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArtistsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArtistsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(ArtistsModule).toBeDefined();
    const module = new ArtistsModule();
    expect(module).toBeTruthy();
  });
});
