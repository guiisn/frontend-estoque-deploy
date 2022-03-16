import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import colors from '../../../global/colors';
import { globals } from '../../../global/styles';
import { humanizePrice, maxWords } from '../../utils/functions';

interface CardProductProps {
  name: string;
  validate: string;
  price: string;
  qtd: string;
  sellPrice?: number;
  type?: string;
}

export default function CardProduct({
  name,
  validate,
  price,
  qtd,
  sellPrice,
  type,
}: CardProductProps) {
  return (
    <View style={styles.container}>
      <View style={(globals.columns, { width: '50%' })}>
        <Text style={globals.subtitles2}>{maxWords(name)}</Text>
        <Text style={globals.descriptions}>{validate}</Text>
      </View>
      <View style={(globals.columns, { width: '50%' })}>
        <Text style={globals.descriptions}>Qtd: {qtd}</Text>
        <Text style={globals.descriptions}>
          Price R$ {humanizePrice(price)} /un
        </Text>
        {type && (
          <Text style={globals.descriptions}>
            Venda R$ {humanizePrice(sellPrice)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 100,
    borderRadius: 15,
    borderColor: colors.tertiary,
    borderWidth: 2,

    marginBottom: 10,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
  },
});
