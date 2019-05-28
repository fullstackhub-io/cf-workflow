import { Request, Response } from 'express';
import { Role } from '../models/role-model';

export class RoleController {

    public addNewRole(req: Request, res: Response) {
        let role = new Role(req.body);
        role.save((err, role) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully added the role!" });
        });
    }

    public getRole(req: Request, res: Response) {
        console.log("getrole: called");
        Role.find({}, (err, role) => {
            if (err) {
                res.send(err);
            }
            res.json(role);
        });
    }

    public getRoleWithID(req: Request, res: Response) {
        Role.findById(req.params.roleId, (err, role) => {
            if (err) {
                res.send(err);
            }
            res.json(role);
        });
    }

    public updateRole(req: Request, res: Response) {
        Role.findOneAndUpdate({ _id: req.params.roleId }, req.body, { new: true }, (err, role) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully updated the menu!" });
        });
    }

    public deleteRole(req: Request, res: Response) {
        Role.deleteOne({ _id: req.params.roleId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully deleted the role!" });
        });
    }

}