import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

import colors from '../../../global/colors';
import { globals } from '../../../global/styles';

import { useSettings } from '../../contexts/SettingsContext';
import { useNavigation, useRoute } from '@react-navigation/native';

interface BarcodeScannProps {
  page: string;
}

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);

  const { fetchBarcodeScanned } = useSettings();

  const navigation = useNavigation();
  const route = useRoute();

  const { page } = route?.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    fetchBarcodeScanned(data);
    navigation.navigate(page);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.page}>
      <View style={styles.scanContent}>
        <View style={styles.frame} />
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '90%',

    backgroundColor: colors.primary,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.primary,
  },
  scanContent: {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    position: 'absolute',
    width: '90%',
    height: 120,
    borderWidth: 4,
    borderColor: colors.textsSecondary,
    zIndex: 100,
    borderRadius: 10,
  },
});
