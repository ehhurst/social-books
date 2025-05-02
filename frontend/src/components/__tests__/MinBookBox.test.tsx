import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MinBookBox from '../MinBookBox';

describe('MinBookBox', () => {
    it('renders Min Book Box', () => {
        render(
            <BrowserRouter>
              <MinBookBox 
              title="title"
              author="author"
              work_id="work_id"
              description="description"
              img_S="img_S"
              img_M="img_M"
              img_L="img_L"
              />
            </BrowserRouter>
          );
    });
});