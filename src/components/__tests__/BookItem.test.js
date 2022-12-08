import React from 'react';
import {create, act} from 'react-test-renderer';
import BookItem from '../BookItem';

const bookItemMocakData = {
  title: 'el.title',
  cover_id: 'el.cover_id',
  authors: [
    {
      url: 'el.authorsurl',
      name: 'el.authors.name',
    },
  ],
  first_publish_year: 0,
  cover_edition_key: 'el.cover_edition_key',
};
const onHandleNavigation = () => {
  return true;
};
const tree = create(
  <BookItem book={bookItemMocakData} onHandleNavigation={onHandleNavigation} />,
);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
