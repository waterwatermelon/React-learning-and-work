
import React, { useState, useEffect } from "react";
import { CustomTable } from 'src';
import { SearchBox } from "src";
import { Menus } from "src";
import { Button, Form, message, Modal } from "antd";
import { TwoColumnMainLayout } from "src";
import './CustomTableTest.scss';
import CommonFormItem from "src/components/CommonForm/CommonFormItem";
import { cols } from './schema';


const productList1 = [
  {
    "id": 2,
    "title": "测试产品7",
    "categoryId": 4,
    "serialNumber": "SPD201209000011",
    "state": "ACTIVE",
    "coverId": "b9d23cf0-3a06-11eb-9293-476937b1ca84",
    "coverName": "test.jpg",
    "model": "777",
    "overview": "134",
    "price": 7777700,
    "specifications": "",
    "sort": 7777,
    "unit": "23",
    "isSaleAlone": 1,
    "detailId": 56
  }, {
    "id": 3,
    "title": "测试产品-9",
    "categoryId": 2,
    "serialNumber": "SPD201209000013",
    "state": "ACTIVE",
    "coverId": "dda11bb0-3a06-11eb-a19c-e71da49adcc6",
    "coverName": "test.jpg",
    "model": "999",
    "overview": "999",
    "price": 9999900,
    "specifications": "",
    "sort": 999,
    "unit": "9999",
    "isSaleAlone": 1,
    "detailId": 58
  }, {
    "id": 4,
    "title": "VT40",
    "categoryId": 6,
    "serialNumber": "SPD201209000001",
    "state": "ACTIVE",
    "coverId": "c045d1e0-39e4-11eb-a19c-e71da49adcc6",
    "coverName": "image.png",
    "model": "VT40",
    "overview": "aaaaaaa",
    "price": 121200,
    "specifications": "",
    "sort": 11,
    "unit": "DAN",
    "isSaleAlone": 1,
    "detailId": 40
  }, {
    "id": 5,
    "title": "测试产品-6",
    "categoryId": 7,
    "serialNumber": "SPD201209000010",
    "state": "ACTIVE",
    "coverId": "76dfdf10-3a06-11eb-aa7b-5d9be14371aa",
    "coverName": "test.jpg",
    "model": "66",
    "overview": "11",
    "price": 11100,
    "specifications": "",
    "sort": 11,
    "unit": "111",
    "isSaleAlone": 1,
    "detailId": 55
  }, {
    "id": 6,
    "title": "星网锐捷统一通信SVC9000",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203004",
    "state": "ACTIVE",
    "coverId": "cd89b690-3512-11eb-975d-7137fad12878",
    "coverName": "8f79b70133564009b35d42e303f0d0ac.png",
    "model": "SVC9000",
    "overview": "星网锐捷统一通信SVC9000系列（以下简称9000）统一网关是星网锐捷统一通信解决方案中的大容量音视频交换设备。面向6000用户以内的大规模政企用户，提供专业的统一通信解决方案。",
    "price": 12312,
    "specifications": "星网锐捷统一通信SVC9000-规格规格",
    "sort": 6,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 4
  }, {
    "id": 7,
    "title": "套件1",
    "categoryId": 1,
    "serialNumber": "CHANPIN201203001",
    "state": "ACTIVE",
    "coverId": "de13c460-3508-11eb-9388-cd7dadc21c29",
    "coverName": "timg.jpeg",
    "model": "11111111",
    "overview": "驱蚊器的",
    "price": 300,
    "specifications": "1212",
    "sort": 5,
    "unit": "件",
    "isSaleAlone": 1,
    "detailId": 1
  }, {
    "id": 8,
    "title": "H810E智能网关",
    "categoryId": 4,
    "serialNumber": "CHANPIN201203003",
    "state": "ACTIVE",
    "coverId": "403d3a50-3512-11eb-a6b4-755fb574ae9d",
    "coverName": "3024fdc45dcd4917920d055d21f6a450.jpg",
    "model": "H810E",
    "overview": "H810E智能网关是一款基于光纤到户（FTTH）的智能终端设备",
    "price": 2356,
    "specifications": "H810E智能网关-规格",
    "sort": 2,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 3
  }, {
    "id": 9,
    "title": "星网锐捷统一通信SVP3300多媒体终端",
    "categoryId": 3,
    "serialNumber": "CHANPIN201203002",
    "state": "ACTIVE",
    "coverId": "f22f5830-3510-11eb-aca3-45ebd6e5a603",
    "coverName": "561435f4568745929080e35213bd6b22.png",
    "model": "SVP3300",
    "overview": "SVP3300是一款多媒体音视频通信终端，配备高分辨率7英寸彩色LCD触摸显示屏，内置可上下旋转的200万像素CMOS摄像头",
    "price": 10001,
    "specifications": "星网锐捷统一通信SVP3300多媒体终端-规格规格",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 2
  }, {
    "id": 10,
    "title": "套件2",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203005",
    "state": "ACTIVE",
    "coverId": "a75b95a0-3513-11eb-975d-7137fad12878",
    "coverName": "27a4b7f243704c14aaa2d3ca104175b9.png",
    "model": "SU8300",
    "overview": "星网锐捷 SU8300 融合通信服务器（以下简称8300）是星网锐捷统一通信解决方案的大中容量核心语音网关，配套星网锐捷IP终端及统一通信应用，面向1200用户以内的中小规模政企用户，提供专业的统一通信解决方案。\n\n",
    "price": 342311,
    "specifications": "规格",
    "sort": 1,
    "unit": "套",
    "isSaleAlone": 1,
    "detailId": 5
  }, {
    "id": 11,
    "title": "多业务接入终端",
    "categoryId": 4,
    "serialNumber": "SPD201207000001",
    "state": "ACTIVE",
    "coverId": "c5632d50-385c-11eb-b2ee-e3844a1a9874",
    "coverName": "4G4S.png",
    "model": "SU6100",
    "overview": "POL综合业务网关，集路由、交换、无线、语音等应用于一体。GPON上行，4个下行GE接口，4个FXS口。外置双天线，支持802.11b/g/n/ac，2╳2 MIMO。",
    "price": 74100,
    "specifications": "",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 11
  },
  {
    "id": 12,
    "title": "星网锐捷统一通信SVC9000",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203004",
    "state": "ACTIVE",
    "coverId": "cd89b690-3512-11eb-975d-7137fad12878",
    "coverName": "8f79b70133564009b35d42e303f0d0ac.png",
    "model": "SVC9000",
    "overview": "星网锐捷统一通信SVC9000系列（以下简称9000）统一网关是星网锐捷统一通信解决方案中的大容量音视频交换设备。面向6000用户以内的大规模政企用户，提供专业的统一通信解决方案。",
    "price": 12312,
    "specifications": "星网锐捷统一通信SVC9000-规格规格",
    "sort": 6,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 4
  }, {
    "id": 13,
    "title": "套件1",
    "categoryId": 1,
    "serialNumber": "CHANPIN201203001",
    "state": "ACTIVE",
    "coverId": "de13c460-3508-11eb-9388-cd7dadc21c29",
    "coverName": "timg.jpeg",
    "model": "11111111",
    "overview": "驱蚊器的",
    "price": 300,
    "specifications": "1212",
    "sort": 5,
    "unit": "件",
    "isSaleAlone": 1,
    "detailId": 1
  }, {
    "id": 14,
    "title": "H810E智能网关",
    "categoryId": 4,
    "serialNumber": "CHANPIN201203003",
    "state": "ACTIVE",
    "coverId": "403d3a50-3512-11eb-a6b4-755fb574ae9d",
    "coverName": "3024fdc45dcd4917920d055d21f6a450.jpg",
    "model": "H810E",
    "overview": "H810E智能网关是一款基于光纤到户（FTTH）的智能终端设备",
    "price": 2356,
    "specifications": "H810E智能网关-规格",
    "sort": 2,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 3
  }, {
    "id": 15,
    "title": "星网锐捷统一通信SVP3300多媒体终端",
    "categoryId": 3,
    "serialNumber": "CHANPIN201203002",
    "state": "ACTIVE",
    "coverId": "f22f5830-3510-11eb-aca3-45ebd6e5a603",
    "coverName": "561435f4568745929080e35213bd6b22.png",
    "model": "SVP3300",
    "overview": "SVP3300是一款多媒体音视频通信终端，配备高分辨率7英寸彩色LCD触摸显示屏，内置可上下旋转的200万像素CMOS摄像头",
    "price": 10001,
    "specifications": "星网锐捷统一通信SVP3300多媒体终端-规格规格",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 2
  }, {
    "id": 16,
    "title": "套件2",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203005",
    "state": "ACTIVE",
    "coverId": "a75b95a0-3513-11eb-975d-7137fad12878",
    "coverName": "27a4b7f243704c14aaa2d3ca104175b9.png",
    "model": "SU8300",
    "overview": "星网锐捷 SU8300 融合通信服务器（以下简称8300）是星网锐捷统一通信解决方案的大中容量核心语音网关，配套星网锐捷IP终端及统一通信应用，面向1200用户以内的中小规模政企用户，提供专业的统一通信解决方案。\n\n",
    "price": 342311,
    "specifications": "规格",
    "sort": 1,
    "unit": "套",
    "isSaleAlone": 1,
    "detailId": 5
  }, {
    "id": 17,
    "title": "多业务接入终端",
    "categoryId": 4,
    "serialNumber": "SPD201207000001",
    "state": "ACTIVE",
    "coverId": "c5632d50-385c-11eb-b2ee-e3844a1a9874",
    "coverName": "4G4S.png",
    "model": "SU6100",
    "overview": "POL综合业务网关，集路由、交换、无线、语音等应用于一体。GPON上行，4个下行GE接口，4个FXS口。外置双天线，支持802.11b/g/n/ac，2╳2 MIMO。",
    "price": 74100,
    "specifications": "",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 11
  }, {
    "id": 18,
    "title": "星网锐捷统一通信SVC9000",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203004",
    "state": "ACTIVE",
    "coverId": "cd89b690-3512-11eb-975d-7137fad12878",
    "coverName": "8f79b70133564009b35d42e303f0d0ac.png",
    "model": "SVC9000",
    "overview": "星网锐捷统一通信SVC9000系列（以下简称9000）统一网关是星网锐捷统一通信解决方案中的大容量音视频交换设备。面向6000用户以内的大规模政企用户，提供专业的统一通信解决方案。",
    "price": 12312,
    "specifications": "星网锐捷统一通信SVC9000-规格规格",
    "sort": 6,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 4
  }, {
    "id": 19,
    "title": "套件1",
    "categoryId": 1,
    "serialNumber": "CHANPIN201203001",
    "state": "ACTIVE",
    "coverId": "de13c460-3508-11eb-9388-cd7dadc21c29",
    "coverName": "timg.jpeg",
    "model": "11111111",
    "overview": "驱蚊器的",
    "price": 300,
    "specifications": "1212",
    "sort": 5,
    "unit": "件",
    "isSaleAlone": 1,
    "detailId": 1
  }, {
    "id": 20,
    "title": "H810E智能网关",
    "categoryId": 4,
    "serialNumber": "CHANPIN201203003",
    "state": "ACTIVE",
    "coverId": "403d3a50-3512-11eb-a6b4-755fb574ae9d",
    "coverName": "3024fdc45dcd4917920d055d21f6a450.jpg",
    "model": "H810E",
    "overview": "H810E智能网关是一款基于光纤到户（FTTH）的智能终端设备",
    "price": 2356,
    "specifications": "H810E智能网关-规格",
    "sort": 2,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 3
  }, {
    "id": 21,
    "title": "星网锐捷统一通信SVP3300多媒体终端",
    "categoryId": 3,
    "serialNumber": "CHANPIN201203002",
    "state": "ACTIVE",
    "coverId": "f22f5830-3510-11eb-aca3-45ebd6e5a603",
    "coverName": "561435f4568745929080e35213bd6b22.png",
    "model": "SVP3300",
    "overview": "SVP3300是一款多媒体音视频通信终端，配备高分辨率7英寸彩色LCD触摸显示屏，内置可上下旋转的200万像素CMOS摄像头",
    "price": 10001,
    "specifications": "星网锐捷统一通信SVP3300多媒体终端-规格规格",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 2
  }, {
    "id": 22,
    "title": "套件2",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203005",
    "state": "ACTIVE",
    "coverId": "a75b95a0-3513-11eb-975d-7137fad12878",
    "coverName": "27a4b7f243704c14aaa2d3ca104175b9.png",
    "model": "SU8300",
    "overview": "星网锐捷 SU8300 融合通信服务器（以下简称8300）是星网锐捷统一通信解决方案的大中容量核心语音网关，配套星网锐捷IP终端及统一通信应用，面向1200用户以内的中小规模政企用户，提供专业的统一通信解决方案。\n\n",
    "price": 342311,
    "specifications": "规格",
    "sort": 1,
    "unit": "套",
    "isSaleAlone": 1,
    "detailId": 5
  }, {
    "id": 23,
    "title": "多业务接入终端",
    "categoryId": 4,
    "serialNumber": "SPD201207000001",
    "state": "ACTIVE",
    "coverId": "c5632d50-385c-11eb-b2ee-e3844a1a9874",
    "coverName": "4G4S.png",
    "model": "SU6100",
    "overview": "POL综合业务网关，集路由、交换、无线、语音等应用于一体。GPON上行，4个下行GE接口，4个FXS口。外置双天线，支持802.11b/g/n/ac，2╳2 MIMO。",
    "price": 74100,
    "specifications": "",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 11
  }, {
    "id": 24,
    "title": "星网锐捷统一通信SVC9000",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203004",
    "state": "ACTIVE",
    "coverId": "cd89b690-3512-11eb-975d-7137fad12878",
    "coverName": "8f79b70133564009b35d42e303f0d0ac.png",
    "model": "SVC9000",
    "overview": "星网锐捷统一通信SVC9000系列（以下简称9000）统一网关是星网锐捷统一通信解决方案中的大容量音视频交换设备。面向6000用户以内的大规模政企用户，提供专业的统一通信解决方案。",
    "price": 12312,
    "specifications": "星网锐捷统一通信SVC9000-规格规格",
    "sort": 6,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 4
  }, {
    "id": 25,
    "title": "套件1",
    "categoryId": 1,
    "serialNumber": "CHANPIN201203001",
    "state": "ACTIVE",
    "coverId": "de13c460-3508-11eb-9388-cd7dadc21c29",
    "coverName": "timg.jpeg",
    "model": "11111111",
    "overview": "驱蚊器的",
    "price": 300,
    "specifications": "1212",
    "sort": 5,
    "unit": "件",
    "isSaleAlone": 1,
    "detailId": 1
  }, {
    "id": 263,
    "title": "H810E智能网关",
    "categoryId": 4,
    "serialNumber": "CHANPIN201203003",
    "state": "ACTIVE",
    "coverId": "403d3a50-3512-11eb-a6b4-755fb574ae9d",
    "coverName": "3024fdc45dcd4917920d055d21f6a450.jpg",
    "model": "H810E",
    "overview": "H810E智能网关是一款基于光纤到户（FTTH）的智能终端设备",
    "price": 2356,
    "specifications": "H810E智能网关-规格",
    "sort": 2,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 3
  }, {
    "id": 27,
    "title": "星网锐捷统一通信SVP3300多媒体终端",
    "categoryId": 3,
    "serialNumber": "CHANPIN201203002",
    "state": "ACTIVE",
    "coverId": "f22f5830-3510-11eb-aca3-45ebd6e5a603",
    "coverName": "561435f4568745929080e35213bd6b22.png",
    "model": "SVP3300",
    "overview": "SVP3300是一款多媒体音视频通信终端，配备高分辨率7英寸彩色LCD触摸显示屏，内置可上下旋转的200万像素CMOS摄像头",
    "price": 10001,
    "specifications": "星网锐捷统一通信SVP3300多媒体终端-规格规格",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 2
  }, {
    "id": 28,
    "title": "套件2",
    "categoryId": 2,
    "serialNumber": "CHANPIN201203005",
    "state": "ACTIVE",
    "coverId": "a75b95a0-3513-11eb-975d-7137fad12878",
    "coverName": "27a4b7f243704c14aaa2d3ca104175b9.png",
    "model": "SU8300",
    "overview": "星网锐捷 SU8300 融合通信服务器（以下简称8300）是星网锐捷统一通信解决方案的大中容量核心语音网关，配套星网锐捷IP终端及统一通信应用，面向1200用户以内的中小规模政企用户，提供专业的统一通信解决方案。\n\n",
    "price": 342311,
    "specifications": "规格",
    "sort": 1,
    "unit": "套",
    "isSaleAlone": 1,
    "detailId": 5
  }, {
    "id": 29,
    "title": "多业务接入终端",
    "categoryId": 4,
    "serialNumber": "SPD201207000001",
    "state": "ACTIVE",
    "coverId": "c5632d50-385c-11eb-b2ee-e3844a1a9874",
    "coverName": "4G4S.png",
    "model": "SU6100",
    "overview": "POL综合业务网关，集路由、交换、无线、语音等应用于一体。GPON上行，4个下行GE接口，4个FXS口。外置双天线，支持802.11b/g/n/ac，2╳2 MIMO。",
    "price": 74100,
    "specifications": "",
    "sort": 1,
    "unit": "台",
    "isSaleAlone": 1,
    "detailId": 11
  }
]

const tableMenuSchema = (record) => [
  {
    id: 'edit',
    text: "编辑",
    key: "edit",
    onClick: () => {
      console.log("edit =", record);
    }
  },
  {
    id: 'active',
    text: "上架",
    key: "active",
    state: "INACTIVE"
  },
  {
    text: "下架",
    key: "inactive",
    state: "ACTIVE",
  },
  {
    text: "删除",
    key: "delete"
  },
];

const layout = {
  labelCol: {
    sm: { span: 20, offset: 0 },
    xs: { span: 24, offset: 0 },
  },
};



const getSearchSchema = (beforeUpload) => [
  {
    form: { formLabel: "主机名", name: "Hostname" },
    content: { type: "text" },
  },
  {
    form: { formLabel: "Mac地址", name: "Mac" },
    content: { type: "text" },
  },
  {
    form: { formLabel: "硬件版本", name: "Hard" },
    content: { type: "text" },
  },
  {
    form: { formLabel: "固件版本", name: "Soft" },
    content: { type: "checkboxGroup",options :[
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ] },
  },
  // {
  //   form: { formLabel: "固件版本", name: "Soft" },
  //   content: { type: "radioGroup",options :[
  //       { label: 'Apple', value: 'Apple' },
  //       { label: 'Pear', value: 'Pear' },
  //       { label: 'Orange', value: 'Orange' },
  //     ] },
  // },
  {
    form: { formLabel: "类型", name: "Olttypeval" },
    content: {
      type: "select",
      selectSchema: [
        {
          title: "ALL",
          value: 0
        },
        {
          title: "EPON",
          value: 1
        },
        {
          title: "GPON",
          value: 2
        }
      ],
      className: "v",
      showArrow: true
    },
  },
  {
    form: { formLabel: "状态", name: "Oltstatueval" },
    content: {
      type: "select",
      selectSchema: [
        {
          title: "ALL",
          value: 0
        },
        {
          title: "online",
          value: 1
        },
        {
          title: "offline",
          value: 2
        }
      ],
      className: "v",
      showArrow: true
    },
  },
  {
    form: { formLabel: "硬件版本", name: "Hard" },
    content: { type: "text" },
  },
  {
    form: { formLabel: "硬件版本", name: "Hard" },
    content: { type: "text" },
  },
  {
    form: {
      formLabel: "升级软件",
      name: "userName",

    },
    content: { type: "text", content: "(密码中必须包含字母、数字、特殊字符)", visible: true }   //content 悬浮窗的内容 visible 控制是否显示悬浮窗
  },
];

function CustomTableOne(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const [condition, setCondition] = useState({ page: 1, size: 4 });
  //文件上传之前的操作,禁止文件提交
  const beforeUpload = (file) => {
    return false;
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log("pagination =", pagination)
    setCondition({ page: pagination.current, size: pagination.pageSize });
  };

  const add = () => {
    console.log("添加");
    setModalVisible(true);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => {

      // console.log('get checkbox props');
      // console.log(`record`, record);
    },
    renderCell: (checked, record, index, originNode) => {
      // console.log(`checked`, checked);
      // console.log(`originNode`, originNode);
      return originNode;
    }
  };

  const operationSchema = [
    {
      id: "wizard-product-add", //作id标识
      name: "新增",   //名称
      clickFunc: add,   //操作的方法函数
      type: "default",   //按钮类型
    }
  ];

  const renderOperation = (value, record, index) => {
    return (
      <Menus
        title={"操作"}
        schema={tableMenuSchema(record)}
      />
    );
  };

  const searchSubmit = (values) => {
    console.log("searchSubmit =", values);
  };

  const layout = {
    labelCol: {
      sm: { span: 7, offset: 0 },
      xs: { span: 24, offset: 0 },
    },
    wrapperCol: {
      sm: { span: 15, offset: 0 },
      xs: { span: 24, offset: 0 },
    }
  };

  let disable = false;

  useEffect(() => {
    console.log('condition change')
    setList(productList1);
  }, [condition]);
  return (
    <>
      <SearchBox
        searchSchema={getSearchSchema(beforeUpload)}    //搜索条件配置项
        searchSubmit={searchSubmit}       //搜索条件的回调函数
        layout={layout}
      ></SearchBox>
      <CustomTable
        rowKey="id"      //同antd
        dataSource={productList1}      //同antd
        columns={cols}   //同antd
        visibleEditCol={true}   //是否开启列编辑功能，默认开启
        visibleOperation={true}    //是否显示操作按钮，默认显示（如：新增）
        tableKey="test"
        rowSelection={{         // 同antd
          type: 'checkbox',
          ...rowSelection,
        }}
        // showIndex={false}   // 是否显示序号列表
        pagination={{       // 同antd
          ...{
          current: condition.page,
          pageSize: condition.size,
          total: list.length,
          showTotal: false, // 不显示数据总数相关信息
          },
          ...{
          showSizeChanger: true
          },
        }}
        // pagination={false}
        onChange={onTableChange}   //同antd
        operationSchema={operationSchema}    //操作按钮配置项
      />
      <Modal
        maskClosable={false}
        destroyOnClose={true}
        title="j"
        visible={modalVisible}
        // onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        width={720}
        footer={[
          <Button key="back" >
            取消
          </Button>,
          <Button
            key="submit"
            id='ok-btn'
            type="primary"
          >
            确定
          </Button>,
        ]}
      >
        <Form name='profile' >
          <CommonFormItem
            schema={[
              {
                form: {
                  formLabel: "Profile ID",
                  name: "ProfileID",
                  rules: [{
                    required: true
                  }],
                  tooltip: 'tooltip' // 使用antd中的tooltip功能
                },
                content: { type: "text", disabled: disable },
              },
              {
                form: {
                  formLabel: "Profile Name",
                  name: "ProfileName",

                },
                content: { type: "text", disabled: disable },
              },
              {
                form: {
                  formLabel: "Description",
                  name: "Description",
                },
                content: { type: "text", disabled: disable },
              },
              {
                form: {
                  formLabel: "Max tcont",
                  name: "Maxtcont",

                },
                content: { type: "text", disabled: disable, content: "(1~255)", visible: true, },
              },
              {
                form: {
                  formLabel: "Max gemport",
                  name: "Maxgemport",

                },
                content: { type: "text", disabled: disable, content: "(1~255)", visible: true },
              },
              {
                form: {
                  formLabel: "Max eth",
                  name: "Maxeth",

                },
                content: { type: "text", disabled: disable, content: "(0~255)", visible: true },
              },
              {
                form: {
                  formLabel: "Max pots",
                  name: "Maxpots",

                },
                content: { type: "text", disabled: disable, content: "(0~255)", visible: true },
              },
              {
                form: {
                  formLabel: "Max Iphost",
                  name: "MaxIphost",

                },
                content: { type: "text", disabled: disable, content: "(0~255)", visible: true },
              },
              {
                form: {
                  formLabel: "Max Ipv6host",
                  name: "MaxIpv6hos",

                },
                content: { type: "text", disabled: disable, content: "(0~255)", visible: true },
              },
              {
                form: {
                  formLabel: "Max veip",
                  name: "Maxveip",
                },
                content: { type: "text", disabled: disable, content: "(0~127)", visible: true },
              },
              {
                form: {
                  formLabel: "Service ability",
                  name: "Serviceability",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Service ability N:1",
                  name: "ServiceabilityN1",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Service ability 1:M",
                  name: "Serviceability1M",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Service ability  1:P",
                  name: "Serviceability1P",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Wifi mgmt via non OMCI",
                  name: "omci",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Omci send mode",
                  name: "sendmode",
                },
                content: {
                  type: "select",
                },
              },
              {
                form: {
                  formLabel: "Default multicast range",
                  name: "multicast",
                },
                content: {
                  type: "checkboxGroup",
                  className: "v",
                  options: [{ label: "GE1", value: 1 }, { label: "GE2", value: 2 }, { label: "GE2", value: 2 }, { label: "GE2", value: 2 }]
                },
              }
            ]}
          ></CommonFormItem>
        </Form>
      </Modal>
    </>
  )
}


export default CustomTableOne;