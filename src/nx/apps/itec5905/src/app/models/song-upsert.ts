import { ISongUpsertRequest } from "../../models/artists-webapi";
import { IMediaUploadRequest } from "../../models/media-webapi";

export interface ISongUpsert {
  song: ISongUpsertRequest,
  picture?: IMediaUploadRequest,
  audio?: IMediaUploadRequest,
}