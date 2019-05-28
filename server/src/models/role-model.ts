import { Document, Schema, Model, model } from "mongoose";

export interface IRole {
    roleName?: string,
    roleCode?: string,
    description?: string,
    rights: String[],
    dateAdded: Date,
    dateUpdated: Date
}

export interface IRoleModel extends IRole, Document { }

export var RoleSchema: Schema = new Schema({
    roleName: { type: String, required: true },
    roleCode: { type: String, required: true },
    rights: [],
    description: String,
    dateAdded: Date,
    dateUpdated: Date
});

RoleSchema.pre<IRoleModel>("save", function (next) {
    let now = new Date();
    if (!this.dateAdded) {
        this.dateAdded = now;
    }
    this.dateUpdated = now;
    next();
});

export const Role: Model<IRoleModel> = model<IRoleModel>("role", RoleSchema);



