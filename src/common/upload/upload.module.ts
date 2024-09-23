import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { FileUtils } from '../../utils/file-utils';
import { NoGeneratorUtils } from '../../utils/no-generator-utils';

@Module({
    imports: [
        MulterModule.register({
            dest: FileUtils.FilePath,
            storage: diskStorage({
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = FileUtils.FilePath;
                    if (!existsSync(uploadPath)) {
                        mkdirSync(uploadPath);
                    }
                    cb(null, uploadPath);
                },
                filename: async (req: any, file: any, cb: any) => {
                    cb(null, `${await NoGeneratorUtils.generateCode(16)}${extname(file.originalname)}`);
                }
            })
        })
    ],
    controllers: [UploadController],
    providers: []
})
export class UploadModule {}
