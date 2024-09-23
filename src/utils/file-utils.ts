import * as fs from 'fs';
import * as path from 'path';
import { FileSchema } from '../common/upload/schema/file.schema';
import { APP_NAME } from '../main';

export class FileUtils {
    static FilePath = path.join(process.cwd(), '..', `${APP_NAME}-uploads`);

    static deleteFiles(deletedFiles: any, fromPathList: boolean): void {
        try {
            if (fromPathList) {
                if (Array.isArray(deletedFiles)) {
                    for (const delImg of deletedFiles) {
                        fs.unlinkSync(delImg.toString());
                    }
                } else {
                    fs.unlinkSync(deletedFiles.toString());
                }
            } else {
                if (Array.isArray(deletedFiles)) {
                    for (const File of deletedFiles) {
                        fs.unlinkSync(File.path.toString());
                    }
                } else fs.unlinkSync((deletedFiles as FileSchema).path.toString());
            }
        } catch (e) {
            console.error('Error deleting files: ', e);
        }
    }
}
