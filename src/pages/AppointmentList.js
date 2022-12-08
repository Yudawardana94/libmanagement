import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import Store from '../store';
import BookItem from '../components/BookItem';

const {width} = Dimensions.get('screen');

const AppointmentList = ({navigation, route}) => {
  const [appList] = useState(Store.appointment);

  const onHandleNavigation = () => navigation.goBack();

  if (appList.length === 0) {
    return (
      <View>
        <Text>You have no appointment to borrow this library book</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Pressable onPress={onHandleNavigation}>
            <Text style={styles.appList}>Back</Text>
          </Pressable>
          <Text style={styles.pageTitle}>Book Appointment List</Text>
        </View>
        <View>
          {appList.map(book => (
            <BookItem
              onHandleNavigation={onHandleNavigation}
              book={book.bookData}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: width / 8,
  },
  appList: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
});
