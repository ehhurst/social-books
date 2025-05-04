import { useEffect, useState } from "react";
import { BookItem, Review, Reviews, User } from "../types";
import axios from "../../axiosConfig"
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useCompetitions } from "../Contexts/CompetitionContext";

export function getBook(uri:string) {
    const [data, setData] = useState<BookItem>();
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  

    useEffect(() => {
        setLoading(true);
        setError('');

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
    const [error, setError] = useState(''); // handle errors gracefully   

    useEffect(() => {
        setLoading(true);
        setError('');

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
    const nav = useNavigate();
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully
    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(uri, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
              },
        })
        .then((response) => {
            setReviewData(response.data)})
        .catch((error) => {
            (error.response.status == 401) ? nav('/login') : 
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
    const [error, setError] = useState(''); // handle errors gracefully

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(uri, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            setReviewData(response.data)})
        .catch((error) => {
            console.error(error);
            setError("Failed to load reviews. Please try again later.");
        })
        .finally(() => setLoading(false))
    }, [uri]); // run on initial page load


    return {reviewData, loading, error}
}


export function getBooksInShelf(uri:string) {
    const [shelfBooks, setShelfBooks] = useState<BookItem[]>();
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(uri, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }

        })
        .then((response) => setShelfBooks(response.data))
        .catch((error) => {
            console.error("❌ Book Fetch Error:", error);
            setError("Error loading book data. Please try again later.");
        }).finally(() => setLoading(false))
    }, [uri]);

    return {shelfBooks, loading, error}
}

export function getGoal(uri:string) {
    const [goal, setGoal] = useState(-1);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  
    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(uri, {headers: { "Content-Type": "application/json" }})
        .then((response) => {
            if (response.data === -1) {
                setGoal(0);
            }else {setGoal(response.data)}}
    )
        .catch((error) => {
            console.error("❌ Book Fetch Error:", error);
            setError("Error loading book data. Please try again later.");
        }).finally(() => setLoading(false))
    }, [uri]);

    return {goal, loading, error}
}

interface Participant {
    username: string;
    completed_books: BookItem[];
}
interface Competition {
    contest_name: string;
    book_count: number;
    end_date: string;
    participants: Participant[];
    book_list: BookItem[];
}

interface FoundParticipant {
    participant: Participant;
    competition: Competition;
}


export const usefetchParticipant = (targetUsername:string):FoundParticipant | undefined => {
    const {competitions} = useCompetitions();
    for (const competition of competitions) {
        const participant = competition.participants.find((competition) => competition.username === targetUsername)
   
    if (participant){
        return {participant, competition};
    }
    return undefined;
     };
};

export const useCompetitionsForParticipant = (targetUser:string ):FoundParticipant[] => {
    const {competitions} = useCompetitions();

    return competitions.flatMap((competition) => {
        const participant = competition.participants.find((person) => person.username === targetUser);
        return participant ? [{ participant, competition}] : [];
    });
};