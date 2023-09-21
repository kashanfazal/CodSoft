import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (text.trim() === '') return;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), title: text, dueDate: dueDate, completed: false },
    ]);

    setText('');
    setDueDate('');
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const startEditingTask = (taskId) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setText(taskToEdit.title);
      setDueDate(taskToEdit.dueDate || ''); 
    }
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setText('');
    setDueDate('');
  };

  const updateTask = (taskId, updatedTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle, dueDate: dueDate } : task
      )
    );
    setEditingTaskId(null);
    setText('');
    setDueDate('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task"
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (optional)"
          onChangeText={(date) => setDueDate(date)}
          value={dueDate}
        />
        {editingTaskId ? (
          <>
            <Button title="Update" onPress={() => updateTask(editingTaskId, text)} />
            <Button title="Cancel" onPress={cancelEditingTask} />
          </>
        ) : (
          <Button title="ADD" onPress={addTask} />
        )}
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <View style={styles.checkbox}>
                {item.completed && <View style={styles.checkedBox} />}
              </View>
            </TouchableOpacity>
            <View style={styles.taskDetails}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.title}
              </Text>
              {item.dueDate && (
                <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => startEditingTask(item.id)} />
              {/* <Button title="Delete" onPress={() => deleteTask(item.id)} /> */}
            </View>
            <View style={styles.deleteContainer}>
          <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View> 
          </View>
  
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: 'blue',
  },
  taskDetails: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  deleteContainer:{
    margin:5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  dueDate: {
    fontSize: 14,
    color: 'gray',
  },
});
