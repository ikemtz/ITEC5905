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

import { SongEffects } from '../+state/song.effects';
import { songsFeature } from '../+state/song.reducer';
import { SongCrudFacade } from './crud.facade';
import { SongApiService } from './api.service';
import { environment } from '../../../../environments/environment';

describe('SongCrudFacade', () => {
  let facade: SongCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(songsFeature),
          EffectsModule.forFeature([SongEffects]),
        ],
        providers: [
          SongCrudFacade,
          SongApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createTestSong()]))) } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(SongCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentSong to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
      expect(await readFirst(store)).toMatchSnapshot();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<SongCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<SongCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<SongCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<SongCrudFacade>(facade, httpClient));

    test('should load Albums', async () => {
      facade.loadAlbums({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.albums$);
      expect(result.length).toBe(1);
    });
  });
});
