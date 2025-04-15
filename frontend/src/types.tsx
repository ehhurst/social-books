import { JSX } from "react";

export interface BookItem {
    title: string;
    author: string;
    work_id: string;
    description: string;
    img_S : string;
    img_M : string,
    img_L: string,
    reading_Time?: number;
}



export interface Reviews {
    work_id: string;
    avg_rating: string;
    reviews_list: Review[];
}

export interface Review {
    review_id: string;
    work_id: string;
    username: string;
    star_rating: number;
    review_text: string;
    liked: boolean;
}



//getting status back from post request
export interface ReviewStatus {
    success: boolean, 
    review: Review
}
export interface CategoryItem {
    query: string, 
    title: string
}

export const categories: CategoryItem[] = [
    {query: "fiction", title: "Fiction"}, 
    {query: "history", title: "History"}, 
    {query: "fantasy", title: "Fantasy"}, 
    {query: "science fiction", title: "Science Fiction"}, 
    {query: "programming", title: "Programming"}
]


export interface ContextProps {
    children: JSX.Element | JSX.Element[]
  }


  export interface User {
    username: string,
    first_name: string,
    last_name: string, 
    access_token: string
  }