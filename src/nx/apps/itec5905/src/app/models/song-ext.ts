
import { ISong } from "../../models/artists-webapi";
export interface ISongExt extends ISong {
  image?: string | null;
}