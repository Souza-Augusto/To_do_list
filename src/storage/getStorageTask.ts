import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASK_COLLECTION } from './storageConfig';
import { StorageDTO } from './storageTaskDTO';

export async function GetStorageTask() {
  try {
    const storage = await AsyncStorage.getItem(TASK_COLLECTION);
    const tasks: StorageDTO[] = storage ? JSON.parse(storage) : [];
    return tasks;
  } catch (error) {
    throw error;
  }
}
