import { PhotoFeedController } from "./photoFeedController";
import { PhotoFeedService } from "../service/photoFeedService";
import { Knex } from "knex";

jest.mock('../service/photoFeedService.ts');

describe ("PhotoFeedController", () => {
    let controller: PhotoFeedController
    let service: PhotoFeedService

    beforeEach(() => {
        service = new PhotoFeedService({} as Knex)
        controller= new PhotoFeedController(service)
    })

    it ("should have getPostQuota", ()=> {
        expect(controller.getPhotoFeed).toBeDefined()
    })
})