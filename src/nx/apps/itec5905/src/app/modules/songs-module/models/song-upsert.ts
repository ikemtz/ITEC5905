import { ISongUpsertRequest } from "apps/itec5905/src/models/artists-webapi";
import { IMediaUploadRequest } from "apps/itec5905/src/models/media-webapi";

export interface ISongUpsert {
  song: ISongUpsertRequest,
  picture?: IMediaUploadRequest,
  audio?: IMediaUploadRequest,
}