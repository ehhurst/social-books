import { createContext, ReactNode, useContext, useState } from "react";
import { BookItem, ContextProps } from "../types";
import axios from "../../axiosConfig";


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

interface CompetitionContextType {
    competitions:Competition[];
    loading: boolean;
    error: string;
    fetchCompetitions: () => void
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

interface CompetitionProviderProps {
    children: ReactNode;
}

export const CompetitionProvider: React.FC<CompetitionProviderProps> = ({children}) => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const fetchCompetitions = async () => {
        setLoading(true);
        setError('');

        try {
            const {data:baseList} = await axios.get<Omit<Competition, 'participants'>[]>(`/contest/info`);

            const compList: Competition[] = await Promise.all(
                
                baseList.map(async(competition) => {
                    const name  = competition.contest_name;
                    let participants:Participant[] = [];
                    let book_list:BookItem[] = []

                    try {
                        const participantsResponse = await axios.get<Participant[]>(`/contests/${name}/participants`);
                        participants = participantsResponse.data;
                    } catch (error) {
                        console.log(`Failed to load participants for contest name ${name}`, error);
                        return {...competition, participants:[]};
                    }

                    try {
                        const booksResponse = await axios.get<BookItem[]>(`/contests/${name}/books`);
                        book_list = booksResponse.data;
                    } catch (error){
                        // could not load books for contest ${name}
                    }
                    return {
                       ...competition, 
                        participants, 
                        book_list
                    }
                        
                    

                })
            )
            setCompetitions(compList);
        } catch (error) {
            console.log("Error fetching contests", error);
            setError("Failed to load contests. Please try again later.")

        } finally {setLoading(false)}
    }

    return (
        <CompetitionContext.Provider value={{competitions, loading, error, fetchCompetitions}}>{children}</CompetitionContext.Provider>
    );
}

export const useCompetitions = ():CompetitionContextType => {
        const context = useContext(CompetitionContext);
        if (!context) {
            throw new Error('Competition Context must be used within a Competition Provider') ;  
        }
        return context;
}
