import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto/user.dto';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /*****************************************************************************************************************
     Create User
     *****************************************************************************************************************/

    @ApiOkResponse({
        type: UserResponse,
        description: 'User Created Successfully'
    })
    @ApiInternalServerErrorResponse({
        description: 'Some Unknown Error Occurred'
    })
    @ApiOperation({ description: 'Create New User' })
    @ApiConflictResponse({
        description: 'User with this email already exists'
    })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    /*****************************************************************************************************************
     Find All Users
     *****************************************************************************************************************/

    @ApiOkResponse({
        type: [UserResponse],
        description: 'Users Found Successfully'
    })
    @ApiInternalServerErrorResponse({
        description: 'Some Unknown Error Occurred'
    })
    @ApiOperation({ description: 'Get All Users' })
    @ApiNotFoundResponse({
        description: 'Users Not Found'
    })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    /*****************************************************************************************************************
     Find One User
     *****************************************************************************************************************/

    @ApiOkResponse({
        type: UserResponse,
        description: 'User Found Successfully'
    })
    @ApiInternalServerErrorResponse({
        description: 'Some Unknown Error Occurred'
    })
    @ApiOperation({ description: 'Get Specific User' })
    @ApiNotFoundResponse({
        description: 'User Not Found'
    })
    @ApiParam({
        type: String,
        name: 'id',
        description: 'User Id'
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    /*****************************************************************************************************************
     Update User
     *****************************************************************************************************************/

    @ApiOkResponse({
        type: UserResponse,
        description: 'User Updated Successfully'
    })
    @ApiInternalServerErrorResponse({
        description: 'Some Unknown Error Occurred'
    })
    @ApiOperation({ description: 'Update User' })
    @ApiConflictResponse({
        description: 'User with this email already exists'
    })
    @ApiParam({
        type: String,
        name: 'id',
        description: 'User Id'
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    /*****************************************************************************************************************
     Delete User
     *****************************************************************************************************************/

    @ApiOkResponse({
        type: UserResponse,
        description: 'User Deleted Successfully'
    })
    @ApiInternalServerErrorResponse({
        description: 'Some Unknown Error Occurred'
    })
    @ApiOperation({ description: 'Delete User' })
    @ApiNotFoundResponse({
        description: 'User Not Found'
    })
    @ApiParam({
        type: String,
        name: 'id',
        description: 'User Id'
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    /*****************************************************************************************************************
     END OF LINES
     *****************************************************************************************************************/
}
