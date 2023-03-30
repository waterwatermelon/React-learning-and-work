import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { Dirs, FileSystem, Util } from 'react-native-file-access';
import { SERVER_TOKEN } from './config';
import { styles } from './style';
import Header from '../component/Header';

function FileAccessTest() {
  const SERVER_BASE_URL = 'http://10.27.106.201';
  const FILE_UPLOAD_URL = '/olt/fttr/api/v1/upgrade/file/add';
  const TEST_FILE_NAME = 'random3000x3000.jpg'; // test.txt
  const TEST_DIR = Dirs.CacheDir;


  // const DOWNLOAD_FILE_NAME = '';
  const [fileList, setFileList] = useState([]);

  // 读取目录
  const handleReadDir = async () => {
    setFileList([]);
    const fileList = await FileSystem.ls(TEST_DIR);
    console.log('Dirs.CacheDir', TEST_DIR);
    console.log('file list', fileList);
    const fileStatList = await FileSystem.statDir(TEST_DIR);
    console.log('fileStatList', fileStatList);
    setFileList(fileStatList);
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

  // 下载文件到本地(fetch)
  const handleDownloadFile = () => {
    let startTime;
    const resource = SERVER_BASE_URL + '/index.html';
    // const resource = 'http://upload1.testspeed.cdn16.com:8080/speedtest/random3000x3000.jpg';
    const filename = Util.basename(resource);
    console.log('filename', filename);
    const init = {
      path: TEST_DIR + '/' + filename,
    };
    FileSystem.fetch(
      resource,
      init,
      // onProgress
      (bytesRead, contentLength, done) => {
        console.log('is done ?', done);
        console.log('bytesRead', bytesRead);
        console.log('contentLength', contentLength);
        if (startTime) {
          const timeDiff = new Date() - startTime;
          const speed = bytesRead / timeDiff;
          console.log('speed:%s Kbyte/s', speed);
        } else {
          startTime = new Date();
        }
      }
    ).then(fetchResult => {
      const { ok, url } = fetchResult;
      console.log('[fetch result] ok ? ', ok);
      console.log('url', url);
    })
  };

  // 上传本地文件到服务器(fetch)
  const handleUploadFileByFetch = () => {
    const params = new FormData();
    params.append('name', 'upload');

    const file = {
      uri: 'file://' + TEST_DIR + '/' + TEST_FILE_NAME, //  uri 需要构造成`file://`协议
      type: 'multipart/form-data;charset=utf-8',
      name: TEST_FILE_NAME,
      fileType: '', // 文件的MIME值
    };
    params.append('file', file);
    fetch(SERVER_BASE_URL + FILE_UPLOAD_URL, {
      method: 'post',
      headers: {
        Authorization: SERVER_TOKEN,
      },
      body: params,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        console.log('response body:', json);
      });
  };

  // 上传本地文件到服务器(xhr)
  const handleUploadFileByXhr = () => {
    const params = new FormData();
    params.append('name', 'upload');
    const file = {
      uri: 'file://' + TEST_DIR + '/' + TEST_FILE_NAME, //  uri 需要构造成`file://`协议
      type: 'multipart/form-data;charset=utf-8',
      name: TEST_FILE_NAME,
      fileType: '', // 文件的MIME值
    };
    params.append('file', file);

    const xhr = new XMLHttpRequest();

    let startTime, startLoaded;
    // 不生效
    // xhr.upload.onloadstart = function (e) {
    //   console.log('[loadstart]');
    // }
    // 不生效
    // xhr.upload.onloadend = function (e) {
    //   console.log('[loadend]');
    // }
    // Q:速率测量结果是否准确？
    xhr.upload.onprogress = function (e) {
      console.log('[onprogress] e', e);
      const { loaded, total, timeStamp } = e;
      if (!startTime) {
        startTime = new Date();
        startLoaded = loaded;
      } else {
        const endTime = new Date();
        const endLoaded = loaded;
        const timeDiff = endTime - startTime;
        const loadedDiff = endLoaded - startLoaded;
        const speed = loadedDiff / timeDiff;
        console.log('timeDiff', timeDiff);
        console.log('speed:%d Kbyte/s', speed);
        console.log('speed:%d Mbyte/s', speed / 1000);
      }
    }
    xhr.onreadystatechange = function (e) {
      if (e.target.readyState === 4) {
        // console.log('response:', xhr.response);
      }
    }
    xhr.open('post', SERVER_BASE_URL + FILE_UPLOAD_URL);
    xhr.setRequestHeader('Authorization', SERVER_TOKEN);
    xhr.send(params);
  };

  return (
    <>
      <Header title='File Access' />
      <View style={styles.box}>
        <View style={{ width: '50%' }}>
          <Button title='write data' onPress={handleWriteDataToFile} />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='read file' onPress={handleReadFile} />
        </View>
        <View style={{ width: '50%' }}>
          <Button title='download file' onPress={handleDownloadFile} />
        </View>
      </View>
      <View style={[styles.box, styles.border]}>
        <View style={styles.marginBottom}>
          <Button title='read test dir' onPress={handleReadDir} />
        </View>

        <View style={[styles.box]}>
          <Text style={styles.subtitle}>{TEST_DIR}</Text>
          {
            fileList.map(e => <View>
              <Text>{e.filename}({e.size})</Text>
            </View>)
          }
          <Text style={[styles.textSecondary,
          { display: fileList.length === 0 ? 'flex' : 'none' }]}> 暂无数据</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Button title='upload-file(fetch)' onPress={handleUploadFileByFetch} />
        <Button title='upload-file(xhr)' onPress={handleUploadFileByXhr} />
      </View>
    </>
  )
}
export default FileAccessTest;