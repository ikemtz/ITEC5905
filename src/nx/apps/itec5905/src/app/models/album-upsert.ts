import { IMediaUploadRequest } from "../../models/media-webapi";
import { IAlbumUpsertRequest, } from "../../models/artists-webapi";

export interface IAlbumUpsert {
  album: IAlbumUpsertRequest,
  picture?: IMediaUploadRequest,
}