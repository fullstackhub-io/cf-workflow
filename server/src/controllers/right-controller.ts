import { Right } from '../models/right-model';
import { Request, Response } from 'express';

export class RightController {

    public addNewRight(req: Request, res: Response) {
        let right = new Right(req.body);
        right.save((err, right) => {
            if (err) {
                res.send(err);
            }
           res.json({ success: true, msg: "Successfully added the right!" });
        });
    }

    public getRight(req: Request, res: Response) {
        Right.find({}, (err, right) => {
            if (err) {
                res.send(err);
            }
            res.json(right);
        });
    }

    public getRightWithID(req: Request, res: Response) {
        Right.findById(req.params.rightId, (err, right) => {
            if (err) {
                res.send(err);
            }
            res.json(right);
        });
    }

    public updateRight(req: Request, res: Response) {
        Right.findOneAndUpdate({ _id: req.params.rightId }, req.body, { new: true }, (err, right) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully updated the menu!" });
        });
    }

    public deleteRight(req: Request, res: Response) {
        Right.deleteOne({ _id: req.params.rightId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ success: true, msg: "Successfully deleted the right!" });
        });
    }

}