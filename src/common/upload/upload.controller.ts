import { Controller, Response, Get, HttpException, Post, UploadedFile, UseInterceptors, Param, NotFoundException } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { Public } from '../auth/decorators/setmetadata.decorator';
import { FileUtils } from '../../utils/file-utils';
import { Http500 } from '../../utils/Http500';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO, SaveFileDTO } from './dto/file.dto';
import { APP_NAME } from '../../main';

@ApiTags('Upload')
@Controller()
export class UploadController {
    // ----------------------------------------- Save Image ---------------------------------------------//
    // @Public()
    @ApiBearerAuth()
    @ApiCreatedResponse({
        type: FileDTO,
        description: 'File Saved Successfully'
    })
    @ApiInternalServerErrorResponse({ description: 'Unexpected Error' })
    @ApiOperation({ summary: 'Send Image With Field Name =======> file' })
    @ApiBody({ type: SaveFileDTO })
    @ApiConsumes('multipart/form-data')
    @Post('save-file')
    @UseInterceptors(FileInterceptor('file'))
    saveFile(@UploadedFile() file): any {
        if (file.filename === 'ERROR') {
            throw new HttpException('File with same name already exists. Please rename the file and try again.', 400);
        } else {
            return { name: file.filename, path: file.path };
        }
    }

    // ----------------------------------------- Get Image ---------------------------------------------//
    @Public()
    @Get('get-file/:id')
    getFile(@Response() res: Response, @Param('id') id: string) {
        const imagePath = join(process.cwd(), '..', `${APP_NAME}-uploads`, id);
        if (existsSync(imagePath)) {
            const file = createReadStream(imagePath);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            file.pipe(res);
        } else {
            throw new NotFoundException('File Not Found');
        }
    }

    // ----------------------------------------- Delete Image ---------------------------------------------//
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'File deleted Successfully' })
    @ApiInternalServerErrorResponse({ description: 'Unexpected Error' })
    @ApiParam({
        name: 'name',
        type: 'String',
        required: true
    })
    @Post('delete-file/:name')
    deleteFile(@Param('name') name: string): any {
        const imagePath = FileUtils.FilePath + '/' + name;
        try {
            FileUtils.deleteFiles(imagePath, true);
            return { message: 'File deleted Successfully' };
        } catch (error) {
            Http500.throw(error);
        }
    }
}
