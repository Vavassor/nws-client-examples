import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

export const getCurrentPosition = () => {
  return new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
    );
  });
};
