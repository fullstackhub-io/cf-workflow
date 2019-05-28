import { Request, Response } from 'express';
import { User } from '../models/user-model';

export class UserController {

    public addNewUser(req: Request, res: Response) {
        let user = new User(req.body);
        user.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully added the user!" });
        });
    }

    public getUser(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithID(req: Request, res: Response) {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully updated the user!" });
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully deleted the user!" });
        });
    }

    public loginUser(req: Request, res: Response) {
        let user = new User(req.body);
        User.findOne({ userName: user.userName, password: user.password }, (err, user) => {
            if (err) {
                res.send(err);
            }
            if (user == null)
                res.json({ success: false, msg: "User doesn't exist!" });
            else
                res.json({ success: true, data: user });
        })
    }

}