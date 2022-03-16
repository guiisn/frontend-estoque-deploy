import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import colors from '../../../global/colors';
import CardProduct from '../../components/cardProduct';

import { useSettings } from '../../contexts/SettingsContext';

export default function ProductsCloseToExpiration() {
  const { productsToExpiration: products, findProductsCloseToExpiration } =
    useSettings();

  useEffect(() => {
    findProductsCloseToExpiration();
  }, []);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.content}>
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
