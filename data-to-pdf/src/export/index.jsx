import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Form, Typography, Table, Input, Button, Descriptions, Checkbox, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { priceFormatter, moneyToChinese } from 'src/util/util';
import './report.scss';
import { Spin } from 'antd';

const { DescriptionItem } = Descriptions;
const { Text, Title, Paragraph } = Typography;
// 第一项单位 mm， 第二项单位 pt 第三项 px
// pt = px * 3/4 
const papers = { 'a4': [{ w: 210, h: 316 }, { w: 595, h: 842 }, { w: 794, h: 1122 }], 'b5': [{ w: 185, h: 260 }, { w: 495, h: 694 }] };
/**
 *
 * 导出预览页面
 * @export
 * @param {object} props
 * @param {object} props.agentDetail 代理商信息
 * @returns
 */
export function ExportPriview(props) {



  const { agentDetail } = props;
  const [addLogo, setAddLogo] = useState(false);
  const [waterMarker, setWaterMarker] = useState('');
  const [quotation, setQuotation] = useState(null);
  const [pageData, setPageData] = useState([]);
  const [init, setInit] = useState(false);
  const [autoPage, setAutoPage] = useState(false);
  const [computing, setComputing] = useState(false);
  const previewRef = useRef();
  const cardRef = useRef();
  const headerRef = useRef();
  const footerRef = useRef();
  const contactBoxRef = useRef();
  const tableRef = useRef();
  const totalRef = useRef();

  useEffect(() => {
    getQuotationDetail();
    getAgentDetail();
  }, []);
  useEffect(() => {
    if (!init && quotation) {
      initPageData();
    }

  }, [quotation]);

  useEffect(() => {
    if (init && !autoPage) {
      autoPageContent();
    }
  }, [pageData]);

  function getQuotationDetail() {
    const mockQuotation = {
      amount: 30,
      serialNumber: "SPC20201209000065",
      title: "江苏省-苏州市-20201209-062",
      cid: -1,
      cityId: 320500,
      cityName: "苏州市",
      createTime: "2020-12-09 18:14:09",
      customer: "1",
      customerAddress: "1",
      customerContact: "1",
      customerContactPhone: "1",
      supplier: "施凤娇代理的公司",
      supplierAddress: "福建福州仓山区",
      supplierContact: "王五",
      supplierContactPhone: "12345678901",
      deliverTime: 10,
      expiresTime: 30,
      id: 107,
      oriPrice: 189447052,
      price: 189447052,
      products: [{
        amount: 1,
        id: 325,
        oriPrice: 7777700,
        price: 7777700,
        productId: 29,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "测试产品7",
        unit: "23",
      }, {
        amount: 1,
        id: 326,
        oriPrice: 9999900,
        price: 9999900,
        productId: 31,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "测试产品-9",
        unit: "9999",
      }, {
        amount: 1,
        id: 327,
        oriPrice: 121200,
        price: 121200,
        productId: 13,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "VT40",
        unit: "DAN",
      }, {
        amount: 1,
        id: 328,
        oriPrice: 11100,
        price: 11100,
        productId: 28,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "测试产品-6",
        unit: "111",
      }, {
        amount: 1,
        id: 329,
        oriPrice: 12312,
        price: 12312,
        productId: 4,
        quotationId: 107,
        remark: "",
        specifications: "星网锐捷统一通信SVC9000-规格规格",
        title: "星网锐捷统一通信SVC9000",
        unit: "台",
      }, {
        amount: 1,
        id: 330,
        oriPrice: 300,
        price: 300,
        productId: 1,
        quotationId: 107,
        remark: "",
        specifications: "1212",
        title: "套件1",
        unit: "件",
      }, {
        amount: 1,
        id: 331,
        oriPrice: 2356,
        price: 2356,
        productId: 3,
        quotationId: 107,
        remark: "",
        specifications: "H810E智能网关-规格",
        title: "H810E智能网关",
        unit: "台",
      }, {
        amount: 1,
        id: 332,
        oriPrice: 10001,
        price: 10001,
        productId: 2,
        quotationId: 107,
        remark: "",
        specifications: "星网锐捷统一通信SVP3300多媒体终端-规格规格",
        title: "星网锐捷统一通信SVP3300多媒体终端",
        unit: "台",
      }, {
        amount: 1,
        id: 333,
        oriPrice: 342311,
        price: 342311,
        productId: 5,
        quotationId: 107,
        remark: "",
        specifications: "规格",
        title: "套件2",
        unit: "套",
      }, {
        amount: 1,
        id: 334,
        oriPrice: 74100,
        price: 74100,
        productId: 9,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "多业务接入终端",
        unit: "台",
      }, {
        amount: 1,
        id: 335,
        oriPrice: 10000000,
        price: 10000000,
        productId: 10,
        quotationId: 107,
        remark: "",
        specifications: "vvbbgf",
        title: "wpq_产品名称",
        unit: "考虑你不就恢复的",
      }, {
        amount: 1,
        id: 336,
        oriPrice: 11454100,
        price: 11454100,
        productId: 11,
        quotationId: 107,
        remark: "",
        specifications: "产品规格加载中......",
        title: "产品名称加载中......",
        unit: "产品单位加载中......",
      }, {
        amount: 1,
        id: 337,
        oriPrice: 1200,
        price: 1200,
        productId: 14,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "C21",
        unit: "2",
      }, {
        amount: 1,
        id: 338,
        oriPrice: 100,
        price: 100,
        productId: 15,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "前端箱",
        unit: "1",
      }, {
        amount: 1,
        id: 339,
        oriPrice: 1234560,
        price: 1234560,
        productId: 17,
        quotationId: 107,
        remark: "",
        specifications: "1",
        title: "融合视讯（UCC）样机B套包",
        unit: "件",
      }, {
        amount: 1,
        id: 340,
        oriPrice: 1234500,
        price: 1234500,
        productId: 18,
        quotationId: 107,
        remark: "",
        specifications: "",
        title: "测试产品-2",
        unit: "件",
      }, {
        amount: 1,
        id: 341,
        oriPrice: 100,
        price: 100,
        productId: 6,
        quotationId: 107,
        remark: "",
        specifications: "12",
        title: "121",
        unit: "12",
      }, {
        amount: 1,
        id: 342,
        oriPrice: 1200,
        price: 1200,
        productId: 7,
        quotationId: 107,
        remark: "",
        specifications: "11",
        title: "1-下架了",
        unit: "111",
      }, {
        amount: 1,
        id: 343,
        oriPrice: 120012,
        price: 120012,
        productId: 8,
        quotationId: 107,
        remark: "",
        specifications: "1x100,1399X1399",
        title: "同步课题",
        unit: "套",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 388,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 399,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 381,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 389,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }, {
        amount: 1,
        id: 344,
        oriPrice: 12200,
        price: 12200,
        productId: 12,
        quotationId: 107,
        remark: "",
        specifications: "1221",
        title: "cccc",
        unit: "x",
      }]
    };

    mockQuotation.products = transformProductList(mockQuotation.products);
    setQuotation(mockQuotation);
  }
  function getAgentDetail() {
    const mockAgentDetail = {
      businessDuty: "商务负责人",
      businessEmail: "1234567890@qq.com",
      businessHead: "王五",
      businessPhone: "12345678901",
      companyAddress: "福建福州仓山区",
      companyBusiness: "什么都做",
      companyCities: 320500,
      companyCounty: 320508,
      companyLegal: "施凤娇",
      companyLogo: [{ name: "Screenshot from 2020-11-06 13-53-12.png", fileId: "5e596d80-3510-11eb-880c-7db890a63091" }],
      companyName: "施凤娇代理的公司",
      companyPeople: "500",
      companyProvinces: 320000,
      companySetup: "2011-05-26",
      creditEmail: "1234567890@qq.com",
      creditIdcard: "1234567890",
      creditLegal: "张三啊",
      creditPhone: "12345678901",
      creditSex: "male",
      id: 17,
      isAssigned: true,
      otherDuty: null,
      otherEmail: null,
      otherHead: null,
      otherPhone: null,
      professionalDuty: "业务负责人",
      professionalEmail: "1234567890@qq.com",
      professionalHead: "李四啊",
      professionalPhone: "12345678901",
      qualificationFiles: [{ name: "Screenshot from 2020-11-06 13-53-12.png", fileId: "6796ff70-3510-11eb-975d-7137fad12878" }],
      registerCapital: "好多钱",
      registerCode: "12312312213",
      registerTime: "2020-12-01",
      saleName: "A销售",
    };
    return mockAgentDetail;
  }
  function handleChangeWaterMarker(e) {
    setWaterMarker(e.target.value);
  }
  function setMessage() {

  }
  function handleToggleShowLogo(e) {
    const logoFileId = getCompanyLogoFileId(agentDetail);
    const checked = e.target.checked;
    if (checked && !logoFileId) {
      setMessage({ type: 'error', msg: '请上传图标' });
      setAddLogo(false);
      return false;
    } else {
      setAddLogo(e);
    }
  }
  // 添加水印
  function addTextWaterMarker(canvas, str) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const fontSize = 12;
    const alpha = -15;
    ctx.save();
    ctx.rotate(alpha * Math.PI / 180);
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = 'rgba(160,160,160,.12)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'Middle';
    // console.log('ctx.measureText(str)', ctx.measureText(str));
    const strWidth = ctx.measureText(str).width;
    const addY = Math.tan(Math.abs(alpha) * Math.PI / 180) * width;
    const subX = Math.tan(alpha * Math.PI / 180) * height;
    // console.log('addY', addY);
    for (let i = subX; i < width; i += strWidth) {
      for (let j = 0; j < height + addY; j += (fontSize + fontSize / 2)) {
        ctx.fillText(str, i, j);
      }
    }
    ctx.restore();
  }
  function getReportFilename() {
    const defaultName = 'report.pdf';
    if (!quotation) {
      return defaultName;
    }
    return (quotation.serialNumber || quotation.title) + '.pdf';
  }
  // 导出pdf
  async function exportPDF() {
    const pageDOMs = document.getElementsByClassName('report-box');
    const dataUrls = [];
    setComputing(true);
    try {
      for (let i = 0; i < pageDOMs.length; i++) {
        const page = pageDOMs[i];
        // console.time(`gen ${i} canvas`);
        const dataUrl = await dom2DataUrl(page);
        // console.timeEnd(`gen ${i} canvas`);
        dataUrls.push(dataUrl);
      }
      transformDataUrlsToPDF(dataUrls);
    } catch (error) {
      console.error(error);
    }
    setComputing(false);
  }

  // 将HTML元素转为图像URL
  function dom2DataUrl(dom) {
    const scale = 2;
    return html2canvas(dom, {
      allowTaint: true,
      tainTest: true,
      scale,
      backgroundColor: '#fff',
    }).then(canvas => {
      const mime = 'image/jpeg';
      waterMarker && addTextWaterMarker(canvas, waterMarker);
      const dataURL = canvas.toDataURL(mime, 1);
      return Promise.resolve(dataURL);
    }).catch(err => {
      return Promise.reject(err);
    });
  }
  // 将canvas图像转换成pdf
  function transformDataUrlsToPDF(dataUrls) {
    const doc = new jsPDF('p', 'pt', 'a4');
    const imgWidth = 595.28;
    const imgHeight = 841.89;
    for (let i = 0; i < dataUrls.length; i++) {
      // console.time(`draw page ${i}`);
      const dataUrl = dataUrls[i];
      if (i > 0) {
        doc.addPage();
      }
      doc.addImage(dataUrl, 'WEBP', 0, 0, imgWidth, imgHeight);
      // console.timeEnd(`draw page ${i}`);
    }
    doc.save(getReportFilename());
    // console.log('save end');
  }
  /**
   *
   * 获取代理商公司图标
   * @param {object} agentDetail 代理商信息
   * @returns {string} 有上传图标返回fileId,没有图标返回空字符串
   */
  function getCompanyLogoFileId(agentDetail) {
    if (!agentDetail || !agentDetail.companyLogo) {
      return '';
    }
    const logos = agentDetail.companyLogo;
    if (!Array.isArray(logos)) {
      return '';
    }
    if (logos.length === 0) {
      return '';
    }
    return logos[0]?.fileId;
  }
  // 产品清单添加序号
  function transformProductList(list) {
    return list.map((item, idx) => ({ ...item, sequence: idx + 1 }));
  }
  const ReportBox = (props) => {
    return (
      <div
        style={{ width: papers['a4'][2].w + 'px' }}
        className='report-box'
        ref={cardRef}
      >
        {props.children}
      </div>
    );
  };
  const ReportHeader = () => {
    return (
      <div className='report-header' ref={headerRef} >
        <Row >
          <Col span={12}>
            <Title level={1} className='report__title'>产品报价单</Title>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}  >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ color: 'white', width: 120, textAlign: 'right' }} >报价单编号：</div>
              <div style={{ color: 'white', width: 150, textAlign: 'left' }} >{quotation.serialNumber || '(未生成)'}</div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ color: 'white', width: 120, textAlign: 'right' }} >报价日期：</div>
              <div style={{ color: 'white', width: 150, textAlign: 'left' }} >{quotation.createTime}</div>
              {/* <div style={{ color: 'white' , width: 150, textAlign: 'left'}} >{moment(quotation.createTime).format('YYYY-MM-DD')}</div> */}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ color: 'white', width: 120, textAlign: 'right' }} >报价单有效期：</div>
              <div style={{ color: 'white', width: 150, textAlign: 'left' }} >{quotation.expiresTime}天</div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ color: 'white', width: 120, textAlign: 'right' }} >预计发货用时：</div>
              <div style={{ color: 'white', width: 150, textAlign: 'left' }} >{quotation.deliverTime}天</div>
            </div>
          </Col>
        </Row>
      </div>);
  };
  const ReportFooter = (props) => {
    return (
      <div className='report-footer' ref={footerRef}>
        <Row >
          <Col span={12}>
            <Text style={{ color: '#fff' }}>我们衷心感谢您的询价，并期待与您合作成功</Text>
            <Title level={1} style={{ color: 'white', fontSize: '20px' }} >{props.agentDetail ? props.agentDetail.companyName || '(正在获取...)' : '(...)'}</Title><br />
          </Col>
          <Col span={12}>
            {
              props.addLogo &&
              <Image
                width={96}
                height={96}
                id={getCompanyLogoFileId(agentDetail)}
              />
            }
          </Col>
        </Row>
      </div>
    );
  };
  const ReportBody = (props) => {
    return (
      <div className='report-body'>
        {
          props.children
        }
      </div>
    );
  };
  const ContactBox = () => {
    return (
      <div ref={contactBoxRef}>
        <Descriptions bordered size='small'>
          <DescriptionItem label='客户单位' span={2}>{quotation.customer}</DescriptionItem>
          <DescriptionItem label='报价单位' span={2}>{quotation.supplier}</DescriptionItem>
          <DescriptionItem label='地址' span={2}>{quotation.customerAddress}</DescriptionItem>
          <DescriptionItem label='地址' span={2}>{quotation.supplierAddress}</DescriptionItem>
          <DescriptionItem label='联系人' span={2}>{quotation.customerContact}</DescriptionItem>
          <DescriptionItem label='联系人' span={2}>{quotation.supplierContact}</DescriptionItem>
          <DescriptionItem label='联系方式' span={2}>{quotation.customerContactPhone}</DescriptionItem>
          <DescriptionItem label='联系方式' span={2}>{quotation.supplierContactPhone}</DescriptionItem>
        </Descriptions>
      </div>
    );
  };
  const ProductTable = ({ list, showTotal }) => {
    const columns = [{
      title: '序号',
      dataIndex: 'sequence',
    }, {
      title: '产品名称',
      dataIndex: 'title',
    }, {
      title: '规格型号',
      dataIndex: 'specifications',
    }, {
      title: '数量',
      dataIndex: 'amount',
      align: 'center',
    }, {
      title: '单位',
      dataIndex: 'unit',
    }, {
      title: '单价（元）',
      dataIndex: 'price',
      width: 120,
      align: 'right',
      render: t => {
        return priceFormatter(t / 100);
      }
    }, {
      title: '总价（元）',
      width: 160,
      align: 'right',
      render: (t, record) => {
        return priceFormatter(record.amount * record.price / 100);
      }
    }, {
      title: '备注',
      dataIndex: 'remark',
    }];

    return (
      <>
        {
          (list && list.length !== 0) &&
          <div ref={tableRef}>
            <Table
              size='small'
              bordered={true}
              title={(pageData) => { return '贵公司预购设备，现报价如下：'; }}
              pagination={false}
              columns={columns}
              dataSource={list}
            />
          </div>
        }

        {
          showTotal &&
          <div ref={totalRef}>
            <Descriptions bordered size='small'>
              <DescriptionItem label='总计' span={3}>
                <span className='report-summary__item'>
                  {quotation.amount}件
                </span>
                <span className='report-summary__item'>
                  {priceFormatter(quotation.price / 100)}元
                </span>
                <span >
                  {moneyToChinese(quotation.price / 100)}
                </span>
              </DescriptionItem>

              <DescriptionItem label='备注' span={4}>
                <Paragraph>
                  {quotation.remark}
                </Paragraph>
              </DescriptionItem>
            </Descriptions>
          </div>
        }
      </>
    );
  };
  // 初始化 报价单页面数据
  function initPageData() {
    const pageDataTemp = [];
    const firstPage = () => (
      <ReportBox>
        <ReportHeader />
        <ReportBody >
          <ContactBox />
          <ProductTable showTotal={true} list={quotation.products} />
        </ReportBody>
        <ReportFooter />
      </ReportBox>
    );

    pageDataTemp.push({ content: firstPage });
    setPageData(pageDataTemp);
    setInit(true);
  }


  // 自动调整分页
  function autoPageContent() {
    console.log('auto page content');
    console.log('tableRef.current', tableRef.current);
    const headerHeight = headerRef.current.clientHeight;
    const footerHeight = footerRef.current.clientHeight;
    const maxPageHeight = 1122;
    const tableRowHeight = 60;
    const tableTitleHeight = 40;
    const contentPadding = 32; // 上下间距之和
    const maxContentHeight = maxPageHeight - headerHeight - footerHeight;
    const currentContentDOM = cardRef.current;
    const currentContetnHeight = currentContentDOM.clientHeight - headerHeight - footerHeight;
    // console.log('maxPageHeight', maxPageHeight);
    // console.log('headerHeight', headerHeight);
    // console.log('maxContentHeight', maxContentHeight);
    // console.log('footerHeight', footerHeight);
    const pageCount = Math.ceil(currentContetnHeight / maxContentHeight); // 分隔的页数
    const pages = [];
    const contactBoxHeight = contactBoxRef.current.clientHeight;

    const maxPerPageRow = Math.floor(maxContentHeight / tableRowHeight);
    const tableTotalLength = quotation.products.length;
    const totalBoxHeight = totalRef.current.clientHeight;
    let tableRowIndex = 0;
    // console.log('pageCount', pageCount);
    // console.log('contactBoxHeight', contactBoxHeight);
    // 能否显示总结内容
    let globalShowTotal = false;
    for (let i = 0; i < pageCount; i++) {
      // 当前页面剩余高度
      let leftHeight = maxContentHeight - contentPadding,
        // 当前页面产品清单数据
        list = [],
        // 当前页面组件、数据
        pageItem = {},
        showTotal = false;
      // 第一页
      if (i === 0) {
        leftHeight = maxContentHeight - contactBoxHeight - tableTitleHeight;
        const currentPageMaxRow = Math.floor(leftHeight / tableRowHeight);
        if (currentPageMaxRow < tableTotalLength) {
          list = quotation.products.slice(tableRowIndex, tableRowIndex + currentPageMaxRow + 1);
          leftHeight = leftHeight - (currentPageMaxRow + 1) * tableRowHeight; // 需要考虑表头
          tableRowIndex = tableRowIndex + currentPageMaxRow + 1;
        } else {
          list = quotation.products.slice(tableRowIndex, tableTotalLength);
          leftHeight = leftHeight - (tableTotalLength + 1) * tableRowHeight; // 需要考虑表头
          tableRowIndex = tableTotalLength;
        }
        if (tableTotalLength === tableRowIndex && totalBoxHeight < leftHeight) {
          showTotal = true;
        }
        pageItem.content = (props) => (
          <ReportBox>
            <ReportHeader />
            <ReportBody >
              <ContactBox />
              <ProductTable showTotal={showTotal} list={list} />
            </ReportBody>
            <ReportFooter addLogo={props.addLogo} agentDetail={props.agentDetail} />
          </ReportBox>
        );

      }

      // 后续页面
      if (i > 0) {
        // 上一页已经显示了全部数据
        if (globalShowTotal) {
          continue;
        }
        // 表格在之前页面已全部显示
        if (tableRowIndex === tableTotalLength) {
          list = [];
        }
        // 页面剩余内容足够显示剩余表格、总结部分
        if (leftHeight > ((tableTotalLength - tableRowIndex) * tableRowHeight) + totalBoxHeight) {
          showTotal = true;
          list = quotation.products.slice(tableRowIndex);
          tableRowIndex = tableTotalLength;
        }
        // 总结部分 被分割
        if ((leftHeight > (tableTotalLength - tableRowIndex) * tableRowHeight) && leftHeight < (((tableTotalLength - tableRowIndex) * tableRowHeight) + totalBoxHeight)) {
          showTotal = false;
          list = quotation.products.slice(tableRowIndex);
          tableRowIndex = tableTotalLength;
        }
        // 页面剩余内容不够显示剩余表格
        if (leftHeight < (tableTotalLength - tableRowIndex) * tableRowHeight) {
          showTotal = false;
          list = quotation.products.slice(tableRowIndex, tableRowIndex + maxPerPageRow + 1);
          tableRowIndex = maxPerPageRow + tableRowIndex + 1;
        }

        pageItem.content = (props) => (
          <ReportBox>
            <ReportHeader />
            <ReportBody >
              <ProductTable showTotal={showTotal} list={list} />
            </ReportBody>
            <ReportFooter addLogo={props.addLogo} agentDetail={props.agentDetail} />
          </ReportBox>
        );
      }
      globalShowTotal = showTotal;
      pages.push(pageItem);
    }
    setAutoPage(true);
    setPageData(pages);
  }
  return (
    <div className='report-page'>
      <Spin spinning={computing} tip='正在导出文件,请等待...' indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        <Row gutter={[16, 16]}>
          {/* 操作栏 */}
          <Col span={24}>
            <Form layout='inline'>
              <Form.Item>
                <Checkbox onChange={handleToggleShowLogo} value={addLogo} /> 添加logo
              </Form.Item>
              <Form.Item label='水印'>
                <Input allowClear value={waterMarker} onChange={handleChangeWaterMarker} />
              </Form.Item>
              <Form.Item label='纸张尺寸'>
                默认为A4纸大小
              </Form.Item>

              <Form.Item >
                <Button type='primary' onClick={exportPDF}>导出PDF</Button>
              </Form.Item>
            </Form>
          </Col>

          {/* 预览 */}
          <Col span={24}>
            <div className='preview-box' ref={previewRef}>
              {
                pageData && pageData.map(item => <item.content addLogo={addLogo} agentDetail={agentDetail} />)
              }
            </div>
          </Col>
        </Row>
      </Spin>

    </div>
  );
}


export default ExportPriview;
