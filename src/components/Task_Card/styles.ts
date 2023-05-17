import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#262626',
    width: '100%',
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 8,
  },
  Task: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    color: '#F2F2F2',
    fontSize: 14,
    marginHorizontal: 8,
  },
});
