import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SpalashScreen from "expo-splash-screen";
import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SpalashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  console.log("Hello");
  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SpalashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const [text, setText] = useState("");
  const [works, setWorks] = useState([]);
  const [modal, setModal] = useState(false);
  if (!fontsLoaded) return null;

  const toggleModal = () => {
    setModal(!modal);
  };

  const onChangeInputText = (e) => {
    setText(e);
  };

  const addWork = () => {
    if (text === "") {
      Alert.alert("Thông báo", "Vui lòng nhập nội dung");
      return;
    }
    Keyboard.dismiss();
    setWorks([...works, text]);
    setText("");
    toggleModal();
  };
  const deleteWork = (workdelete) => {
    setWorks(works.filter((work) => work !== workdelete));
  };
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Image
        style={styles.image}
        source={require("./assets/images/toDoList.png")}
      />

      {/* <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={toggleModal}
      >
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontFamily: "Poppins-Bold",
          }}
        >
          Login with Facebook
        </Text>
      </Icon.Button> */}
      <Text
        style={{
          marginVertical: 10,
          color: "black",
          fontFamily: "Poppins-Bold",
        }}
      >
        To Do List
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Add new Work</Text>
        <Icon name="plus" size={20} color="black" />
      </TouchableOpacity>
      {modal && (
        <Modal animationType="slide">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add work"
              style={styles.inputStyle}
              value={text}
              onChangeText={onChangeInputText}
            />
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={addWork}
                style={{
                  backgroundColor: "#5CA1D4",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Add Work</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: "#DA73CE",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.listWork}>
        <View style={styles.countList}>
          <Text style={{ fontFamily: "Poppins-Bold", marginVertical: 10 }}>
            List work
          </Text>
          {works.length === 0 && (
            <Text style={{ color: "red" }}>{works.length}</Text>
          )}
          {works.length !== 0 && (
            <Text style={{ color: "blue" }}>{works.length}</Text>
          )}
        </View>
        {/* hỗ trợ lazyLoad với List */}
        <FlatList
          style={styles.flatListwwork}
          data={works}
          alwaysBounceVertical={false}
          renderItem={(itemData) => {
            return (
              // Khi người dùng chạm vào sẽ thực hiện sự kiện
              <Pressable onPress={() => deleteWork(itemData.item)}>
                <View style={styles.work}>
                  <Text style={{ flex: 1, paddingHorizontal: 10 }}>
                    {itemData.item}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
        {/* <ScrollView>
          {works.map((work) => (
            <View style={styles.work} key={work}>
              <Text>{work}</Text>
              <Button title="Success" onPress={() => deleteWork(work)} />
            </View>
          ))}
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#7EF1E1",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "column",
    paddingTop: "10%",
    backgroundColor: "#7EF1E1",
    flex: 1,
  },
  inputStyle: {
    borderColor: "#E76AE8",
    borderWidth: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    marginHorizontal: 20,
    color: "#E76AE8",
  },

  work: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#rgb(86 210 231)",
    marginBottom: 10,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "space-between",
    backgroundColor: "#rgb(86 210 231)",

    padding: 10,
  },
  countList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    paddingLeft: 10,
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  image: {
    width: "100%",
    marginBottom: 10,
    height: "40%",
    borderRadius: 10,
  },
  flatListwwork: {
    height: "35%",
  },
});
