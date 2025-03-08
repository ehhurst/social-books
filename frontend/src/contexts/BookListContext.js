import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const BookList = createContext([]);
BookList.displayName = 'BookListContext';
function BookListContext({ children }, category) {
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/search?subject=${category}`, { headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => setBookList(response.data))
            .catch(console.error);
    }, []);
    return (<BookList.Provider value={bookList}>{children}{category}</BookList.Provider>);
}
export default BookListContext;
