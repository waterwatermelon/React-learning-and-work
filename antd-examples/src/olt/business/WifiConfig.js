import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Divider, Button, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import WifiForm from './form/WifiForm';
import { isExistReject } from '../../util/util';


function WifiConfig(props, ref) {
  const { initialValues = [], disable } = props;
  const formsRef = useRef([]);

  const [wifiList, setWifiList] = useState(initialValues);

  const handleAddWifiConfig = () => {
    const wifiListTemp = wifiList.slice();
    const nextIndex = wifiListTemp.length + 1;
    wifiListTemp.push({
      ssidId: nextIndex,
      ssidName: `wifi-${nextIndex}`,
      enable: true,
      passKey: '',
    });
    setWifiList(wifiListTemp);
  };

  const handleDeleteWifiConfig = (idx) => {
    const wifiListTemp = wifiList.slice();
    wifiListTemp.splice(idx, 1);
    setWifiList(wifiListTemp);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        validateFields: () => {
          let forms = formsRef.current;
          return new Promise((res, rej) => {
            Promise.allSettled(forms.map(form => form.validateFields()))
              .then(values => {
                if (!isExistReject(values)) {
                  res(values.map(value => value.value));
                }
                else {
                  rej();
                }
              })
              .catch(e => {
                console.error(e);
                rej(e);
              });

          });
        },

      };
    },
    [],
  );


  return (
    <>
      {!disable && <Button onClick={handleAddWifiConfig} >添加配置</Button>}
      {
        wifiList.map((item, idx) => {

          return (<>
            <Divider />
            {
              !disable &&
              <Row gutter={[24]} justify='end'>
                <Button
                  shape='circle'
                  type='text'
                  title='删除配置'
                  icon={<CloseOutlined />}
                  onClick={() => handleDeleteWifiConfig(idx)}
                />
              </Row>
            }
            <WifiForm initialValues={item} ref={c => formsRef.current[idx] = c} disable={disable} />
          </>);
        })
      }

    </>
  );
}


export default forwardRef(WifiConfig);