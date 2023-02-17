import React from 'react';
import {StatusBar} from 'react-native';
import Camera from './src/pages/camera';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#333'} />
      <Camera />
    </>
  );
}
