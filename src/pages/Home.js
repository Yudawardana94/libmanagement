import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';

import BookItem from '../components/BookItem';

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

  const onHandleNavigation = (book, route) => {
    if (route === 'Appointment') {
      return navigation.navigate('Appointment');
    }
    navigation.navigate('Rent', book);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.todaySubject}>Today Subject: {subjectToday}</Text>
        <Pressable onPress={() => onHandleNavigation(null, 'Appointment')}>
          <Text style={styles.appList}>App List</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.bookListWrapper}>
          {bookData.map(book => (
            <BookItem onHandleNavigation={onHandleNavigation} book={book} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  fs12: {fontSize: 12},
  mr4: {marginTop: 4},
  container: {
    padding: 8,
  },
  bookListWrapper: {
    display: 'flex',
    paddingBottom: 45,
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
  authorWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  headerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  todaySubject: {
    fontSize: 18,
    fontWeight: '700',
  },
  appList: {
    fontSize: 12,
    fontWeight: '500',
  },
});
