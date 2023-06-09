/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { ICustomerFavoriteArtist } from './customer-favorite-artist.model';
import { ICustomerFavoriteGenre } from './customer-favorite-genre.model';
import { ICustomerPurchase } from './customer-purchase.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomer {
  id?: string | null;
  name?: string;
  email?: string;
  updateCount?: number | null;
  favoriteArtists?: Partial<ICustomerFavoriteArtist[]>;
  favoriteGenres?: Partial<ICustomerFavoriteGenre[]>;
  purchases?: Partial<ICustomerPurchase[]>;
}
