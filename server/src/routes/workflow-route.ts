import { Request, Response, NextFunction, Router } from "express";
import { WorkflowController } from "../controllers/workflow-controller";

export class WorkflowRoutes {
   public workflowController: WorkflowController = new WorkflowController();

   public routes(app: Router): void {

      app.route('/')
         .get((req: Request, res: Response) => {
            res.status(200).send({
               message: 'GET request successfull!'
            })
         })

      app.route('/wfstep')
         .get(this.workflowController.getNewWorkflowStep)
         .post(this.workflowController.addNewWorkflowStep);

      // Contact detail
      app.route('/wfstep/:stepId')
         // get specific contact
         .get(this.workflowController.getNewWorkflowStepWithCode)
         .put(this.workflowController.updateNewWorkflowStep)
         .delete(this.workflowController.deleteNewWorkflowStep)

   }

}