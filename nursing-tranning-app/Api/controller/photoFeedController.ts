import { Request, Response } from "express";
import { PhotoFeedService } from "../service/photoFeedService";

export class PhotoFeedController {
    constructor(private photoFeedService: PhotoFeedService) { };

    getPostQuota = async (req: Request, res: Response) => {
        const userId = req.user.id;
        try {
            const result = await this.photoFeedService.getPostQuota(userId);
            res.send(result.toString())
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
        }
    };

    getPhotoFeed = async (req: Request, res: Response) => {
        const user = req.user; // Get User from Middleware

        const page = parseInt(req.query.p + "")
        const countPerPage = parseInt(req.query.cpp + "");

        if (isNaN(page) || isNaN(countPerPage)) {
            res.status(400).json({ error: "Invalid page or cpp" });
            return
        };

        try {
            const result = await this.photoFeedService.getPhotoFeed({
                userId: user.id,
                is_poly: user.is_poly,
                page: page,
                countPerPage: countPerPage,
            })
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" })
        }
    };

    getProfile = async (req: Request, res: Response) => {
        if (!req.user.id) {res.status(500).json({error:"Internal server error"})}
        const userId = req.user.id; // Get User from Middleware
        const searchId = parseInt(req.query.searchId + "");
        const page = parseInt(req.query.p + "")
        const countPerPage = parseInt(req.query.cpp + "");

        if (isNaN(searchId) || isNaN(page) || isNaN(countPerPage)) {
            res.status(400).json({ message: "Invalid Query" })
            return
        }
        const isMyProfile = userId === searchId

        try {
            const result = await this.photoFeedService.getProfile({ searchId, isMyProfile, page, countPerPage })
            res.json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" })
        }
    };

    addPost = async (req: Request, res: Response) => {
        const { caption, visibility } = req.body;

        const isVisable = (visibility === 'true');
        let images
        if (req.files) {
            images = (req.files as Express.Multer.File[]).map(file => file.filename)
        };
        const userId = req.user.id;

        try {
            await this.photoFeedService.addPost({ caption, isVisable, images, userId });

            res.status(201).json({ message: "Success" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error." })
        }
    };

    postRating = async (req: Request, res: Response) => {
        const userId = req.user.id
        console.log(req.body);
        
        let postId
        let rating
        try {
            postId = req.body.postId;
            rating = req.body.rating;
            if (!postId || !rating) { throw new Error }
        } catch (e) {
            res.status(400).json({ error: "Bad Request." });
            return
        }


        try {
            await this.photoFeedService.postRatings(postId, rating, userId);
            res.status(201).json({ message: "Success" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error." })
        }
    }
}

