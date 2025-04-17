import { BookItem, CompetitionBookListItem } from "../types";


export const ListTypes = {
    ADD: 'ADD', 
    REMOVE: 'REMOVE', 
    CLEAR: 'CLEAR'
};

type AppActions = {
    work_id:string;
    type: 'ADD' | 'REMOVE' | 'CLEAR';
    item: BookItem;
};

const findItem = (array:CompetitionBookListItem[], work_id:string) => array.find((item) => item.work_id == work_id);

export const CompetitionBookListReducer = (state:CompetitionBookListItem[], action: AppActions) : CompetitionBookListItem[] => {
    switch(action.type) {
        case ListTypes.ADD:
            if (findItem(state, action.work_id) || state.length == 10) {
                // not able to add duplicates, return initial state
                return [...state];
            }

            // add item to the list
            return [
                ...state, {work_id:action.work_id, book:action.item}
            ];

        case ListTypes.REMOVE:
            // find item to remove
            if (findItem(state, action.work_id)) {
                // remove the item
                return state.filter((item) => item.work_id !== action.work_id)
            }
            // item not in list, can't remove it, return initial state
            return [...state];

        case ListTypes.CLEAR:
            return [];

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}