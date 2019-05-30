import { Document, Schema, Model, model } from "mongoose";

interface IWorkflowStep {
    seqNum: number,
    stepName: string,
    stepCode: string,
    assignees: string[],
    isEmailRequired: boolean,
    emailMessage: string
}

export interface IWorkflowModel extends IWorkflowStep, Document { }

export var WorkflowSchema: Schema = new Schema({
    seqNum: { type: Number, required: true },
    stepName: { type: String, required: true },
    stepCode: { type: String, required: true },
    assignees: [],
    isEmailRequired: Boolean,
    emailMessage: String
});


export const Workflow: Model<IWorkflowModel> = model<IWorkflowModel>("workflow", WorkflowSchema);


