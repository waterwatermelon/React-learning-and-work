import React from 'react';
import { Text, View, Button, StyleSheet, Platform } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';

function FileAccessTest() {
  const SERVE_BASE_URL = 'http://10.27.106.201';
  const TEST_FILE_NAME = 'test.txt';
  const TEST_DIR = Dirs.CacheDir;
  // const DOWNLOAD_FILE_NAME = '';

  // 读取目录
  const handleReadDir = async () => {
    const fileList = await FileSystem.ls(TEST_DIR);
    console.log('Dirs.CacheDir', TEST_DIR);
    console.log('file list', fileList);
  };

  // 数据写入本地文件
  const handleWriteDataToFile = async () => {
    const data = 'hello react-native-file-access'
    await FileSystem.writeFile(TEST_DIR + '/' + TEST_FILE_NAME, data);
  };

  // 读取文件内容
  const handleReadFile = async () => {
    const data = await FileSystem.readFile(TEST_DIR + '/' + TEST_FILE_NAME);
    console.log('data:', data);
  };

  // 下载文件到本地
  const handleFetchFile = () => {
    const resource = SERVE_BASE_URL + '/index.html';
    const init = {
      path: TEST_DIR + '/index.html',
    };
    FileSystem.fetch(resource, init).then(fetchResult => {
      const { ok, url } = fetchResult;
      console.log('[fetch result] ok ? ', ok);
      console.log('url', url);
    })
  };

  // 上传本地文件到服务器
  const handleUploadFile = () => {
    const params = new FormData();
    params.append('name', 'upload');

    const file = {

      uri: 'file://' + Dirs.CacheDir + '/' + TEST_FILE_NAME, //  uri 需要构造成`file://`协议
      type: 'multipart/form-data;charset=utf-8',
      name: TEST_FILE_NAME,
      fileType: '', // 文件的MIME值
    };
    params.append('file', file);
    fetch(SERVE_BASE_URL + '/upload', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
      },
      body: params,
    });
  };

  return (
    <>
      <Text >file access</Text>
      <View style={styles.box}>
        <View style={{ width: '50%', }}>
          <Button title='read cache dir' onPress={handleReadDir} />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='write data' onPress={handleWriteDataToFile} />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='read file' onPress={handleReadFile} />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='fetch file' onPress={handleFetchFile} />
        </View>
      </View>

      <View style={styles.box}>
        <Button title='upload file' onPress={handleUploadFile} />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    padding: 12,
  }
})
export default FileAccessTest;