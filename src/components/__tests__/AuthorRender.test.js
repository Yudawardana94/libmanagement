import React from 'react';
import {create, act} from 'react-test-renderer';
import AuthorRender from '../AuthorRender';

const authorMockData = [
  {
    url: 'el.authorsurl',
    name: 'el.authors.name',
  },
];
const onHandleNavigation = () => {
  return true;
};
const tree = create(
  <AuthorRender
    authorData={authorMockData}
    onHandleNavigation={onHandleNavigation}
  />,
);

test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});
