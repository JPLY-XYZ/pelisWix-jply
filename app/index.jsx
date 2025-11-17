import { Redirect } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';


const RootComponent = () => {

  return <Redirect href="/home" />;
};

export default RootComponent;
