import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Dirs, FileSystem, Util } from 'react-native-file-access';

function FileAccessTest() {
  const SERVER_BASE_URL = 'http://10.27.106.201';
  const TEST_FILE_NAME = 'test.txt';
  const TEST_DIR = Dirs.CacheDir;

  // const DOWNLOAD_FILE_NAME = '';
  const [fileList, setFileList] = useState([]);

  // 读取目录
  const handleReadDir = async () => {
    setFileList([]);
    const fileList = await FileSystem.ls(TEST_DIR);
    console.log('Dirs.CacheDir', TEST_DIR);
    console.log('file list', fileList);
    setFileList(fileList);
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
    let startTime;
    // const resource = SERVE_BASE_URL + '/index.html';
    const resource = 'http://upload1.testspeed.cdn16.com:8080/speedtest/random3000x3000.jpg';
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
          console.log('speed:%s', speed);
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

  // 上传本地文件到服务器
  const handleUploadFile = () => {
    const params = new FormData();
    params.append('name', 'upload');

    const file = {
      uri: 'file://' + TEST_DIR + '/' + TEST_FILE_NAME, //  uri 需要构造成`file://`协议
      type: 'multipart/form-data;charset=utf-8',
      name: TEST_FILE_NAME,
      fileType: '', // 文件的MIME值
    };
    params.append('file', file);
    // FIXME: response内容奇怪
    fetch(SERVER_BASE_URL + '/olt/fttr/api/v1/upgrade/file/add', {
      method: 'post',
      headers: {
        // 'Content-Type': 'multipart/form-data;charset=utf-8',
        Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2ODAwNTIzMTksIlJPTEUiOiJNQU5VRkFDVFVSRVIiLCJMT0dJTl9USU1FIjoiMjAyMy0wMy0yOSAwOToxMTo1OSIsIlVJRCI6MSwiVEVSTUlOQUwiOiJMaW51eCIsIlBSSVZJTEVHRV9OQU1FIjoiW1N5c3RlbU1hbmFnZW1lbnQsIERldmljZU1hbmFnZW1lbnQsIFN5c3RlbU1vbml0b3JpbmcsIFRvcG9sb2d5LCBaaGpnTWFuYWdlbWVudCwgUmlnaHRHcmFudE1hbmFnZW1lbnQsIFVzZXJNYW5hZ2VtZW50LCBVc2VyR3JvdXBNYW5hZ2VtZW50LCBTeXN0ZW1Db25maWd1cmF0aW9uLCBXZWJUZW1wbGF0ZSwgQXBwbGljYXRpb25NYW5hZ2VyLCBNYXN0ZXJCYWNrdXBNYW5hZ2VyLCBEYXRhQmFja3VwLCBTeXN0ZW1VcGdyYWRlLCBPbHRNYW5hZ2VtZW50LCBHYXRld2F5TWFuYWdlbWVudCwgT2x0TWFuYWdlbWVudCwgT2x0TWFuYWdlbWVudCwgRnR0ck1hbmFnZW1lbnQsIFN5c3RlbUFsYXJtLCBTeXN0ZW1Mb2csIFBlcmZvcm1hbmNlTW9uaXRvcmluZywgQ29tcG9uZW50TW9uaXRvcmluZywgVG9wb2xvZ3lBcHBlYXIsIFRvcG9sb2d5TWFuYWdlciwgWmhqZ0ZpbGVNYW5hZ2VtZW50LCBVc2VyU2FmZXR5LCBEZXZpY2VMaXN0LCBEZXZpY2VBbGFybU1hbmFnZW1lbnQsIEdhdGV3YXlFbGVtZW50TWFuYWdlbWVudCwgR2F0ZXdheVRhc2tNYW5hZ2VtZW50LCBHYXRld2F5QWxhcm1NYW5hZ2VtZW50LCBHYXRld2F5UGFyYW1ldGVyTWFuYWdlbWVudCwgT2x0TWFuYWdlbWVudCwgQWxhcm1NYW5hZ2VtZW50LCBEZXZpY2VUYXNrLCBPbHRNYW5hZ2VtZW50LCBPbHRNYW5hZ2VtZW50LCBGdHRyRWxlbWVudE1hbmFnZW1lbnQsIEZ0dHJUYXNrTWFuYWdlbWVudCwgRnR0ckFsYXJtTWFuYWdlbWVudF0iLCJFWFBJUkVfVElNRSI6IjE2ODAwNTk1MTk2NjIiLCJST09UX1NJVEVfSUQiOiIwIiwiTE9HSU5fSVAiOiIxMC4yNy4xMDYuMjEiLCJTSVRFX0xJU1QiOiIwIiwiR1JPVVBfSUQiOjF9.5Us5vTE1bR9ezmVs9qb4PNmJnY2txD9dDp2QclwhYcM",
      },
      body: params,
    })
    .then(response => {
      if(response.ok) {
        const text = response.text();
        console.log('text', text);
      }
    });
  };

  // const uploadFileByXhr = () => {
  //   const params = new FormData();
  //   params.append('name', 'upload');
  //   const file = {
  //     uri: 'file://' + TEST_DIR + '/' + TEST_FILE_NAME,
  //     type: 'multipart/form-data;charset=utf-8',
  //     name: TEST_FILE_NAME,
  //     fileType: '', // 'text/html'
  //   };

  // };

  return (
    <>
      <Text style={styles.title}>file access</Text>
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
        <Text style={styles.subtitle}>{TEST_DIR}</Text>
        <View>
          {
            fileList.map(e => <View>
              <Text>{e}</Text>
            </View>)
          }
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
export default FileAccessTest;