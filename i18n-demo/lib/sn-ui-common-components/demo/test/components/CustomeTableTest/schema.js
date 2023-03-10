export const cols = [{
  title: "价格 (元)",
  dataIndex: "price",
  key: "price",
  width: "10%",
  visible: true,
  render: (value, record, index) => {
    return value / 100;
  },
},
{
  title: "状态",
  dataIndex: "state",
  key: "state",
  width: "10%",
  visible: true
},
// {
//   title: "概述",
//   dataIndex: "overview",
//   key: "overview",
//   width: "10%",
// },
{
  title: "规格",
  dataIndex: "specifications",
  key: "specifications",
  width: "30%",
  visible: true,
},
{
  title: "单位",
  dataIndex: "unit",
  key: "unit",
  width: "30%",
  visible: true,
},
{
  title: "操作",
  dataIndex: "",
  key: "operation",
  width: "20%",
  visible: true,
  // render: renderOperation,
},
]