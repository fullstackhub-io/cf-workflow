import express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import { RoleRoutes } from "./routes/role-route";
import { RightRoutes } from "./routes/right-route";
import { UserRoutes } from "./routes/user-route";

class App {

    public app: express.Application = express();
    public rightRoute: RightRoutes = new RightRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public userRoutes: UserRoutes = new UserRoutes();

    public mongoUrl: string = 'mongodb://naep:password1@ds259586.mlab.com:59586/cf-workflow';

    constructor() {
        this.config();
        this.mongoSetup();
        
        this.rightRoute.routes(this.app);
        this.roleRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;