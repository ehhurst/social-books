import { createContext, Dispatch, useEffect, useReducer } from "react";
import { CompetitionBookListItem, ContextProps } from "../types";
import { CompetitionBookListReducer } from "../Reducers/CompetitionBookListReducer";


const initialBookListState: CompetitionBookListItem[] = []
export const ListStore = createContext<{
    compList: CompetitionBookListItem[];
    dispatch: Dispatch<any>;

}>({
    compList: initialBookListState,
    dispatch: () => null
});

ListStore.displayName = 'CompetitionBookListContext';

const storageKey = 'CompBookList';

function CompetitionBookListContext({children}: ContextProps) {
    const [compList, dispatch] = useReducer(CompetitionBookListReducer, initialBookListState, 
        (initialState) => {
            try {
                const storedList = JSON.parse(localStorage.getItem(storageKey) || '[]')
                return storedList as CompetitionBookListItem[] || initialState;
            } catch(error) {
                console.log('Error parsing competitions book list', error);
                return initialState;
            }
        },
    );

    useEffect(() => {localStorage.setItem(storageKey, JSON.stringify(compList));}, [compList]);

    return (
        <ListStore.Provider value={{compList, dispatch}}>{children}</ListStore.Provider>
    ); 
}

export default CompetitionBookListContext;