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

const {width, height} = Dimensions.get('screen');

const AppointmentList = ({navigation, route}) => {
  const [appList] = useState(Store.appointment);

  const onHandleNavigation = () => navigation.goBack();

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
          {appList.length === 0 ? (
            <View style={styles.emptyAppointment}>
              <Text style={styles.emptyAppointmentText}>
                You have no appointment
              </Text>
            </View>
          ) : (
            appList.map(book => (
              <BookItem
                onHandleNavigation={onHandleNavigation}
                book={book.bookData}
              />
            ))
          )}
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
  emptyAppointment: {
    height: height / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  emptyAppointmentText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
