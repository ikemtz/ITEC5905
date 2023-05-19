/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { CustomerPurchaseProperties } from './customer-purchase.properties';

export function createTestCustomerPurchase() {
    return { 
      [CustomerPurchaseProperties.ID]: 'ID',
      [CustomerPurchaseProperties.ARTISTS_NAME]: 'ARTISTS_NAME',
      [CustomerPurchaseProperties.ARTIST_ID]: 'ARTIST_ID',
      [CustomerPurchaseProperties.SONG_NAME]: 'SONG_NAME',
      [CustomerPurchaseProperties.TRANSACTION_NUM]: 'TRANSACTION_NUM',
      [CustomerPurchaseProperties.RATING]: 0,
      [CustomerPurchaseProperties.SONG_ID]: 'SONG_ID',
      [CustomerPurchaseProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
      [CustomerPurchaseProperties.CREATED_BY]: 'CREATED_BY',
      [CustomerPurchaseProperties.UPDATED_BY]: 'UPDATED_BY',
      [CustomerPurchaseProperties.CREATED_ON_UTC]: new Date(),
      [CustomerPurchaseProperties.UPDATED_ON_UTC]: new Date(),
      [CustomerPurchaseProperties.UPDATE_COUNT]: 0, 
      [CustomerPurchaseProperties.CUSTOMER]: undefined,
    };
}
