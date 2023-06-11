import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { AlbumUpsertRequestEffects } from '../+state/album.effects';
import { albumUpsertRequestsFeature } from '../../album-upsert-requests-module/+state/album-upsert-request.reducer';
import { AlbumCrudFacade } from './crud.facade';
import { AlbumApiService } from './api.service';
import { environment } from '../../../../environments/environment';

describe('AlbumUpsertRequestCrudFacade', () => {
  let facade: AlbumCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(albumUpsertRequestsFeature),
          EffectsModule.forFeature([AlbumUpsertRequestEffects]),
        ],
        providers: [
          AlbumCrudFacade,
          AlbumApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createTestAlbumUpsertRequest()]))) } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(AlbumCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentAlbumUpsertRequest to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
      expect(await readFirst(store)).toMatchSnapshot();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<AlbumCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<AlbumCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<AlbumCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<AlbumCrudFacade>(facade, httpClient));
  });
});
