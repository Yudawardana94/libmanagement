import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';

import AuthorRender from '../components/AuthorRender';

const {width} = Dimensions.get('screen');

const BookItem = ({book, onHandleNavigation}) => {
  return (
    <View style={styles.bookContainer} key={book.cover_id}>
      <Image
        style={styles.bookImage}
        source={{
          uri: `https://covers.openlibrary.org/b/ID/${book.cover_id}-M.jpg`,
        }}
      />
      <View style={styles.descriptionWrapper}>
        <View>
          <View style={styles.fdRow}>
            <Text style={styles.titleBook}>
              {book?.title?.slice(0, 50)}
              {book?.title?.length > 45 && '...'}
            </Text>
          </View>
          <Text style={styles.fw500}>{book.cover_edition_key}</Text>
          <AuthorRender authorData={book.authors} />
        </View>
        <Pressable
          style={styles.borrowButton}
          onPress={() => onHandleNavigation(book)}>
          <Text style={styles.textBorrowButton}>Borrow</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  fdRow: {flexDirection: 'row'},
  fw500: {fontWeight: '500'},
  bookContainer: {
    backgroundColor: 'aliceblue',
    margin: 6,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#23232366',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: 90,
    height: 135,
  },
  descriptionWrapper: {
    marginLeft: 6,
    width: width - 125,
    justifyContent: 'space-between',
  },
  titleBook: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: '700',
  },
  borrowButton: {
    marginTop: 8,
    marginRight: 16,
    backgroundColor: 'steelblue',
    paddingVertical: 4,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBorrowButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
