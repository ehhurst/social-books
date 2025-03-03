export interface BookItem {
    isbn: string;
    title: string;
    author_name: string;
    description: string;
    readTime: number;
}

export interface Review {
    reviewId: string;
    username: string;
    isbn: number; 
    rating: number;
    reviewText: string;
    liked: boolean;
}