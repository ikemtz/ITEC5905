import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn, readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';
import { ArtistGenreUpsertRequestFormGroupFac, IArtist, createTestArtist, createTestArtistGenre } from '../../../../models/artists-webapi';

import { ArtistAddComponent } from './add.component';
import { ArtistCrudFacade } from './crud.facade';


export function createMockArtistFacade() {
  return {
    currentEntity$: of({}),
    pictures$: of([
      { id: 'abc', blob: 'abc', type: 'abc', },
      { id: 'xyz', blob: 'xyz', type: 'xyz', },]),
    loadPictures: jest.fn(),
  };
}

describe('ArtistAddComponent', () => {
  let component: ArtistAddComponent;
  let fixture: ComponentFixture<ArtistAddComponent>;
  let facade: ArtistCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [ArtistAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DropDownsModule,],
      providers: [{ provide: ArtistCrudFacade, useValue: createDataEntryMockFacade(createMockArtistFacade()) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(ArtistCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
    consoleWarnMock.mockRestore();
    consoleGroupMock.mockRestore();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should save', () => {
    component.initForm();
    component.addEditForm?.patchValue(createTestArtist());
    const genreForm = ArtistGenreUpsertRequestFormGroupFac();
    genreForm.patchValue(createTestArtistGenre());
    component.addEditForm.controls.genres?.controls.push(genreForm);

    let item: IArtist | undefined;
    facade.saveNewEntity = jest.fn(x => (item = x));
    facade.updateExistingEntity = jest.fn();
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(1);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);

    expect(item).toMatchSnapshot();
  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not save', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    facade.clearCurrentEntity = jest.fn();
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });

  test('should support Picture filters', async () => {
    component.handlePictureFilter('xy');
    const result = await readFirst(component.pictures$);
    expect(result).toMatchSnapshot();
  });
});
