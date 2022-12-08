import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
  Modal,
  Button,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {dateTimeToText} from '../helpers';
import {setAppointment} from '../services';

const RentPage = ({navigation, route}) => {
  const book = route.params;
  const [bookData] = useState(route.params);
  const [date, setDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onDayPressed = ({dateString}) => {
    setDate(dateString);
    setModalVisible(false);
  };

  const onSetAppointmentPressed = () => {
    const appointmentData = {
      date,
      bookData,
    };
    setAppointment(appointmentData);
    navigation.navigate('Home');
  };

  const RenderAuthor = ({authorData}) => {
    return (
      <View style={styles.mr4}>
        <Text>Author: </Text>
        <View style={styles.authorWrapper}>
          {authorData.map((author, idx) => (
            <Text style={styles.fs12} key={author.name + Math.random() * 1000}>
              {author.name}
              {idx === authorData.length - 1 ? '' : ', '}
            </Text>
          ))}
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>Set Appointment</Text>
        <ScrollView>
          <View style={styles.segmentInformation}>
            <Text style={styles.segmentTitle}>Book Information</Text>
            <View style={styles.informationWrapper}>
              <Image
                style={styles.bookImage}
                source={{
                  uri: `https://covers.openlibrary.org/b/ID/${book.cover_id}-M.jpg`,
                }}
              />
              <View style={styles.descriptionWrapper}>
                <View>
                  <Text style={styles.textStyle}>
                    {bookData.cover_edition_key}
                  </Text>
                  <Text style={styles.bookTitle}>{bookData.title}</Text>
                  <Text style={styles.textStyle}>
                    {bookData.first_publish_year}
                  </Text>
                </View>
                <RenderAuthor authorData={bookData.authors} />
                {/* <Text style={styles.textStyle}>{JSON.stringify(bookData, null, 4)}</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.segmentInformation}>
            <Text style={styles.segmentTitle}>Book Time</Text>
            <Button
              title={dateTimeToText(date) || 'Choose Date'}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </ScrollView>
        <Pressable
          style={styles.buttonAppointment}
          onPress={onSetAppointmentPressed}>
          <Text style={styles.appointmentText}>Set Appointment</Text>
        </Pressable>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar initialDate={date} onDayPress={onDayPressed} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RentPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  segmentTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  bookImage: {
    width: 120,
    height: 180,
  },
  segmentInformation: {
    borderWidth: 1,
    borderColor: 'darkgrey',
    padding: 8,
    margin: 8,
    backgroundColor: 'whitesmoke',
    borderRadius: 4,
  },
  informationWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 8,
  },
  descriptionWrapper: {
    marginHorizontal: 8,
    flex: 1,
    justifyContent: 'space-between',
  },
  textStyle: {
    flexWrap: 'wrap',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonAppointment: {
    backgroundColor: 'orange',
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000066',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
