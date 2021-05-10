import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  YellowBox,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import PostDAO from "../DAO/PostDAO";
import firebase from "../../firebase/firebase.js";

console.disableYellowBox = true;



const HomeTab = () => {
  const [filterData, setFilterData] = useState("");

  const FilterData = () => {
    if (filterData == "") {
      getAllPost();
    } else {
      firebaseConfig
        .database()
        .ref()
        .child("Post")
        .on("value", (snapshot) => {
          var items = [];
          snapshot.forEach((child) => {
            let item = {
              key: child.key,
              image: child.val().image,
              post: child.val().post,
            };
            if (item.post.includes(filterData)) {
              items.push(item);
            }
          });
          setData(items);
        });
    }
  };

  const [data, setData] = useState([]);
  const refRBSheet = useRef();
  const [currentItem, setCurrentItem] = useState(null);
  _setCurrent = async (item) => {
    await setCurrentItem(item);
  };

  const [modalVisible, setModalVisible] = useState(false);
  _hideDialog = () => {
    setModalVisible(false);
  };
  _showDialog = () => {
    setModalVisible(true);
  };
  // Get all post in realtime
  const getAllPost = () => {
    firebaseConfig
      .database()
      .ref()
      .child("Post")
      .on("value", (snap) => {
        var items = [];
        snap.forEach((child) => {
          let item = {
            key: child.key,
            image: child.val().image,
            post: child.val().post,
          };
          items.push(item);
        });
        setData(items);
      });
  };
  // useEffect(() => {
  //     getAllPost();
  // }, []);
  useEffect(() => {
    FilterData();
  }, [filterData]);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerHome}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "#21465b" }}>
          TripAdvisor
        </Text>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <FontAwesome
            name="cloud-upload"
            size={25}
            color="#21465b"
            style={{
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Search */}

      <TextInput
        placeholder="Search"
        style={styles.search}
        onChangeText={(text) => {
          setFilterData(text);
        }}
      />
      {/* Add post */}
      <RBSheet
        height={380}
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <PostInsert item={currentItem} _hideDialog={_hideDialog} />
      </RBSheet>
      {/* Post */}
      <ScrollView>
        <View style={styles.post}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                _showDialog={_showDialog}
                _setCurrent={_setCurrent}
              />
            )}
          />
        </View>
      </ScrollView>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
                    {currentItem ? (
                        <PostInsert item={currentItem} _hideDialog={_hideDialog} />
                    ) : (
                        <PostInsert _hideDialog={_hideDialog} />
                    )}

                </Modal> */}
    </View>
  );
};
// Item product list
const ListItem = (props) => {
  const updateDelete = useRef();
  const updatePost = useRef();
  const [currentItem, setCurrentItem] = useState(null);
  _setCurrent = async (item) => {
    await setCurrentItem(item);
  };

  const [modalVisible, setModalVisible] = useState(false);
  _hideDialog = () => {
    setModalVisible(false);
  };
  _showDialog = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.listContainer}>
      {/* Bottom update, delete */}
      <RBSheet
        height={130}
        ref={updateDelete}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.updateDelete}>
          {/* Bottom update or delete */}
          {/* Delete */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              Alert.alert(
                "Delete",
                "Bạn muốn xóa post ?",
                [
                  {
                    text: "Không",
                    onPress: () => console.log("Cancel delete "),
                    type: "cancel",
                  },
                  { text: "Có", onPress: () => PostDAO.delete(props.item.key) },
                ],
                { cancelable: true }
              );
            }}
          >
            <MaterialIcons
              name="auto-delete"
              size={25}
              style={{ justifyContent: "space-between", alignSelf: "center" }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Delete post
              </Text>
              <Text style={{ fontSize: 14 }}>
                Posts will be moved to trash{" "}
              </Text>
            </View>
          </TouchableOpacity>
          {/* Update */}
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              updatePost.current.open(props.item);
              // props._setCurrent(props.item);
              // props._showDialog();

              console.log(props.item.key + "");
            }}
          >
            <Entypo
              name="edit"
              size={25}
              style={{ justifyContent: "space-between", alignSelf: "center" }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Edit post
              </Text>
              <Text style={{ fontSize: 14 }}>Change article content </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom sheet update */}
        <RBSheet
          height={500}
          ref={updatePost}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <PostUpdate item={currentItem} _hideDialog={_hideDialog} />
        </RBSheet>
        {/* Bottom sheet Update + Delete */}
      </RBSheet>
      <View style={{ width: width, height: 1 / 2, backgroundColor: "gray" }} />
      <Image
        source={{ uri: props.item.image }}
        style={{ width: width, height: 300, alignSelf: "center" }}
      />
      <Text style={{ fontSize: 16, marginLeft: 5, marginTop: 10 }}>
        {props.item.post}
      </Text>
      <View style={styles.note}>
        <View style={styles.comment}>
          <TouchableOpacity style={{ marginTop: 10, marginLeft: 5 }}>
            <FontAwesome
              name="heart-o"
              size={20}
              color="black"
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10, marginLeft: 20 }}>
            <FontAwesome
              name="comment-o"
              size={20}
              color="black"
              style={{
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => updateDelete.current.open()}
        >
          <Entypo
            name="dots-three-vertical"
            size={15}
            style={{
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeTab;

const PostInsert = (props, { closeSheet }) => {
  const [image, setImage] = useState("https://reactjs.org/logo-og.png");
  const [post, setPost] = useState("");
  const _chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };
  return (
    <View style={styles.addPost}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Text
            style={{
              color: "gray",
              alignSelf: "flex-start",
              justifyContent: "center",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>
          New Post
        </Text>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            PostDAO.insert(post, image);
            //   closeSheet
          }}
        >
          <Text
            style={{
              color: "gray",
              alignSelf: "flex-start",
              justifyContent: "center",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Please state your feelings "
        onChangeText={(text) => setPost(text)}
        style={{
          paddingLeft: 20,
          height: 40,
          borderColor: "gray",
          borderRadius: 5,
          borderBottomWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      ></TextInput>
      <TouchableOpacity onPress={() => _chooseImage()}>
        <Image
          source={{
            uri: image,
            marginLeft: 20,
            marginRight: 20,
            width: 320,
            height: 250,
          }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            margin: 10,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
// Update
const PostUpdate = (props) => {
  const [key, setKey] = useState(props.item.key);
  const [image, setImage] = useState(props.item.image);
  const [post, setPost] = useState(props.item.post);

  const _chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };
  return (
    //     <View style={styles.addPost}>
    //     <Text style={{fontSize: 20}}>Edit Post</Text>
    //     <Text>{props.item.post}</Text>
    //     <TextInput placeholder="Please state your feelings " value={post}  onChangeText={(text) => setPost(text)}
    //      style={{paddingLeft: 20, height: 40, borderColor: 'gray',
    //       borderRadius:5, borderBottomWidth: 1, marginLeft: 40, marginRight:40}}></TextInput>
    //   <TouchableOpacity onPress={() => _chooseImage()} >
    //                 <Image
    //                     source={{ uri: image, width: 300, height: 200}}
    //                     style={{ borderWidth: 1, borderColor: 'black', margin: 10, alignSelf: 'center'}}
    //                 />
    //     </TouchableOpacity>
    //    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    //        <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={()=>{
    //            props._hideDialog();
    //        }}>
    //            <Text style={{width: 100, height: 50}}>Cancel</Text>
    //        </TouchableOpacity>
    //        <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={()=>{
    //            props._showDialog();
    //            PostDAO.update(key,post,image);
    //        }}>
    //            <Text style={{width: 100, height: 50}}>Save</Text>
    //        </TouchableOpacity>
    //    </View>
    // </View>
    <View style={styles.addPost}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{}} onPress={() => {}}>
          <Text
            style={{
              color: "gray",
              alignSelf: "flex-start",
              justifyContent: "center",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>
          Edit Post
        </Text>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            PostDAO.update(key, post, image);
            //   closeSheet
          }}
        >
          <Text
            style={{
              color: "gray",
              alignSelf: "flex-start",
              justifyContent: "center",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Please state your feelings"
        value={post}
        onChangeText={(text) => setPost(text)}
        style={{
          paddingLeft: 20,
          height: 40,
          borderColor: "gray",
          borderRadius: 5,
          borderBottomWidth: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      ></TextInput>
      <TouchableOpacity onPress={() => _chooseImage()}>
        <Image
          source={{
            uri: image,
            marginLeft: 20,
            marginRight: 20,
            width: 320,
            height: 250,
          }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            margin: 10,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
// Styles
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,

    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  headerHome: {
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  search: {
    paddingLeft: 10,
    alignSelf: "center",
    width: 350,
    height: 40,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1 / 2,
    marginLeft: 20,
    marginRight: 20,
  },
  discover: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  listContainer: {
    marginTop: 10,
    borderRadius: 20,
    padding: 5,
  },
  comment: {
    flexDirection: "row",
  },
  note: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerItem: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  post: {
    marginTop: 10,
  },
  updateDelete: {
    height: 100,
  },
  deleteButton: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1
  },
  updateButton: {
    marginTop: 5,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1
  },
});
