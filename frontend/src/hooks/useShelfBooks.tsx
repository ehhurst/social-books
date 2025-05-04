import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem, work_ids } from "../types";


// helper method for getting the list of books in a user's bookshelf
export const useShelfBooks = (username:string, shelfName:string) => {
  const [shelfBooksList, setShelfBooksList] = useState<BookItem[]>([]);
  const [loadingBookshelf, setLoadingBookshelf] = useState(false); // provide loading feedback
  const [bookshelfError, setBookshelfError] = useState(''); // handle errors gracefully
  const token = sessionStorage.getItem("access_token");
  var bookid_list:string[] = [];
  var bookList:BookItem[] = [];

  const findItem = ((array:BookItem[], work_id:string)=> array.find((item) => item.work_id == work_id));
  useEffect(() => {
    const fetchShelfBooks = async () => {
      setLoadingBookshelf(true);
      setBookshelfError('');

      try {
        const response = await axios.get(`/shelf/${username}/${shelfName}`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        });
        const list:work_ids[]= response.data[0].books
        bookid_list = (list.flatMap((item:work_ids)=> item.work_id))
        console.log(bookid_list)
        // get book items in this shelf
        bookid_list.forEach((item) => {
          axios.get(`/book/${item}`)
            .then((response) => {
                // don't display duplicates
                if(!findItem(bookList, response.data.work_id)) {
                    bookList.push(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
                setBookshelfError('Failed to load liked books. Please try again later.');
            }).finally(() => {
                if (bookList.length == bookid_list.length) {
                    setShelfBooksList(bookList);
                    
                }
                setLoadingBookshelf(false);
        })})
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
