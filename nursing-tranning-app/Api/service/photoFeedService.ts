import { Knex } from "knex";

export class PhotoFeedService {
    constructor(private knex: Knex) { }

    getPostQuota = async (userId: number) => {
        const rows = await this.knex
            .select("*")
            .from("student_posts")
            .where("user_id", userId);

        const todayRows = rows.filter((row) => {
            const date = new Date(row.create_at).getDate();
            return date === new Date().getDate();
        });

        const result = 3 - todayRows.length;

        return result;
    };

    // Beeno's work
    getUserPostPreviewList = async (options: {
        user_id: number;
        page: number;
        countPerPage: number;
    }) => {
        let { user_id, page, countPerPage } = options;
        let posts = await this.knex
            .select("caption", "rating", "id")
            .from("student_posts")
            .where({ user_id })
            .orderBy("create_at", "desc")
            .limit(countPerPage)
            .offset(countPerPage * page);
        for (let post of posts) {
            let rows = await this.knex
                .select("url")
                .from("post_images")
                .where({ post_id: post.id });
            post.images = rows.map((row) => row.url);
        }
        return posts;
    };

    getPhotoFeed = async (options: {
        userId: number;
        is_poly: boolean;
        page: number;
        countPerPage: number;
    }) => {
        const { userId, is_poly, page, countPerPage } = options;
        // Student_Posts
        const results = await this.knex
            .select("student_posts.*", "users.username", "users.is_poly", "users.profile_picture")
            .from("student_posts")
            .orderBy("create_at", "desc")
            .limit(countPerPage)
            .offset(countPerPage * (page - 1))
            .join("users", { "student_posts.user_id": "users.id" })

        const postIds = results.reduce((agg, result) => {
            agg.push(result.id)
            return agg
        }, []);
        // Post_images
        const images = await this.knex
            .select("*")
            .from("post_images")
            .whereIn("post_id", postIds)
            .orderBy("id")

        const aggImages = images.reduce((agg, image) => {
            if (!agg[image.post_id]) {
                agg[image.post_id] = [image.url]
            } else {
                agg[image.post_id].push(image.url)
            }
            return agg
        }, {});

        // Rating
        const ratings = await this.knex("post_ratings")
            .select("post_id")
            .sum('rating')
            .whereIn("post_id", postIds)
            .groupBy('post_id')

        const aggRatings = ratings.reduce((agg, rating) => {
            agg[rating.post_id] = rating.sum;
            return agg
        }, {});

        const myRatings = await this.knex("post_ratings")
            .select("post_id", "rating")
            .where("user_id", userId)

        const aggMyRatings = myRatings.reduce((agg, myRating) => {
            agg[myRating.post_id] = myRating.rating
            return agg
        }, {})

        // Mask all Anonymous post + Merge photo url + Merge ratings + Delete
        const processed = results.map(result => {
            let newUsername: string = result.username;
            let newUserId: string = result.user_id;

            if (!result.visibility || (result.is_poly && !is_poly)) {
                newUserId = ""
                newUsername = "Anonymous"
            }

            delete result.visibility
            // delete result.is_poly;
            return {
                ...result,
                user_id: newUserId,
                username: newUsername,
                images: aggImages[result.id] || [],
                ratings: aggRatings[result.id] || '0',
                myRating: aggMyRatings[result.id],
            };
        });
        return processed;
    };

    getProfile = async (options: {
        searchId: number;
        isMyProfile: boolean;
        page: number;
        countPerPage: number;
    }) => {
        const { searchId, isMyProfile, page, countPerPage } = options;

        let results: any[];
        if (isMyProfile) {
            results = await this.knex
                .select("student_posts.*", "users.username", "users.is_poly", "users.profile_picture")
                .from("student_posts")
                .where("user_id", searchId)
                .orderBy("create_at", "desc")
                .limit(countPerPage)
                .offset(countPerPage * (page - 1))
                .join("users", { "student_posts.user_id": "users.id" })
        } else {
            results = await this.knex
                .select("student_posts.*", "users.username", "users.is_poly", "users.profile_picture")
                .from("student_posts")
                .where("user_id", searchId)
                .andWhere("student_posts.visibility", true)
                .orderBy("create_at", "desc")
                .limit(countPerPage)
                .offset(countPerPage * (page - 1))
                .join("users", { "student_posts.user_id": "users.id" })//TODO check other's profile
        }

        const postIds = results.reduce((agg, result) => {
            agg.push(result.id)
            return agg
        }, []);

        // Post_images
        const images = await this.knex
            .select("*")
            .from("post_images")
            .whereIn("post_id", postIds)
            .orderBy("id")

        const aggImages = images.reduce((agg, image) => {
            if (!agg[image.post_id]) {
                agg[image.post_id] = [image.url]
            } else {
                agg[image.post_id].push(image.url)
            }
            return agg
        }, {});

        // Rating
        const ratings = await this.knex("post_ratings")
            .select("post_id")
            .sum('rating')
            .whereIn("post_id", postIds)
            .groupBy('post_id')

        const aggRatings = ratings.reduce((agg, rating) => {
            agg[rating.post_id] = rating.sum;
            return agg
        }, {});

        const myRatings = await this.knex("post_ratings")
            .select("post_id", "rating")
            .where("user_id", searchId)

        const aggMyRatings = myRatings.reduce((agg, myRating) => {
            agg[myRating.post_id] = myRating.rating
            return agg
        }, {})

        // Mask all Anonymous post + Merge photo url + Merge ratings + Delete
        const processed = results.map(result => {
            let newUsername: string = result.username;
            let newUserId: string = result.user_id;

            if (!result.visibility && !isMyProfile) {
                newUserId = ""
                newUsername = "Anonymous"
            }

            delete result.visibility
            delete result.profile_picture

            // delete result.is_poly;
            return {
                ...result,
                user_id: newUserId,
                username: newUsername,
                images: aggImages[result.id] || [],
                ratings: aggRatings[result.id],
                myRating: aggMyRatings[result.id],
            };
        });
        return processed;
    };

    addPost = async (options: {
        userId: number;
        caption: string;
        isVisable: boolean;
        images?: string[];
    }) => {
        const { caption, isVisable, images, userId } = options
        await this.knex.transaction(async txn => {
            const postId = await txn("student_posts")
                .insert({
                    user_id: userId,
                    caption,
                    visibility: isVisable,
                    create_at: new Date(),
                    update_at: new Date(),
                })
                .returning("id")

            const newImages = images?.map(image => ({
                post_id: postId[0],
                url: image
            }))
            
            await txn("post_images")
                .insert(newImages)
        })
    };

    postRatings = async (postId: number, rating: number, userId: number) => {
        const result = await this.knex("post_ratings")
            .insert({
                user_id: userId,
                post_id: postId,
                rating: rating,
            })
        return result;
    };
};