/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPicture {
  id?: string | null;
/**
 * Max length is 1 Megabyte
 */
  blob?: string;
  type?: string;
  createdBy?: string;
  updatedBy?: string | null;
  createdOnUtc?: Date | null;
  updatedOnUtc?: Date | null;
  updateCount?: number | null;
}