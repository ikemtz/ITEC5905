
import { IAlbum } from "../../models/artists-webapi";
export interface IAlbumExt extends IAlbum {
  image?: string | null;
}