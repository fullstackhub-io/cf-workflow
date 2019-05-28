import { Request, Response, NextFunction, Router } from "express";
import { RightController } from "../controllers/right-controller";

export class RightRoutes {
   public rightController: RightController = new RightController();

   public routes(app: Router): void {

      app.route('/')
         .get((req: Request, res: Response) => {
            res.status(200).send({
               message: 'GET request successfulll!'
            })
         })

      app.route('/right')
         .get(this.rightController.getRight)
         .post(this.rightController.addNewRight);

      // Contact detail
      app.route('/right/:rightId')
         // get specific contact
         .get(this.rightController.getRightWithID)
         .put(this.rightController.updateRight)
         .delete(this.rightController.deleteRight)

   }

}