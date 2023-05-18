import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetStorageTask } from './getStorageTask';
import { StorageDTO } from './storageTaskDTO';
import { TASK_COLLECTION } from './storageConfig';

export async function removeStorageTask(task: StorageDTO) {
  try {
    const storage = await GetStorageTask();

    const filtered = storage.filter((tasks) => tasks.title !== task.title);
    const tasks = JSON.stringify(filtered);

    await AsyncStorage.setItem(TASK_COLLECTION, tasks);
  } catch (error) {}
}
