import { StorageTaskDTO } from './storageTaskDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASK_COLLECTION } from './storageConfig';
import { Alert } from 'react-native';

export async function AddStorageTask(
  tasks: StorageTaskDTO[],
  newTask: StorageTaskDTO
) {
  try {
    const existingTasks = tasks;

    const taskAlreadyExists = existingTasks.filter(
      (tasks) => tasks.title === newTask.title
    );

    if (taskAlreadyExists.length > 0) {
      return Alert.alert('Essa tarefa já foi adicionada à lista.');
    }
    const storage = JSON.stringify([...existingTasks, newTask]);
    await AsyncStorage.setItem(TASK_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
