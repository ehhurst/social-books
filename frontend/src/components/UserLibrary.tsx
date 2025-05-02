import { useEffect, useState } from "react";
import BookShelf from "./LibraryShelfList";
import axios from "axios";
import { BookItem, ShelfItem } from "../types";
import LibraryShelfList from "./LibraryShelfList";



function UserLibrary() {
    const [shelfNames, setShelfNames] = useState<string[]>([]);
    const [shelfList, setShelfList] = useState<ShelfItem[]>([]);
    const token = sessionStorage.getItem("access_token");
    console.log("here")

    // get list of user's libraries
    useEffect(() => {
        axios.get('/shelf', {
            headers: { "Authorization": `Bearer ${token}`
          }}).then((response) => {
            setShelfNames(response.data);
            console.log("SHELF NAMES LIST " , shelfNames);
          }).catch((error) => console.log(error));
          // get books in the shelves
          if (shelfNames) {
            var shelvesList:ShelfItem[] = [];
            for (var i=0; i < shelfNames.length; i++) {
                axios.get(`/shelf/${shelfNames[i]}`, {
                    headers: { "Authorization": `Bearer ${token}`
                  }}).then((response) => {
                    console.log("HERER THIS IS WHER THE OBJECT SHOULD BE: ", response.data)
                    console.log(response.data)
                    const shelfItem:ShelfItem = {
                        shelf_name : response.data[0].shelf_name,
                        book_list : response.data[1].books
                    }
                    console.log("SHELF NAME " , shelfItem.shelf_name, "BOOK ITEMS: ", shelfItem.book_list);
                    // add shelf to the list of shelves
                    shelvesList.push(shelfItem);
                  }).catch((error) => console.log(error));
                  i++;
            }
            setShelfList(shelvesList);
          }
          
    }, []);

        

    return (<div>
        <LibraryShelfList shelvesList={shelfList}/>
    </div>);
}

export default UserLibrary;