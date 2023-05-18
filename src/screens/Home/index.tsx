import { useCallback, useState, useEffect } from 'react';

import {
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
  Image,
  Keyboard,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Task_Card } from '@components/Task_Card';
import { AddStorageTask } from '@storage/addStorageTask';
import { GetStorageTask } from '@storage/getStorageTask';
import { removeStorageTask } from '@storage/removeStorageTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASK_COLLECTION } from '@storage/storageConfig';
import { StorageTaskDTO } from '@storage/storageTaskDTO';

export function Home() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState<StorageTaskDTO[]>([]);

  async function fetchTasks() {
    try {
      const getTasks = await GetStorageTask();
      setTasks(getTasks);
    } catch (error) {
      Alert.alert('Opa!', 'Não foi possível carregar os dados.');
    }
  }

  function handleAddTask() {
    try {
      if (!inputTask.trim() || inputTask.length === 0) {
        Alert.alert(
          'Escreva algo para que seja anotado na sua lista de tarefas.'
        );
        return;
      }
      const newTask = { title: inputTask, checked: false };

      AddStorageTask(tasks, newTask);
      fetchTasks();
      setInputTask('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
      Alert.alert('Opa!', 'Não foi possível adicionar a tarefa na lista.');
    }
  }

  const handleOnCheck = useCallback(
    async (item: StorageTaskDTO) => {
      if (item.checked) {
        const chooseStatus = tasks.findIndex((task) => task === item);
        const updatedTasks = [...tasks];
        updatedTasks[chooseStatus].checked = false;
        await AsyncStorage.setItem(
          TASK_COLLECTION,
          JSON.stringify(updatedTasks)
        );
        setTasks(updatedTasks);
        return;
      }

      const chooseStatus = tasks.findIndex((task) => task === item);
      const updatedTasks = [...tasks];
      updatedTasks[chooseStatus].checked = true;
      await AsyncStorage.setItem(TASK_COLLECTION, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const handleOnRemove = useCallback(
    async (item: StorageTaskDTO) => {
      await removeStorageTask(item);
      fetchTasks();
    },
    [fetchTasks, removeStorageTask]
  );

  function countCheckedItems() {
    const checkedItems = tasks.filter((item) => item.checked === true);
    const count = checkedItems.length;

    return count;
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.Container,
        Platform.OS === 'android' && { paddingTop: '15%' },
      ]}
    >
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <Header />
      <View style={styles.DescriptionInputContainer}>
        <Input
          placeholder='Adicione uma nova tarefa'
          value={inputTask}
          onChangeText={setInputTask}
        />
        <TouchableOpacity style={styles.AddButton} onPress={handleAddTask}>
          <AntDesign name='pluscircleo' size={16} color='#F2F2F2' />
        </TouchableOpacity>
      </View>
      <View style={styles.TasksStatusContainer}>
        <View style={styles.TasksStatusButton}>
          <Text style={[styles.TasksStatus, { color: '#4EA8DE' }]}>
            Criadas
          </Text>
          <View style={styles.NumberOfTasksContainer}>
            <Text style={styles.NumberOfTasks}>{tasks.length}</Text>
          </View>
        </View>
        <View style={styles.TasksStatusButton}>
          <Text style={[styles.TasksStatus, { color: '#8284FA' }]}>
            Concluídas
          </Text>
          <View style={styles.NumberOfTasksContainer}>
            <Text style={styles.NumberOfTasks}>{countCheckedItems()}</Text>
          </View>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          minHeight: '40%',
        }}
        showsVerticalScrollIndicator={false}
        data={tasks}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <Task_Card
            onCheck={() => handleOnCheck(item)}
            onRemove={() => handleOnRemove(item)}
            check={item.checked}
            title={item.title}
          />
        )}
        ListEmptyComponent={
          <View style={styles.EmptyMessageContainer}>
            <Image
              style={{ marginBottom: 16 }}
              source={require('@assets/images/png/List.png')}
            />
            <Text
              style={[styles.EmptyMessage, { fontFamily: 'Inter_700Bold' }]}
            >
              Se você ainda não tem tarefas cadastradas
            </Text>
            <Text
              style={[styles.EmptyMessage, { fontFamily: 'Inter_400Regular' }]}
            >
              Crie tarefas e organize seus items a fazer
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
