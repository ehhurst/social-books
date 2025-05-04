import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem } from "../types";

  // helper method to get the user's list of read books 
export const useShelfBooks = (username:string, shelfName:string) => {
  const [shelfBooksList, setShelfBooksList] = useState<BookItem[]>([]);
  const [loadingBookshelf, setLoadingBookshelf] = useState(false); // provide loading feedback
  const [bookshelfError, setBookshelfError] = useState(''); // handle errors gracefully

  useEffect(() => {
    const fetchShelfBooks = async () => {
      setLoadingBookshelf(true);
      setBookshelfError('');

      try {
        const response = await axios.get<BookItem[]>(`/shelf/${username}/${shelfName}`);
        setShelfBooksList(response.data);
      } 
      catch (error) {
        console.log(`Error loading books from shelf ${shelfName}`);
        // show error- oops were having trouble getting your read books list
        setBookshelfError('Failed to load shelf books.');
      } 
      finally {
        setLoadingBookshelf(false);
      }
    };
    
    // check that both parameters were provided
    if (username && shelfName) {
      fetchShelfBooks();
    }

    }, [username, shelfName])
    return {shelfBooksList, loadingBookshelf, bookshelfError}
  }

export default useShelfBooks;
