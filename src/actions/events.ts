import { Subject } from "rxjs";
import { EncryptedFile, SharedFile } from "../model";
import { State } from "../store";

export const FileUploadRequested = new Subject<{ file: EncryptedFile; state: State }>();
export const FileAdded = new Subject<{ file: File; state: State }>();
export const DownloadAFileRequested = new Subject<{ file: SharedFile; state: State }>();
export const FileDeletionRequested = new Subject<{ file: SharedFile; state: State }>();
export const FileStatsRequested = new Subject<{ file: SharedFile; state: State }>();
