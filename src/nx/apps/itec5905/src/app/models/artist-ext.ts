
import { IArtist } from "../../models/artists-webapi";
export interface IArtistExt extends IArtist {
  image?: string | null;
}