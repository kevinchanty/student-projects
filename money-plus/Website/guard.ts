import { NextFunction, Request, Response } from 'express';


export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session['user']) {
        next();
    } else {
        res.redirect('/');
    }
}

export function isLoggedInAPI(req: Request, res: Response, next: NextFunction) {
    if (req.session['user']) {
        next();
    } else {
        res.status(401).json({msg:"Unauthorized"});
    }
}
