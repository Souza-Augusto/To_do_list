import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 24,
  },
  AddButton: {
    backgroundColor: '#1E6F9F',
    height: 52,
    width: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  DescriptionInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6c6c6',
    marginBottom: 32,
  },
  TasksStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  TasksStatusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  TasksStatus: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  NumberOfTasksContainer: {
    backgroundColor: '#333333',
    height: 19,
    width: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  NumberOfTasks: {
    fontFamily: 'Inter_700Bold',
    color: '#D9D9D9',
  },
});
