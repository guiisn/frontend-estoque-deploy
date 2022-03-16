import { useNavigation } from '@react-navigation/native';
import { createRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import colors from '../../../global/colors';
import { globals } from '../../../global/styles';

import { useSettings } from '../../contexts/SettingsContext';

import MaskInput from 'react-native-mask-input';

export default function AddProduct() {
  const { fetchProduct, barcodeScanned } = useSettings();
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [validate, setValidate] = useState('');
  const [qtd, setQtd] = useState('');

  const iptBarcode = createRef<any>();
  const iptName = createRef<any>();
  const iptPrice = createRef<any>();
  const iptValidate = createRef<any>();
  const iptQtd = createRef<any>();

  const submit = () => {
    if (
      barcode === '' ||
      price === '' ||
      name === '' ||
      validate === '' ||
      qtd === ''
    ) {
      alert('Todos os campos são obrigatórios!');
    } else {
      fetchProduct(barcode, name, price, validate, qtd);
      iptBarcode.current.clear();
      iptName.current.clear();
      iptPrice.current.clear();
      iptValidate.current.clear();
      iptQtd.current.clear();
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (barcodeScanned && barcodeScanned !== '') {
      setBarcode(barcodeScanned);
    }
  }, [barcodeScanned]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Código de barras do produto"
          keyboardType="number-pad"
          onChangeText={(text) => setBarcode(text)}
          value={barcode}
          ref={iptBarcode}
        />

        <TouchableOpacity
          style={globals.buttonsPrimary}
          onPress={() => navigation.navigate('Scanner', { page: 'AddProduct' })}
        >
          <Text style={globals.descriptions2}>Escanear código</Text>
        </TouchableOpacity>

        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Nome do produto"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
          ref={iptName}
        />
        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Preço do produto"
          keyboardType="numbers-and-punctuation"
          onChangeText={(text) => setPrice(text)}
          clearButtonMode="always"
          ref={iptPrice}
        />
        <MaskInput
          ref={iptValidate}
          value={validate}
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Validade do produto"
          keyboardType="numbers-and-punctuation"
          onChangeText={(formatted) => {
            setValidate(formatted);
          }}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        />
        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Quantidade do produto"
          keyboardType="numbers-and-punctuation"
          onChangeText={(text) => setQtd(text)}
          ref={iptQtd}
        />

        <TouchableOpacity style={globals.buttonsPrimary} onPress={submit}>
          <Text style={globals.descriptions2}>Confirmar cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',

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
});
