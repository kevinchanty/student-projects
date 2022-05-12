import { NextFunction, Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { Bearer } from "permit";
import { AnalyticsService } from "../service/analyticsService";
import { Details } from "express-useragent";
import { createCompilerHost } from "typescript";

const permit = new Bearer({
    query: "access_token",
});

export type RequestRecord = {
    method: string;
    path: string;
    browser: string;
    version: string;
    os: string;
    platform: string;
    source: string;
    user_id?: number;
};
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) { }

    requestLogger = async (req: Request, res: Response, next: NextFunction) => {
        const token = permit.check(req);
        console.log(req.method, req.url);

        const { browser, version, os, platform, source } =
            req.useragent as Details;

        let record: RequestRecord = {
            method: req.method,
            path: req.url,
            browser,
            version,
            os,
            platform,
            source,
        };

        let jwtPayload: { email: string; id: number };
        try {
            jwtPayload = jwtDecode(token as string); //Check if token is issued by us
            if (jwtPayload.id) {
                record = {
                    user_id: jwtPayload.id,
                    ...record,
                };
            }
        } catch (e) {
        }

        try {
            await this.analyticsService.requestLogger(record);
        } catch (e) {
            console.log("Logger Error");
            console.log(e);
        }
        next();
    };

    getNewUser = async (req: Request, res: Response) => {
        try {
            const result = await this.analyticsService.getNewUser();
            res.json(result);
            return;
        } catch (e) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    };

    getBarChart = async (req: Request, res: Response) => {
        const data = {
            labels: [
                "Red",
                "Blue",
                "Yellow",
                "Green",
                "Purple",
                "Orange",
                "Cyan",
            ],
            datasets: [
                {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2, 3, 7],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(1, 235, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(1, 235, 255, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const type: string = req.params.type;
        const startDate = new Date(req.query.sd + "");
        let endDate = new Date(req.query.ed + "");
        endDate.setDate(endDate.getDate() + 1);

        try {
            let result;
            switch (type) {
                case "login":
                    result = await this.analyticsService.getLoginChart(
                        startDate,
                        endDate
                    );
                    break;
                default:
                    result = data;
            }
            res.json(result);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    };

    getUserByName = async (req: Request, res: Response) => {
        const name = req.query.name + ""
        try {
            const result = await this.analyticsService.getUserByName(name);
            res.json(result);
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    };

    getUserStats = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId + "");
        try {
            const result = await this.analyticsService.getUserStats(userId);
            res.json(result);

        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
    }
}
