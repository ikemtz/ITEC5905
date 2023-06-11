import { FileRestrictions } from '@progress/kendo-angular-upload';

export * from './media-upload-requests.module';
export * from './media.facade';
export * from './media.service';
export * from './image.service';

export const photoRestrictions: FileRestrictions = {
  allowedExtensions: ['jpg', 'jpeg', 'png'],
  maxFileSize: 1000000,
};
export const fileTypeRegex = /^data:[a-z/;0-9]*;base64/;
export const fileContentRegex = /[A-z0-9=/+]*$/;