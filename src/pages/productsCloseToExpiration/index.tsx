import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import colors from '../../../global/colors';
import CardProduct from '../../components/cardProduct';
import { api } from '../../config/api';

import { useSettings } from '../../contexts/SettingsContext';

export default function ProductsCloseToExpiration() {
  const [products, setProducts] = useState([]);

  const setProductsExpiration = async () => {
    await api
      .get('/products/expiration')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    setProductsExpiration();
  }, [setProductsExpiration, products]);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.content}>
        {products &&
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
