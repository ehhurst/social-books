import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YearlyProgressChart from '../YearlyProgressChart';

describe('YearlyProgressChart', () => {
    it('renders Yearly Progress Chart', () => {
        render(
            <BrowserRouter>
              <YearlyProgressChart 
                props={[2020, 2021, 2022, 2023, 2024, 2025]}/>
            </BrowserRouter>
          );
    });

});