import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import {BookItem} from '../types'
import CategoryBookBox from "./CategoryBookBox";
import '../assets/css/CategoryBookListPage.css'
import '../assets/css/global.css'


function CategoryBookListPage() {
    const category = "fiction"
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/search?subject=${category}`,           
            {headers: {
            "Content-Type": "application/json"
        }
      })
        .then((response) => setBookList(response.data))
        .catch(console.error)
        }, [category]);


    const books:BookItem[] = [ // placeholder data for formatting page
        {
            isbn: "810902621",
            title: "Leonardo.",
            author_name: "Leonardo da Vinci",
            description: "Bill Gates bought the Codex Leicester a notebook of Leonardo da Vinci's scientific observations and theories in 1994 from the estate of Armand Hammer for $30.8 million. Last year Gates loaned the work to Australia's Powerhouse Museum, which prepared this companion to its exhibition. No longer in codex form (the pages were bound in the 1600s, but Gates had the binding dismantled for digital reproduction), the manuscript ranges over topics from fossils to astronomy. Each recto of this edition reproduces one of Leonardo's pages, written in mirror-script Italian with sketches jotted in the margins; a discussion (but not a translation) appears on the verso. It includes an introduction to Leonardo's life, but no index.",
            readTime: 1.5
        }, 
        {
            isbn: "810902621",
            title: "Leonardo.",
            author_name: "Leonardo da Vinci",
            description: "Bill Gates bought the Codex Leicester a notebook of Leonardo da Vinci's scientific observations and theories in 1994 from the estate of Armand Hammer for $30.8 million. Last year Gates loaned the work to Australia's Powerhouse Museum, which prepared this companion to its exhibition. No longer in codex form (the pages were bound in the 1600s, but Gates had the binding dismantled for digital reproduction), the manuscript ranges over topics from fossils to astronomy. Each recto of this edition reproduces one of Leonardo's pages, written in mirror-script Italian with sketches jotted in the margins; a discussion (but not a translation) appears on the verso. It includes an introduction to Leonardo's life, but no index.",
            readTime: 1.5
        }, 
        {
            isbn: "1579125867",
            title: "Vincent van Gogh a self-portrait in art and letters",
            author_name: "Vincent van Gogh",
            description: "Bill Gates bought the Codex Leicester a notebook of Leonardo da Vinci's scientific observations and theories in 1994 from the estate of Armand Hammer for $30.8 million. Last year Gates loaned the work to Australia's Powerhouse Museum, which prepared this companion to its exhibition. No longer in codex form (the pages were bound in the 1600s, but Gates had the binding dismantled for digital reproduction), the manuscript ranges over topics from fossils to astronomy. Each recto of this edition reproduces one of Leonardo's pages, written in mirror-script Italian with sketches jotted in the margins; a discussion (but not a translation) appears on the verso. It includes an introduction to Leonardo's life, but no index.",
            readTime: 3
        }, 
        {
            isbn: "1579125867",
            title: "Vincent van Gogh a self-portrait in art and letters",
            author_name: "Vincent van Gogh",
            description: "Bill Gates bought the Codex Leicester a notebook of Leonardo da Vinci's scientific observations and theories in 1994 from the estate of Armand Hammer for $30.8 million. Last year Gates loaned the work to Australia's Powerhouse Museum, which prepared this companion to its exhibition. No longer in codex form (the pages were bound in the 1600s, but Gates had the binding dismantled for digital reproduction), the manuscript ranges over topics from fossils to astronomy. Each recto of this edition reproduces one of Leonardo's pages, written in mirror-script Italian with sketches jotted in the margins; a discussion (but not a translation) appears on the verso. It includes an introduction to Leonardo's life, but no index.",
            readTime: 3
        }, 
        {
            title: "On directing film",
            author: "David Mamet",
            work_ID: "OL45804W", 
            img_S: "",
            img_M: "", 
            img_L: "",
            description: "Calling on his unique perspective as playwright, screenwriter, and director of his own critically acclaimed movies, House of Games and Things Change, David Mamet illuminates how a film comes to be. He looks at every aspect of directing—from script to cutting room—to show the many tasks directors undertake in reaching their prime objective: presenting a story that will be understood by the audience and has the power to be both surprising and inevitable at the same time. Based on a series of classes Mamet taught at Columbia University's film school, On Directing Film will be enjoyed not only by students but by anyone interested in an overview of the craft of filmmaking.",
            reading_Time: 5.5
        },
        {
            title: "Fantastic Mr Fox",
            author: "David Mamet",
            work_ID: "OL45804W", 
            img_S: "",
            img_M: "", 
            img_L: "",
            description: "The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.\r\n\r\nFinally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer's houses.\r\n\r\nAided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.",
            reading_Time: 5.5
        }
    ]

    return(
        <main>
            <div id="page-header">
                <h2>{category} Books</h2>
            </div>
            <ul id="book-list">
                {bookList.map((book:BookItem) => 
                    <CategoryBookBox title={book.title} author={book.author} work_ID={book.work_ID} img_S={book.img_S} img_M={book.img_M} img_L={book.img_L} description={book.description} reading_Time={book.reading_Time}/>)}
            </ul>
        </main>
    )

}

export default CategoryBookListPage;