import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../global/colors';
import { globals } from '../../../global/styles';

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/header';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
      <View style={styles.menuOptions}>
        <View style={globals.rows}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Ionicons name="md-add-circle" size={40} color="black" />
            <Text style={globals.descriptions}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SellProduct')}
          >
            <FontAwesome5 name="dollar-sign" size={40} color="black" />
            <Text style={globals.descriptions}>Vender</Text>
          </TouchableOpacity>
        </View>
        <View style={globals.rows}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FindProduct')}
          >
            <Ionicons name="ios-search-circle" size={40} color="black" />
            <Text style={globals.descriptions}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ListAll')}
          >
            <Entypo name="list" size={40} color="black" />
            <Text style={globals.descriptions}>Listar Tudo</Text>
          </TouchableOpacity>
        </View>
        <View style={globals.rows}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CloseToExpiration')}
          >
            <FontAwesome name="warning" size={40} color="black" />
            <Text style={globals.descriptions}>Próximos do vencimento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <View style={styles.page}>
      <Header />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menu: {
    width: '90%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    marginTop: 20,
  },
  menuOptions: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 30,
    width: '48%',
    height: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,

    marginBottom: 10,
  },
});
