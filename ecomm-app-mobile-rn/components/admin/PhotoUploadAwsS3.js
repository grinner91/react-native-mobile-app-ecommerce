import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { RNS3 } from "react-native-aws3";
import { launchImageLibrary } from "react-native-image-picker";
import * as MediaLibrary from "expo-media-library";
import { AWS_S3_ACCESS_KEY, AWS_S3_SECRET } from "../../common/aws.s3.config";
import { styles } from "../../styles/styles";

export const PhotoUploadAwsS3 = () => {
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");

  useEffect(() => {
    getMediaLibPermission();
  }, []);

  const getMediaLibPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      console.log("media: ", status);
    } else {
      Alert.alert("Please, allow Media (Photos) file permission.");
    }
  };

  const selectPhotoFile = () => {
    let options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (response) => {
      console.log("launchImageLibrary res: ", response);
      console.log("launchImageLibrary assets: ", response.assets[0]);
      setUploadSuccessMessage("");
      if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };

  const uploadPhotoFile = () => {
    console.log("filePath : ", filePath);
    if (Object.keys(filePath).length == 0) {
      alert("Please select photo.");
      return;
    }
    console.log("filePath : ", filePath);
    //application/octet-stream'
    //`binary/octet-stream`
    RNS3.put(
      {
        uri: filePath.uri,
        name: filePath.fileName,
        type: "application/octet-stream",
        ContentType: "application/json",
      },
      {
        bucket: "miumad571", //"**Name of Your AWS Bucket**", // Ex. aboutreact
        region: "us-east-2", //"**Region**", // Ex. ap-south-1
        accessKey: AWS_S3_ACCESS_KEY, //"**Replace your Access Key**",//
        secretKey: AWS_S3_SECRET, //"**Replace your Secrete Key**", //
      }
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`
        )
      )
      .then((response) => {
        if (response.status !== 201) alert("Failed to upload photo to S3");
        console.log("photo upload res: ", response.body);
        setFilePath("");
        let { bucket, etag, key, location } = response.body.postResponse;
        setUploadSuccessMessage(
          ` Successfully upload phto: 
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`
        );
      });
  };

  return (
    <View>
      {/* <Image
        source={{
          uri: "https://miumad571.s3.us-east-2.amazonaws.com/miumad571photos/toys-kids-1.jpg",
        }}
        style={{ width: 100, height: 100 }}
      /> */}
      {filePath.uri ? (
        <>
          {/* //filePath.uri */}
          <Image
            source={{
              uri: "https://miumad571.s3.us-east-2.amazonaws.com/miumad571photos/toys-kids-1.jpg",
            }}
            style={styles.imagePreview}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.adminColor]}
            onPress={uploadPhotoFile}
          >
            <Text style={styles.submitButtonText}>Upload Photo</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {uploadSuccessMessage ? (
        <Text style={styles.title3}>{uploadSuccessMessage}</Text>
      ) : null}
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button, styles.adminColor]}
        onPress={selectPhotoFile}
      >
        <Text style={styles.title3}>Select Photo</Text>
      </TouchableOpacity>
    </View>
  );
};
