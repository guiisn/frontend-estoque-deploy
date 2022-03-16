import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';
import colors from '../../../global/colors';
import { globals } from '../../../global/styles';
import CardProduct from '../../components/cardProduct';

import { useSettings } from '../../contexts/SettingsContext';

export default function FindProduct() {
  const { listAllProducts, products, findProductOfQuery } = useSettings();

  const [query, setQuery] = useState('');

  useEffect(() => {
    listAllProducts();
  }, [products]);

  useEffect(() => {
    if (query === '') {
      listAllProducts();
    }
    findProductOfQuery(query);
  }, [query]);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.content}>
        <TextInput
          keyboardAppearance="default"
          style={globals.inputs}
          placeholder="Nome do produto"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={(text) => setQuery(text)}
        />
        {products.length > 0 &&
          products.map((product: any, index: number) => (
            <CardProduct
              key={index}
              name={product.name}
              price={product.price}
              qtd={product.qtd}
              validate={product.validate_product}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    minHeight: '100%',

    backgroundColor: colors.primary,
  },
  content: {
    marginTop: 80,

    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
