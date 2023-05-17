import { useCallback, useState } from 'react';

import {
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Task_Card } from '@components/Task_Card';

type Task = {
  title: string;
  checked: boolean;
};

export function Home() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask() {
    if (!inputTask.trim() || inputTask.length === 0) {
      Alert.alert(
        'Escreva algo para que seja anotado na sua lista de tarefas.'
      );
      return;
    }
    setTasks((prev) => [
      ...prev,
      { id: tasks.length, title: inputTask, checked: false },
    ]);
    setInputTask('');
    Keyboard.dismiss();
  }

  const handleOnCheck = useCallback(
    (item: Task) => {
      if (item.checked === true) {
        const chooseStatus = tasks.findIndex((task) => task === item);
        const updatedTasks = [...tasks];
        updatedTasks[chooseStatus].checked = false;
        setTasks(updatedTasks);
        return;
      }
      const chooseStatus = tasks.findIndex((task) => task === item);
      const updatedTasks = [...tasks];
      updatedTasks[chooseStatus].checked = true;
      setTasks(updatedTasks);
    },
    [tasks]
  );

  function handleOnRemove(index: number) {
    if (index < 0 || index >= tasks.length) {
      return tasks;
    }

    const newArray = [...tasks];
    newArray.splice(index, 1);

    setTasks(newArray);
  }

  function countCheckedItems() {
    const checkedItems = tasks.filter((item) => item.checked === true);
    const count = checkedItems.length;

    return count;
  }

  return (
    <SafeAreaView style={styles.Container}>
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
          <Text
            style={[
              styles.TasksStatus,
              {
                color: '#4EA8DE',
              },
            ]}
          >
            Criadas
          </Text>
          <View style={styles.NumberOfTasksContainer}>
            <Text style={styles.NumberOfTasks}>{tasks.length}</Text>
          </View>
        </View>
        <View style={styles.TasksStatusButton}>
          <Text
            style={[
              styles.TasksStatus,
              {
                color: '#8284FA',
              },
            ]}
          >
            Concluídas
          </Text>
          <View style={styles.NumberOfTasksContainer}>
            <Text style={styles.NumberOfTasks}>{countCheckedItems()}</Text>
          </View>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={tasks}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <Task_Card
            onCheck={() => handleOnCheck(item)}
            onRemove={() => handleOnRemove(index)}
            check={item.checked}
            title={item.title}
          />
        )}
      />
    </SafeAreaView>
  );
}
