import React, { useEffect } from 'react'
import Papa from 'papaparse';

export default
  function Demo() {

  const parse = (str) => {
    Papa.parse(str, {
      header: true, /*csv文件包含表头，并将表头作为字段名称*/
      /**每解析一行触发 */
      // step: (row) => {
      //   console.log('Row:', row);
      // },
      /** */
      complete: (result) => {
        console.log('Result:', result)
      }
    });
  };

  const handleFileChange = e => {
    console.log('handleFileChange,e:', e);
    const file = e.target.files[0];
    parse(file);

  };


  const handleExport = () => {
    const data = [
      { deviceSn: 'STARSNSU3140', deviceName: 'SU3140-AX30-模板设备	', username: '', password: '', },
      { deviceSn: 'STARFFCCFE81', deviceName: '主设备', username: '', password: '', },
      { deviceSn: 'STAR31400001', deviceName: 'test01', username: 'hello01', password: '",0001""room&%', },
    ];

    const csv = Papa.unparse(data, {
      // header: true, // 包含表头
      delimiter: ",", // 分隔符
      quotes: true, // 使用引号包裹字段
      skipEmptyLines: true // 跳过空行
    });
    console.log('csv_content:', csv);
  };
  useEffect(() => {
    const mockdata = '账号,密码 \nsfj,123456';
    parse(mockdata);
  }, []);
  return <>
    <input type='file' onChange={handleFileChange} />
    <button onClick={handleExport}>export csv</button>
  </>
}