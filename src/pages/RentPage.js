import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const RentPage = ({navigation}) => {
  return (
    <View>
      <Text>RentPage</Text>
      <Button
        title="Go to Home Page"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default RentPage;

const styles = StyleSheet.create({});
