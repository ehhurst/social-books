import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes, UNSAFE_getSingleFetchDataStrategy } from 'react-router-dom';
import NavBar from '../NavBar';
import CategoryPage from '../CategoryPage';
import { text } from '@fortawesome/fontawesome-svg-core';
import CompetitionsPage from '../CompetitionsPage';
import Home from '../Home';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';

describe('NavBar Navigation', () => {
    afterEach(cleanup);

    it('navigates to browse books page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<NavBar/>} />
                    <Route path='/categories/fiction' element={<CategoryPage/>}/>
                </Routes>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Browse Books'));
        expect(screen.getByText('Fiction')).toBeInTheDocument();
    });

    it ('navigates to home', () => {
        render(
            <MemoryRouter initialEntries={['/']}>

                    <Routes>
                        <Route path='/' element={<NavBar/>} />
                        <Route path='/Home' element={<Home/>}/>
                    </Routes>

            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Home'));
        expect(screen.getByText('Welcome to ShelfLife')).toBeInTheDocument();
    });

    it ('navigates to competitions page', async () => {
   
        render(
            <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path='/' element={<NavBar/>} />
                <Route path='/competitions' element={<CompetitionsPage/>}/>
            </Routes>
        </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Competitions'));
        expect(screen.getByText('Competitions')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Competition/i })).toBeInTheDocument();
    });


    
})