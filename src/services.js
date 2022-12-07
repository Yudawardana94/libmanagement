import axios from 'axios';

const axins = axios.create({
  baseURL: 'https://openlibrary.org/subjects',
});

export const availableSubject = [
  'Cooking',
  'Science Fiction',
  'Thriller',
  'Film',
  'Graphic Design',
  'Design',
  'Fashion',
  'Cats',
  'Kittens',
  'Magic',
  'Programming',
  'Japanese',
  'Psychology',
  'Mental Health',
];
export const getBookList = async subject => {
  try {
    const {data} = await axins.get(`/${subject}.json?details=true`);
    const mapData = data.works.map(el => {
      return {
        title: el.title,
        cover_id: el.cover_id,
        authors: el.authors,
        first_publish_year: el.first_publish_year,
        cover_edition_key: el.cover_edition_key,
        availability: el.availability,
      };
    });
    return mapData;
  } catch (error) {
    return [];
  }
};
