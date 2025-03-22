import { useEffect, useState } from "react";
import { BookItem } from "../types";
import axios from "axios";


export function useFetch(uri:string) {
    const [data, setData] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => setData(response.data))
        .catch((error) => {
            console.error(error);
            setError("Error loading data. Please try again later.");
        }).finally(() => setLoading(false))
    }, [uri]);

    return {data, loading, error}
}

