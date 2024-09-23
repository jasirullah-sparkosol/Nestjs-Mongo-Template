import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserStatus } from './schema/user.schema';
import { Model } from 'mongoose';
import { Http500 } from '../../utils/Http500';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    /*****************************************************************************************************************
   Create User
   *****************************************************************************************************************/

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const newUser = new this.userModel(createUserDto);
            const user = await newUser.save();
            // To remove password from the response
            // @ts-ignore
            return await this.findOne(user._id);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User with this email already exists');
            } else {
                Http500.throw(error);
            }
        }
    }

    /*****************************************************************************************************************
   Find All Users
   *****************************************************************************************************************/

    async findAll(): Promise<User[]> {
        try {
            return await this.userModel.find().select('-password').exec();
        } catch (error) {
            throw new NotFoundException('No users found');
        }
    }

    /*****************************************************************************************************************
   Find One User
   *****************************************************************************************************************/

    async findOne(id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id).select('-password').exec();

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne({ email }).select('-password').exec();
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    /*****************************************************************************************************************
   Update User
   *****************************************************************************************************************/

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
            return await this.findOne(id);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User with this email already exists');
            } else {
                Http500.throw(error);
            }
        }
    }

    /*****************************************************************************************************************
   Delete User
   *****************************************************************************************************************/

    async remove(id: string): Promise<User> {
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    /*****************************************************************************************************************
   Authenticate User
   *****************************************************************************************************************/

    async validateEmailAndPassword(email: string, password: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (user && user.password === password && user.status === UserStatus.ACTIVE) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    /*****************************************************************************************************************
   END OF LINES
   *****************************************************************************************************************/
}
