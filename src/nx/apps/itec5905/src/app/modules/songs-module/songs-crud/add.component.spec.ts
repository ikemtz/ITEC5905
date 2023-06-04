import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { mockConsoleError, mockConsoleGroup, mockConsoleWarn, readFirst } from 'imng-ngrx-utils/testing';
import { of } from 'rxjs';

import { SongAddComponent } from './add.component';
import { SongCrudFacade } from './crud.facade';


export function createMockSongFacade() {
  return {
    currentEntity$: of({}),
    albums$: of([
      { id: 'abc',name: 'abc',artistId: 'abc',pictureIpfsHash: 'abc', },
      { id: 'xyz',name: 'xyz',artistId: 'xyz',pictureIpfsHash: 'xyz', },]),
    loadAlbums: jest.fn(),
  };
}

describe('SongAddComponent', () => {
  let component: SongAddComponent;
  let fixture: ComponentFixture<SongAddComponent>;
  let facade: SongCrudFacade;
  let consoleWarnMock: jest.SpyInstance<void>;
  let consoleGroupMock: jest.SpyInstance<void>;

  beforeEach(waitForAsync(() => {
    consoleWarnMock = mockConsoleWarn();
    consoleGroupMock = mockConsoleGroup();
    TestBed.configureTestingModule({
      declarations: [SongAddComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule, DropDownsModule, ],
      providers: [{ provide: SongCrudFacade, useValue: createDataEntryMockFacade(createMockSongFacade()) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongAddComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(SongCrudFacade);
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
    component.addEditForm?.patchValue(createTestSong());
    component.addEditForm.controls.album?.patchValue(createTestAlbum());

    let item: ISong | undefined;
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

  test('should support Album filters', async () => {
    component.handleAlbumFilter('xy');
    const result = await readFirst(component.albums$);
    expect(result).toMatchSnapshot();
  });
});
