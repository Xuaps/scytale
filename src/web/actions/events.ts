import { Subject } from 'rxjs';
import { EncryptedFile, SharedFile } from "../model";

export const FileUploadRequested = new Subject<EncryptedFile>()
export const FileAdded = new Subject<File>()
export const DownloadAFileRequested = new Subject<SharedFile>()
export const FileDeletionRequested = new Subject<SharedFile>()
export const FileStatsRequested = new Subject<SharedFile>()
