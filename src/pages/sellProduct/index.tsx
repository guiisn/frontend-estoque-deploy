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
import CardProduct from '../../components/cardProduct';

import { useSettings } from '../../contexts/SettingsContext';

export default function SellProduct() {
  const { sellProduct, barcodeScanned, findProductByBarcode, product } =
    useSettings();
  const [barcode, setBarcode] = useState('');
  const [qtd, setQtd] = useState('');

  const [currentProduct, setProduct] = useState({
    name: '',
    validate: '',
    price: '',
    qtd: '',
  });

  const iptBarcode = createRef<any>();
  const iptQtd = createRef<any>();

  useEffect(() => {
    if (barcodeScanned && barcodeScanned !== '') {
      setBarcode(barcodeScanned);
    }
  }, [barcodeScanned]);

  useEffect(() => {
    if (barcode !== '' && qtd !== '') {
      findProductByBarcode(barcode);
    }
  }, [barcode, qtd]);

  useEffect(() => {
    if (product.length > 0) {
      const { name, price, qtd, validate_product } = product[0];

      setProduct({ name, validate: validate_product, price, qtd });
    }
  }, [product]);

  const submit = () => {
    if (barcode === '' || qtd === '') {
      alert('Todos os campos devem ser preenchidos.');
      iptBarcode.current.clear();
      iptQtd.current.clear();
    } else {
      sellProduct(barcode, qtd);
      iptBarcode.current.clear();
      iptQtd.current.clear();
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Código de barras do produto"
          keyboardType="number-pad"
          onChangeText={(text) => setBarcode(text)}
          value={barcodeScanned ? barcodeScanned : barcode}
          ref={iptBarcode}
        />

        <TouchableOpacity
          style={globals.buttonsPrimary}
          onPress={() =>
            navigation.navigate('Scanner', { page: 'SellProduct' })
          }
        >
          <Text style={globals.descriptions2}>Escanear código</Text>
        </TouchableOpacity>

        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Quantidade do produto"
          keyboardType="number-pad"
          onChangeText={(text) => setQtd(text)}
          ref={iptQtd}
        />

        {currentProduct && barcode !== '' && qtd !== '' && (
          <CardProduct
            name={currentProduct.name}
            validate={currentProduct.validate}
            price={currentProduct.price}
            qtd={currentProduct.qtd}
            sellPrice={parseFloat(currentProduct.price) * parseFloat(qtd)}
            type="sell"
          />
        )}

        <TouchableOpacity style={globals.buttonsPrimary} onPress={submit}>
          <Text style={globals.descriptions2}>Confirmar venda</Text>
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
