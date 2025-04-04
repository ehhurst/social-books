import { useEffect, useState } from "react";
import { BookItem, Review, Reviews } from "../types";
import axios from "../../axiosConfig"

export function getBook(uri:string) {
    const [data, setData] = useState<BookItem>();
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(null); // handle errors gracefully  

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => setData(response.data))
        .catch((error) => {
            console.error("❌ Book Fetch Error:", error);
            setError("Error loading book data. Please try again later.");
        }).finally(() => setLoading(false))
    }, [uri]);

    return {data, loading, error}
}


export function getBooks(uri:string) {
    const [data, setData] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(null); // handle errors gracefully   

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => setData(response.data))
        .catch((error) => {
            console.error(error);
            setError("Error loading books. Please try again later.");
        }).finally(() => setLoading(false))
    }, [uri]);

    return {data, loading, error}
}

export function getReviewsForUser(uri:string) {
    const [reviewData, setReviewData] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(null); // handle errors gracefully

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            console.log(response.data)
            setReviewData(response.data)})
        .catch((error) => {
            console.error(error);
            setError("Failed to load reviews. Please try again later.");
        })
        .finally(() => setLoading(false))
    }, [uri]); // run on initial page load


    return {reviewData, loading, error}
}

export function getReviewsForBook(uri:string) {
    const [reviewData, setReviewData] = useState<Reviews>();
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(null); // handle errors gracefully

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            console.log(response.data)
            setReviewData(response.data)})
        .catch((error) => {
            console.error(error);
            setError("Failed to load reviews. Please try again later.");
        })
        .finally(() => setLoading(false))
    }, [uri]); // run on initial page load


    return {reviewData, loading, error}
}
