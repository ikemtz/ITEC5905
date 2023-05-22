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

import { ArtistEffects } from '../+state/artist.effects';
import { artistsFeature } from '../+state/artist.reducer';
import { ArtistCrudFacade } from './crud.facade';
import { ArtistApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { createTestArtist } from '../../../../models/artists-webapi';

describe('ArtistCrudFacade', () => {
  let facade: ArtistCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(artistsFeature),
          EffectsModule.forFeature([ArtistEffects]),
        ],
        providers: [
          ArtistCrudFacade,
          ArtistApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createTestArtist()]))) } },
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
      facade = TestBed.inject(ArtistCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentArtist to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<ArtistCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<ArtistCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<ArtistCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<ArtistCrudFacade>(facade, httpClient));

    test('should load Pictures', async () => {
      facade.loadPictures({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.pictures$);
      expect(result.length).toBe(1);
    });
  });
});
