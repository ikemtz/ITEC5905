import { TestBed } from '@angular/core/testing';
import { SongsModule } from './songs.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SongsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SongsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('should create', () => {
    expect(SongsModule).toBeDefined();
    const module = new SongsModule();
    expect(module).toBeTruthy();
  });
});
