import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const CaptureButtonContainer = styled.View`
  height: 45%;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 24px 0;
`;
export const CaptureButton = styled.TouchableOpacity`
  background: #eff240;
  padding: 10px;
  border-radius: 14px;
`;
export const ModalCaptureContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: #333;
  padding: 16px;
`;
export const ImageCaptured = styled.Image`
  width: 330px;
  height: 470px;
  border-radius: 16px;
  margin: 0 0 16px 0;
`;
export const ModalButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
export const ModalButton = styled.TouchableOpacity`
  background: #eff240;
  padding: 10px;
  border-radius: 16px;
`;
export const ModalGalleryContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: #333;
  padding: 16px;
`;
export const GalleryImage = styled.Image`
  width: 330px;
  height: 470px;
  border-radius: 16px;
  margin: 0 0 16px 0;
`;
