import React from 'react';
import {View, StatusBar} from 'react-native';
import Camera from './src/pages/camera';

export default function App() {
  return (
    <>
      <StatusBar hidden={false} />
      <Camera />
    </>
  );
}
