import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongo, { Document } from 'mongoose';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 8 })
    password: string;

    @Prop({ required: true, default: UserStatus.ACTIVE, enum: UserStatus })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
