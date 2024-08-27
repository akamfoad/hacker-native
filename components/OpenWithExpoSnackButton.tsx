import React from 'react';
import { Button } from 'react-native';
import * as Linking from 'expo-linking';
import { EXPO_SNACK_URL } from '@/constants/ExpoSnack';

const OpenWithExpoSnackButton = () => {
  const openExpoSnack = () => {
    Linking.openURL(EXPO_SNACK_URL);
  };

  return (
    <Button
      onPress={openExpoSnack}
      title="Open with Expo Snack"
      color="#ff6600"
    />
  );
};

export default OpenWithExpoSnackButton;
