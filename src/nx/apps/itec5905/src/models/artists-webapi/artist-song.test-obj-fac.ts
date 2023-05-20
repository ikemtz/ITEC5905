/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { ArtistSongProperties } from './artist-song.properties';

export function createTestArtistSong() {
    return { 
      [ArtistSongProperties.ID]: 'ID',
      [ArtistSongProperties.ARTIST_ID]: 'ARTIST_ID',
      [ArtistSongProperties.SONG_ID]: 'SONG_ID',
      [ArtistSongProperties.UPDATE_COUNT]: 0, 
      [ArtistSongProperties.ARTIST]: undefined,
      [ArtistSongProperties.SONG]: undefined,
    };
}
