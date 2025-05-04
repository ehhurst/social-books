// import { Link, useParams } from "react-router-dom";
// import { CategoryItem, searchQueries } from "../types";


// function SearchResultsNav() {
//     const {category} = useParams(); // Fetch category dynamically from URL

//     return(
//         <ul>
//             {searchQueries.map((item:CategoryItem) => <li key={item.query} id={(item.query == category? "selected" : "unselected")}><Link to={`/categories/${item.query}`}><p> {item.title}</p></Link></li>)}
//         </ul>
//     );

// }

// export default SearchResultsNav;