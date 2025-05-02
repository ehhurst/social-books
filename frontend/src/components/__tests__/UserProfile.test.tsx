import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from '../UserProfile';
import { BookItem, ShelfItem } from "../../types";


describe('UserProfile', () => {
    it('renders User Profile', () => {
      const book_item_1 : BookItem = {
        "title":"title1",
        "author":"author1",
        "work_id":"work_id1", 
        "description":"description1",
        "img_S":"img_S1",
        "img_M":"img_M1",
        "img_L":"img_L1"
        }
      const book_item_2 : BookItem = {
        "title":"title2",
        "author":"author2",
        "work_id":"work_id2", 
        "description":"description2",
        "img_S":"img_S2",
        "img_M":"img_M2",
        "img_L":"img_L2"
      }
      const book_item_3 : BookItem = {
        "title":"title3",
        "author":"author3",
        "work_id":"work_id3", 
        "description":"description3",
        "img_S":"img_S3",
        "img_M":"img_M3",
        "img_L":"img_L3"
      }
      
      const book_item_4: BookItem = {
        "title":"title4",
        "author":"author4",
        "work_id":"work_id4", 
        "description":"description4",
        "img_S":"img_S4",
        "img_M":"img_M4",
        "img_L":"img_L4"
      }

      const shelf_item_1 : ShelfItem = {
        "shelf_name":"shelf_1",
        "books_list":[book_item_1, book_item_2]
      }

      const shelf_item_2 : ShelfItem = {
        "shelf_name":"shelf_2",
        "books_list":[book_item_3, book_item_4]
      }
        render(
            <BrowserRouter>
              <UserProfile 
              library={[shelf_item_1, shelf_item_2]}
              />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Books Read/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/My reading goal for /i)).toBeInTheDocument();
    });
});