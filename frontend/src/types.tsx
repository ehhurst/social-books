export interface BookItem {
    // bookId?
    isbn: number;
    title: string;
    author_name: string;
    description: string;
    readTime: number; // or numPages if frontend is going to do the calculation
}

export interface Review {
    reviewId: number;
    profileId: number;
    isbn: number; // or bookId?
    rating: number;
    reviewText: string;
    liked: boolean;
}