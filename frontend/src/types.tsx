import { JSX } from "react";

export interface BookItem {
    title: string;
    author: string;
    work_ID: string;
    description: string;
    img_S : string;
    img_M : string,
    img_L: string,
    reading_Time: number;
}

export interface Review {
    reviewId: string;
    username: string;
    rating: number;
    reviewText: string;
    liked: boolean;
}

export const categories : string[] = [
    "Fiction", 
    "Poetry", 
    "Fantasy", 
    "History",
    "Science fiction", 
    "Programming"
]

export interface ContextProps {
    children: JSX.Element | JSX.Element[]
  }