import { Request, Response, NextFunction, Router } from "express";
import { RoleController } from "../controllers/role-controller";

export class RoleRoutes {
   public roleController: RoleController = new RoleController();

   public routes(app: Router): void {

      app.route('/')
         .get((req: Request, res: Response) => {
            res.status(200).send({
               message: 'GET request successfull!'
            })
         })

      app.route('/role')
         .get(this.roleController.getRole)
         .post(this.roleController.addNewRole);

      // Contact detail
      app.route('/role/:roleId')
         // get specific contact
         .get(this.roleController.getRoleWithID)
         .put(this.roleController.updateRole)
         .delete(this.roleController.deleteRole)

   }

}