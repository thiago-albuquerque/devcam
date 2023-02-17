import React, {useState} from 'react';
import {View, Modal, PermissionsAndroid, Platform} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ImagePicker from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather';

import {
  Container,
  CaptureButtonContainer,
  CaptureButton,
  ModalCaptureContainer,
  ImageCaptured,
  ModalButtonsContainer,
  ModalButton,
  ModalGalleryContainer,
  GalleryImage,
} from './styles';

export default function Camera() {
  const [typeCam, setTypeCam] = useState(RNCamera.Constants.Type.back);
  const [typeFlash, setTypeFlash] = useState(RNCamera.Constants.FlashMode.on);

  const [openCaptureModal, setOpenCaptureModal] = useState(false);
  const [openGalleryModal, setOpenGalleryModal] = useState(false);

  const [capturedPhoto, setCapturedPhoto] = useState(null);

  async function takePicture(camera) {
    const optionsCamera = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(optionsCamera);

    setCapturedPhoto(data.uri);
    setOpenCaptureModal(true);
  }

  async function downloadPicture(capturedPhoto) {
    await savePicture(capturedPhoto);
    await alert('Salvo com sucesso!');
    setOpenCaptureModal(false);
  }

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const statusPermission = await PermissionsAndroid.request(permission);
    return statusPermission === 'granted';
  }

  async function savePicture(data) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(data, 'photo')
      .then(res => {
        console.log('Salvo com sucesso!' + res);
      })
      .catch(err => {
        console.log('Erro ao salvar!' + err);
      });
  }

  function toggleCam() {
    setTypeCam(
      typeCam === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  }
  function toggleFlash() {
    setTypeFlash(
      typeFlash === RNCamera.Constants.FlashMode.on
        ? RNCamera.Constants.FlashMode.off
        : RNCamera.Constants.FlashMode.on,
    );
  }

  async function openGallery() {
    const options = {
      title: 'Selecione uma foto',
      chooseFromLibraryButtonTitle: 'Buscar foto do album',
      noData: true,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Busca cancelada!');
      } else if (response.error) {
        console.log('Houve algum problema!' + response.error);
      } else {
        setCapturedPhoto(response.uri);
        setOpenGalleryModal(true);
      }
    });
  }

  return (
    <Container>
      <RNCamera
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 16,
        }}
        type={typeCam}
        flashMode={typeFlash}
        androidCameraPermissionOptions={{
          title: 'Permissão para utilizar a câmera',
          message: 'Permitir que o App utilize sua câmera?',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <View />;

          return (
            <CaptureButtonContainer>
              {typeFlash === RNCamera.Constants.FlashMode.on ? (
                <CaptureButton onPress={toggleFlash}>
                  <Feather name="zap" color="#666" size={24} />
                </CaptureButton>
              ) : (
                <CaptureButton onPress={toggleFlash}>
                  <Feather name="zap-off" color="#666" size={24} />
                </CaptureButton>
              )}

              <CaptureButton onPress={openGallery}>
                <Feather name="image" color="#666" size={24} />
              </CaptureButton>

              <CaptureButton onPress={toggleCam}>
                <Feather name="repeat" color="#666" size={24} />
              </CaptureButton>

              <CaptureButton onPress={() => takePicture(camera)}>
                <Feather name="camera" color="#666" size={24} />
              </CaptureButton>
            </CaptureButtonContainer>
          );
        }}
      </RNCamera>

      {capturedPhoto && (
        <>
          <Modal
            visible={openCaptureModal}
            transparent={true}
            animationType={'slide'}>
            <ModalCaptureContainer>
              <ImageCaptured resizeMode="cover" source={{uri: capturedPhoto}} />

              <ModalButtonsContainer>
                <ModalButton onPress={() => setOpenCaptureModal(false)}>
                  <Feather name="arrow-left" color="#666" size={24} />
                </ModalButton>
                <ModalButton onPress={() => downloadPicture(capturedPhoto)}>
                  <Feather name="download" color="#666" size={24} />
                </ModalButton>
              </ModalButtonsContainer>
            </ModalCaptureContainer>
          </Modal>

          <Modal
            visible={openGalleryModal}
            transparent={true}
            animationType={'slide'}>
            <ModalGalleryContainer>
              <GalleryImage resizeMode="cover" source={{uri: capturedPhoto}} />

              <ModalButtonsContainer>
                <ModalButton onPress={() => setOpenGalleryModal(false)}>
                  <Feather name="arrow-left" color="#666" size={24} />
                </ModalButton>
              </ModalButtonsContainer>
            </ModalGalleryContainer>
          </Modal>
        </>
      )}
    </Container>
  );
}
