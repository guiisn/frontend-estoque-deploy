import { StyleSheet } from 'react-native';
import colors from './colors';

export const globals = StyleSheet.create({
  titles: { fontSize: 34, fontWeight: 'bold', color: colors.textsSecondary },
  titles2: { fontSize: 34, fontWeight: 'bold', color: colors.texts },
  subtitles: { fontSize: 30, fontWeight: 'bold', color: colors.textsSecondary },
  subtitles2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.texts,
  },
  descriptions: { fontSize: 15, fontWeight: 'bold', color: colors.texts },
  descriptions2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textsSecondary,
  },
  rows: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columns: { display: 'flex', flexDirection: 'column' },
  inputs: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    height: 55,
    borderRadius: 15,
    borderColor: colors.tertiary,
    width: '80%',
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '700',

    marginBottom: 8,
  },
  buttonsPrimary: {
    width: '80%',
    height: 55,
    backgroundColor: colors.tertiary,
    borderRadius: 15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 8,
  },
});
