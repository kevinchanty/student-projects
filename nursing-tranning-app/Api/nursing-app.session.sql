select * from users;
select create_at  from student_posts;
select * from post_ratings;
select * from post_images;
select * from post_comments;
select * from post_ratings;
select * from test_records;
select * from request_record;
select created_at::date from request_record;
set time zone 'HKT';
select * from pg_timezone_abbrevs;
select * from pg_timezone_names;

-- Profile Diet
Select json_agg(image) from student_posts
    where user_id = 1
    GROUP by date_trunc('day', create_at)
    order by create_at
;

Select id,image,caption,rating,visibility, create_at from student_posts
    where user_id = 1
    ORDER by create_at;

Select json_agg(id) as id,
json_agg(caption) as captions,
json_agg(rating) as ratings,
json_agg(visibility) as visibility,
date_trunc('day', create_at) as Day
from
    (Select id,caption,rating,visibility, create_at from student_posts
    where user_id = 1
    ORDER by create_at) as a
group by date_trunc('day', create_at)
order by day DESC;

select post_id, json_agg(url) from
(select * from post_images left join student_posts
    on post_images.post_id = student_posts.id
    where user_id = 1
    order by post_images.id) as a
group by post_id;

select * from "post_images" left join "student_posts" on "post_images"."post_id" = "student_posts"."id" where "user_id" = 1 order by "post_images"."id" asc;

select "post_id", json_agg(url) from (select * from "post_images" left join "student_posts" on "post_images"."post_id" = "student_posts"."id" where "user_id" = 1 order by "post_images"."id" asc) as "result" group by "post_id";

-- GetProfile
select id, username, score, calories, biography from users
where id = 1;

select "id", "username", "score", "calories", "biography" from "users" where "id" = 1 ;

-- GetQuota
select * from student_posts 
    where EXTRACT(day from create_at) = EXTRACT(day from timestamp '2021-11-19 08:10:10+08');
select * from student_posts 
    where EXTRACT(day from create_at) = EXTRACT(day from  now())