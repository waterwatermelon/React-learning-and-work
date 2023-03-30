
import React from 'react';
import { Button, View } from 'react-native';
import Header from '../component/Header';
import RNFetchBlob from 'rn-fetch-blob';
import { APP_DISK_DIR, SERVER_TOKEN } from './config';
import { styles } from './style';

function FetchBlobTest(props) {
  const FILE_UPLOAD_URL = '/olt/fttr/api/v1/upgrade/file/add';

  const handleDownload = () => {
    const resource = 'http://upload1.testspeed.cdn16.com:8080/speedtest/random3000x3000.jpg';
    let startTime, startLoaded;
    RNFetchBlob
      .config({
        fileCache: true, // 是否将文件写入本地磁盘的缓存目录。不写入的话，数据将保存在内存中。
      })
      .fetch('get',
        resource,
        {
          // 'Content-Type': 'application/json',
        },
        // JSON.stringify({ name: 'a'.repeat(1000) })
      )
      .progress({
        interval: 2000,
        // count: 10,
      }, (received, total) => {
        console.log('received:', received);
        console.log('total:', total);
        if (!startTime) {
          startTime = new Date();
          startLoaded = received;
        } else {
          const endTime = new Date();
          const endLoaded = received;
          const timeDiff = endTime - startTime;
          const loadedDiff = endLoaded - startLoaded;
          const speed = loadedDiff / timeDiff;
          const percent = received / total * 100;
          console.debug('timeDiff:', timeDiff);
          console.log('percent:%s %', percent.toFixed(2));
          console.log('speed:%s Kbyte/s', speed.toFixed(2));
        }
      })
      .then(response => {
        const properties = Object.keys(response);
        console.debug('properties:', properties);
        const { data, path } = response;
        console.log('data:', data);
        console.log('path:', path());
        // response.flush(); // 手动清空内存的中文件数据
      })
      .catch(err => {
        console.error(err);
      })
  };

  const handleUpload = () => {
    let startTime, startLoaded;
    RNFetchBlob.fetch('post', 'http://10.27.106.201' + FILE_UPLOAD_URL, {
      Authorization: SERVER_TOKEN,
      'Content-Type': 'multipart/form-data',
    }, [{
      name: 'title',
      data: '升级文件',
    },
    {
      name: 'model',
      data: 'SVA007',
    },
    {
      name: 'file',
      filename: 'index.html',
      type: 'text/html',
      data: RNFetchBlob.wrap(APP_DISK_DIR + '/cache/index.html'),
    },
    {
      name: 'fileVersion',
      data: '0.0.7',
    },])
      .uploadProgress((sent, total) => {
        console.debug('sent:', sent);
        console.log('total:', total);
        if (!startTime) {
          startTime = new Date();
          startLoaded = sent;
        } else {
          const endTime = new Date();
          const endLoaded = sent;
          const timeDiff = endTime - startTime;
          const loadedDiff = endLoaded - startLoaded;
          const speed = loadedDiff / timeDiff;
          console.debug('timeDiff:', timeDiff);
          console.log('speed:%s Kbyte/s', speed.toFixed(2));
        }
      })
      .then(response => {
        const { data } = response;
        console.debug('data:', data);
      })
  };

  return <View >
    <Header title='Fetch Blob' />
    <View style={styles.box}>
      <Button title='download' onPress={handleDownload} />
      <Button title='upload' onPress={handleUpload} />
    </View>
  </View>;

}

export default FetchBlobTest;