import { IMediaUploadRequest } from "../../models/media-webapi";
import { IArtistUpsertRequest } from "../../models/artists-webapi";

export interface IArtistUpsert {
  artist: IArtistUpsertRequest,
  picture?: IMediaUploadRequest,
}