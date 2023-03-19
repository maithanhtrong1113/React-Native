import { useState } from "react";
import { ScrollView } from "react-native";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [works, setWorks] = useState([]);

  const onChangeInputText = (e) => {
    setText(e);
    console.log(e);
  };
  const addWork = () => {
    if (text === "") {
      Alert.alert("Thông báo", "Vui lòng nhập nội dung");
      return;
    }
    Keyboard.dismiss();
    setWorks([...works, text]);
    setText("");
  };
  const deleteWork = (workdelete) => {
    setWorks(works.filter((work) => work !== workdelete));
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10, color: "#98E5F1" }}>To Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add work"
          style={styles.inputStyle}
          value={text}
          onChangeText={onChangeInputText}
        />
        <Button title="Add work" onPress={addWork} />
      </View>
      <View style={styles.listWork}>
        <View style={styles.countList}>
          <Text>List work</Text>
          {works.length === 0 && (
            <Text style={{ color: "red" }}>{works.length}</Text>
          )}
          {works.length !== 0 && (
            <Text style={{ color: "blue" }}>{works.length}</Text>
          )}
        </View>

        <ScrollView>
          {works.map((work) => (
            <View style={styles.work} key={work}>
              <Text style={{ flex: 1, paddingHorizontal: 20 }}>{work}</Text>
              <Button
                title="Success"
                style={styles.button}
                onPress={() => deleteWork(work)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    borderColor: "#cccccc",
    borderWidth: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    marginRight: 10,
  },
  listWork: {},
  work: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#rgb(86 210 231)",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2B482F",
  },
  countList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
