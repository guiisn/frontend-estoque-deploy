import { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import colors from '../../../global/colors';
import { globals } from '../../../global/styles';

import { humanizePrice } from '../../utils/functions';
import { api } from '../../config/api';

export default function Header() {
  const [eyeOpen, setEye] = useState(true);
  const [totalValue, setTotalValue] = useState('');

  const setInventoryTotalValue = async () => {
    await api
      .get('/inventory-value')
      .then((response) => {
        setTotalValue(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setInventoryTotalValue();
  }, [setInventoryTotalValue, totalValue]);

  return (
    <View style={styles.header}>
      <View style={styles.value}>
        <View style={globals.rows}>
          <Text style={globals.titles}>Valor Total</Text>
          <TouchableOpacity onPress={() => setEye(!eyeOpen)}>
            <Entypo
              name={eyeOpen ? 'eye-with-line' : 'eye'}
              size={24}
              color={colors.textsSecondary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={globals.subtitles}>
            {eyeOpen
              ? `R$ ${totalValue ? humanizePrice(totalValue) : 'carregando...'}`
              : `R$ -------`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.tertiary,
    width: '100%',
    height: '35%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  value: {
    width: '90%',
    backgroundColor: '#8F66C5',
    height: 116,
    borderRadius: 30,
    padding: 20,
  },
});
