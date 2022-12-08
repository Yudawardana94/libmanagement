import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import Store from '../store';

const {width} = Dimensions.get('screen');
const AppointmentList = ({navigation, route}) => {
  const [appList] = useState(Store.appointment);

  const onHandleNavigation = () => navigation.goBack();

  const AppointmentCard = ({appData}) => {
    return (
      <View style={styles.appWrapper}>
        <Image
          style={styles.bookImage}
          source={{
            uri: `https://covers.openlibrary.org/b/ID/${appData.bookData.cover_id}-M.jpg`,
          }}
        />
        <View style={styles.descWrapper}>
          <View>
            <Text style={styles.bookTitle}>{appData.bookData.title}</Text>
            <Text>{appData.bookData.cover_edition_key}</Text>
          </View>
          <Text>{appData.date}</Text>
          <RenderAuthor authorData={appData.bookData.authors} />
        </View>
      </View>
    );
  };
  const RenderAuthor = ({authorData}) => {
    return (
      <View style={styles.mr4} key={authorData.name}>
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
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Pressable onPress={onHandleNavigation}>
            <Text style={styles.appList}>Back</Text>
          </Pressable>
          <Text style={styles.pageTitle}>Book Appointment List</Text>
        </View>
        <View>
          {appList.map(el => {
            return <AppointmentCard appData={el} />;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  fs12: {fontSize: 12},
  mr4: {marginTop: 4},
  authorWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
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
  bookImage: {
    width: 90,
    height: 135,
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
  },
  appWrapper: {
    flexDirection: 'row',
    backgroundColor: 'aliceblue',
    borderRadius: 4,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  descWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
