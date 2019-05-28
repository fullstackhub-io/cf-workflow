import { Document, Schema, Model, model } from "mongoose";

export interface IUser {
    userName?: string,
    email?: string,
    firstName: string,
    lastName: string,
    password: string,
    roles: String[],
    dateAdded: Date,
    dateUpdated: Date
}

export interface IUserModel extends IUser, Document { }

export var UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    roles:  [],
    dateAdded: Date,
    dateUpdated: Date
});

UserSchema.pre<IUserModel>("save", function (next) {
    let now = new Date();
    if (!this.dateAdded) {
        this.dateAdded = now;
    }
    this.dateUpdated = now;
    next();
});

export const User: Model<IUserModel> = model<IUserModel>("user", UserSchema);



