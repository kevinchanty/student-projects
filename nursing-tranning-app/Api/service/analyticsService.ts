import { Knex } from "knex";
import { RequestRecord } from "../controller/analyticsController";

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(1, 235, 255, 0.2)",
];
const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(1, 235, 255, 1)",
];

const borderWidth = 1;

const dataset = {
  backgroundColor,
  borderColor,
  borderWidth,
};

export class AnalyticsService {
  constructor(private knex: Knex) { }

  async requestLogger(record: RequestRecord) {
    await this.knex("request_record").insert(record);
  }

  async getNewUser() {
    let WEEK = 1000 * 60 * 60 * 24 * 7;
    let DAY = 1000 * 60 * 60 * 24;
    let now = new Date().getTime();
    let MONTH = new Date().getMonth() - 1;
    let YEAR = new Date().getFullYear();
    let firstDayOfMonth = new Date(YEAR, MONTH, 1);
    let lastWeek = new Date(now - WEEK);
    let lastDay = new Date(now - DAY);

    const dayResult = await this.knex
      .count("* as count")
      .from("users")
      .where("created_at", ">=", lastDay)
      .first();

    const weekResult = await this.knex
      .count("* as count")
      .from("users")
      .where("created_at", ">=", lastWeek)
      .first();

    const monthResult = await this.knex
      .count("* as count")
      .from("users")
      .where("created_at", ">=", firstDayOfMonth)
      .first();

    let result = {};
    if (weekResult && dayResult && monthResult) {
      result = {
        day: parseInt(dayResult.count + ""),
        week: parseInt(weekResult.count + ""),
        month: parseInt(monthResult.count + ""),
      };
    } else {
      throw new Error("Result not found");
    }
    return result;
  }

  async getLoginChart(startDate: Date, endDate: Date) {
    //AT TIME ZONE 'UTC'
    const dayResult = await this.knex("request_record")
      .select(this.knex.raw("to_char(created_at, 'DD-MM-YYYY') date"))
      .count("* as count")
      .where("created_at", ">=", startDate)
      .andWhere("created_at", "<", endDate)
      .andWhere("path", "like", "/user/login/%")
      .groupBy('date');

    console.log(dayResult);


    const aggDayResult = dayResult.reduce((agg: any, record: any) => {
      agg.labels.push(record.date);
      agg.data.push(record.count);
      return agg;
    }, { labels: [], data: [] })

    const dayProcessed = {
      labels: aggDayResult.labels,
      datasets: [
        {
          label: "# of Logins by Day",
          data: aggDayResult.data,
          ...dataset,
        },
      ],
    };
    // const data = {
    //   day: dayResult!.count,
    // }
    return dayProcessed;
  }

  async getUserByName(name: string) {
    const result = await this.knex("users")
      .select("username", "id")
      .where("username", "LIKE", `%${name}%`)
      .orderBy("username")

    return result
  };

  async getUserStats(userId: number) {
    const postCount = await this.knex("student_posts")
      .count("* as postCount")
      .where("user_id", "=", userId)
      .first();

    const starCount = await this.knex("post_ratings")
      .sum("rating as starCount")
      .join("student_posts", "post_ratings.post_id", "student_posts.id")
      .where("student_posts.user_id", "=", userId)
      .first();

    const correctCount = await this.knex("test_records")
      .count("* as correctCount")
      .where("user_id", "=", userId)
      .andWhere("is_correct","=",true)
      .first();

    const wrongCount = await this.knex("test_records")
      .count("* as wrongCount")
      .where("user_id", "=", userId)
      .andWhere("is_correct","=",false)
      .first();

    const result = {
      ...postCount,
      ...starCount,
      ...correctCount,
      ...wrongCount,
    };
    return result;
  };
}
