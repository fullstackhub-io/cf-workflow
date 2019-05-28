import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "../controllers/user-controller";


export class UserRoutes {
   public userController: UserController = new UserController();

   public routes(app: Router): void {

      app.route('/')
         .get((req: Request, res: Response) => {
            res.status(200).send({
               message: 'GET request successfulll!'
            })
         })

      app.route('/user')
         .get(this.userController.getUser)
         .post(this.userController.addNewUser);

      app.route('/user/:userId')
         .get(this.userController.getUserWithID)
         .put(this.userController.updateUser)
         .delete(this.userController.deleteUser);

      app.route('/user/login')
         .post(this.userController.loginUser);

   }

}