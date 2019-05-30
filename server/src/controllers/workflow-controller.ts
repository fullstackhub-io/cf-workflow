import { Request, Response } from 'express';
import { Workflow } from '../models/workflow-model';

export class WorkflowController {

    public addNewWorkflowStep(req: Request, res: Response) {
        let role = new Workflow(req.body);
        role.save((err, workflow) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully added the workflow step!" });
        });
    }

    public getNewWorkflowStep(req: Request, res: Response) {
        Workflow.find({}, (err, workflow) => {
            if (err) {
                res.send(err);
            }
            res.json(workflow);
        });
    }

    public getNewWorkflowStepWithCode(req: Request, res: Response) {
        Workflow.findOne({stepCode:req.params.stepId}, (err, workflow) => {
            if (err) {
                res.send(err);
            }
            if (workflow == null)
                res.json({ success: false });
            else
                res.json({ success: true, data: workflow });
        });
    }


    public updateNewWorkflowStep(req: Request, res: Response) {
        Workflow.findOneAndUpdate({ _id: req.params.stepId }, req.body, { new: true }, (err, role) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully updated the workflow step!" });
        });
    }

    public deleteNewWorkflowStep(req: Request, res: Response) {
        Workflow.deleteOne({ _id: req.params.roleId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully deleted the workflow step!" });
        });
    }

}