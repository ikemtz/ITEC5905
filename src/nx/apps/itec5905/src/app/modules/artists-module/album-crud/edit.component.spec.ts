import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createDataEntryMockFacade } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { mockConsoleError, readFirst } from 'imng-ngrx-utils/testing';

import { AlbumEditComponent } from './edit.component';
import { AlbumCrudFacade } from './crud.facade';

describe('AlbumUpsertRequestEditComponent', () => {
  let component: AlbumEditComponent;
  let fixture: ComponentFixture<AlbumEditComponent>;
  let facade: AlbumCrudFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumEditComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule,],
      providers: [{ provide: AlbumCrudFacade, useValue: createDataEntryMockFacade({ currentEntity$: of({}) }) }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(AlbumCrudFacade);
    fixture.detectChanges();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

  test('should update', () => {
    component.initForm();
    component.addEditForm.patchValue(createTestAlbumUpsertRequest());
    let item: IAlbumUpsertRequest | undefined;
    facade.updateExistingEntity = jest.fn(x => (item = x));
    expect(component.getFormErrors()).toStrictEqual([]);
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(1);

    expect(item).toMatchSnapshot();

  });

  /**
   * Note: if this test fails, then you're missing validators in your forms.
   * Using form validators is typically a good idea.
   */
  test('should not update', () => {
    const consoleErrorMock = mockConsoleError();
    component.addEditForm?.patchValue({});
    component.onSubmit();
    expect(facade.saveNewEntity).toBeCalledTimes(0);
    expect(facade.updateExistingEntity).toBeCalledTimes(0);
    consoleErrorMock.mockRestore();
  });

  test('should cancel', () => {
    component.cancel();
    expect(facade.clearCurrentEntity).toBeCalledTimes(1);
  });
});
