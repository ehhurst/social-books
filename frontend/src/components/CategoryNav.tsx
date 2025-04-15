import { Link, useParams } from "react-router-dom";
import { CategoryItem } from "../types";


function CategoryNav() {
    const {category} = useParams();
    console.log("cat", category);
    const categories: CategoryItem[] = [
        {query: "fiction", title: "Fiction"}, 
        {query: "history", title: "History"}, 
        {query: "fantasy", title: "Fantasy"}, 
        {query: "science fiction", title: "Science Fiction"}, 
        {query: "programming", title: "Programming"}
    ]

    return(
        <ul>
            {categories.map((item:CategoryItem) => <li key={item.query} id={(item.query == category? "selected" : "unselected")}><Link to={`/categories/${item.query}`}><p> {item.title}</p></Link></li>)}
        </ul>
        
    );
}

export default CategoryNav;