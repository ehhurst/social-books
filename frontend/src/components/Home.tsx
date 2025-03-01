import '../assets/css/Home.css'
import BookBox from './BookBox';

function Home() {
    return(
        <main>
            <BookBox title='Mr.Fox' author_name='sally may' description='the best book ever' isbn={9780140328721} readTime={300}/>

        </main>
    );
}

export default Home;