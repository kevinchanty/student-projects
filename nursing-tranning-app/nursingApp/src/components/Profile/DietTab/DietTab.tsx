import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DietCard from "./DietCard";


export type DietPostList = DietPost[];

export type DietPost = {
    id: number[]
    images: string[]
    captions: string[]
    ratings: number[]
    visibility: boolean[]
    day: string
};

const DietTab: FC = () => {
    const paras = useParams<{ userId: string }>();
    const userId = parseInt(paras.userId);
    const [dietPostList, setDietPostList] = useState<DietPostList>();

    const seed = ()=>setDietPostList([
        {
            id: [1, 2, 3],
            images: ["https://picsum.photos/300", "https://picsum.photos/300", "https://picsum.photos/300"],
            captions: ["captions", "captions", "captions"],
            ratings: [3, 3, 3],
            visibility: [true, true, true],
            day: "2021-10-01"
        },
        {
            id: [5,6,7],
            images: ["https://picsum.photos/300", "https://picsum.photos/300", "https://picsum.photos/300"],
            captions: ["captions", "captions", "captions"],
            ratings: [3, 3, 3],
            visibility: [true, true, true],
            day: "2021-10-01"
        },
        {
            id: [8,9,10],
            images: ["https://picsum.photos/300", "https://picsum.photos/300", "https://picsum.photos/300"],
            captions: ["captions", "captions", "captions"],
            ratings: [3, 3, 3],
            visibility: [true, true, true],
            day: "2021-10-01"
        },
    ])

    useEffect(() => {
        seed()
    }, [])

    return (
        <div>
            {dietPostList
                ? dietPostList.map((item, index) =>
                    <DietCard
                        key={index}
                        id={item.id}
                        images={item.images}
                        captions={item.captions}
                        visibility={item.visibility}
                        ratings={item.ratings}
                        day={item.day}
                    />)
                : null}
            {/* TODO: What to display when you have no post. */}
        </div>
    )
}

export default DietTab;