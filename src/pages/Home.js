import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import BookItem from '../components/BookItem';

import {getBookList, availableSubject} from '../services';

const {width, height} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [bookData, setBookData] = useState([]);
  const [subjectToday, setSubject] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    setLoading(true);
    const randomIdx = Math.floor(Math.random() * availableSubject.length);
    const choosenSubject = availableSubject[randomIdx];
    const data = await getBookList(choosenSubject);
    setBookData(data);
    setSubject(choosenSubject);
    setLoading(false);
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
      {isLoading ? (
        <View style={styles.middleLocation}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.loadingText}>
            Loading Library's book collection
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.bookListWrapper}>
            {bookData.map(book => (
              <BookItem
                onHandleNavigation={onHandleNavigation}
                book={book}
                key={book.title + Math.random() * 1000}
              />
            ))}
          </View>
        </ScrollView>
      )}
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
  middleLocation: {
    height: height / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  loadingText: {
    marginTop: 12,
  },
});
