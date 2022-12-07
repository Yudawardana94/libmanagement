import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';

import {getBookList, availableSubject} from '../services';

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [bookData, setBookData] = useState([]);
  const [subjectToday, setSubject] = useState('');

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    const randomIdx = Math.floor(Math.random() * availableSubject.length);
    const choosenSubject = availableSubject[randomIdx];
    const data = await getBookList(choosenSubject);
    setBookData(data);
    setSubject(choosenSubject);
  };

  const RenderAuthor = ({authorData}) => {
    return (
      <View style={styles.mr4}>
        <Text>Author: </Text>
        <View style={styles.authorWrapper}>
          {authorData.map((author, idx) => (
            <Text style={styles.fs12}>
              {author.name}
              {idx === authorData.length - 1 ? '' : ', '}
            </Text>
          ))}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.todaySubject}>Today Subject: {subjectToday}</Text>
      <ScrollView>
        <View style={styles.bookListWrapper}>
          {bookData.map(book => {
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
                        {book.title.slice(0, 50)}
                        {book.title.length > 45 && '...'}
                      </Text>
                    </View>
                    <Text style={styles.fw500}>{book.cover_edition_key}</Text>
                    <RenderAuthor authorData={book.authors} />
                  </View>
                  <Pressable
                    style={styles.borrowButton}
                    onPress={() => navigation.navigate('Rent')}>
                    <Text style={styles.textBorrowButton}>Borrow</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  fw500: {fontWeight: '500'},
  fdRow: {flexDirection: 'row'},
  fs12: {fontSize: 12},
  mr4: {marginTop: 4},
  container: {
    padding: 8,
  },
  bookListWrapper: {
    display: 'flex',
    paddingBottom: 45,
  },
  bookContainer: {
    backgroundColor: 'aliceblue',
    margin: 6,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#23232366',
    borderRadius: 6,
  },
  bookImage: {
    width: 90,
    height: 135,
  },
  borrowButton: {
    marginTop: 8,
    backgroundColor: 'steelblue',
    paddingVertical: 4,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBorrowButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bookTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 6,
  },
  navigateButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'pink',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 4,
  },
  descriptionWrapper: {
    marginLeft: 6,
    width: width - 125,
    justifyContent: 'space-between',
  },
  authorWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },

  titleBook: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: '700',
  },
  todaySubject: {
    fontSize: 18,
    fontWeight: '700',
    padding: 8,
  },
});
