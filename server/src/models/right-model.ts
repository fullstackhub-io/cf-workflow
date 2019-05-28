import { Document, Schema, Model, model } from "mongoose";

export interface IRight {
    rightName?: string,
    rightCode?: string,
    description: string,
    dateAdded: Date,
    dateUpdated: Date
}

export interface IRightModel extends IRight, Document { }

export var RightSchema: Schema = new Schema({
    rightName: { type: String, required: true },
    rightCode: { type: String, required: true },
    description: String,
    dateAdded: Date,
    dateUpdated: Date
});

RightSchema.pre<IRightModel>("save", function (next) {
    let now = new Date();
    if (!this.dateAdded) {
        this.dateAdded = now;
    }
    this.dateUpdated = now;
    next();
});

export const Right: Model<IRightModel> = model<IRightModel>("right", RightSchema);



