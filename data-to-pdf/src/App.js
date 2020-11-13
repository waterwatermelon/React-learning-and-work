import { useState, useRef } from 'react';
import { Button, Card, Row, Col, Descriptions, Input, Select, Typography, Table, Image, Form } from 'antd';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './App.css';
import './report.css';




const { Item: DescriptionItem } = Descriptions;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const papers = { 'a4': [{ w: 210, h: 316 }, { w: 595.28, h: 841.89 }],'b5':[{ w: 185, h: 260 }, { w: 492.02, h: 691.49 }] }

function App() {
  const tableRef = useRef();
  const [card, setCard] = useState(null);
  const [paper, setPaper] = useState('a4');
  const [waterMarker, setWaterMarker] = useState('');
  const columns = [{
    title: '序号',
  }, {
    title: '产品名称',
    dataIndex: '',
  }, {
    title: '规格型号',
    dataIndex: '',
  }, {
    title: '数量',
    dataIndex: '',
  }, {
    title: '单位',
    dataIndex: '',
  }, {
    title: '单价（元）',
    dataIndex: '',
  }, {
    title: '总价（元）',
    dataIndex: '',
  }, {
    title: '备注',
    dataIndex: '',
  }];

  function getCardRef(c) {
    setCard(c);
  }
  function handleChangeWaterMarker(e) {
    console.log('e', e);
    setWaterMarker(e.target.value);
  }
  function handlePaperChange(value) {
    setPaper(value);
  }
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
    console.log('ctx.measureText(str)', ctx.measureText(str));
    const strWidth = ctx.measureText(str).width;
    const addY = Math.tan(Math.abs(alpha) * Math.PI / 180) * width;
    const subX = Math.tan(alpha * Math.PI / 180) * height;
    console.log('addY', addY);
    for (let i = subX; i < width; i += strWidth) {
      for (let j = 0; j < height + addY; j += (fontSize + fontSize / 2)) {
        ctx.fillText(str, i, j);
      }
    }
    ctx.restore();
  }
  function exportPDF() {
    console.log('tableRef', tableRef);
    // 页面间隙？
    // const padding = 
    const scale = 2;
    html2canvas(card, {
      allowTaint: true,
      tainTest: true,
      scale,
      backgroundColor: '#08f'
    }).then(canvas => {
      const context = canvas.getContext('2d');
      // 【重要】关闭抗锯齿
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      const mime = 'image/jpeg';
      waterMarker && addTextWaterMarker(canvas, waterMarker);
      const dataURL = canvas.toDataURL(mime, 1);
      const doc = new jsPDF('p', 'pt', 'a4');
      const imgWidth = 595.28;
      const imgHeight = 595.28 / canvas.width * canvas.height;
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      console.log('contentWidth', contentWidth);
      console.log('contentHeight', contentHeight);
      let position = 0;
      const pageHeight = contentWidth / 595.28 * 841.89;
      let leftHeight = contentHeight;
      // 只有一页
      // if (leftHeight < pageHeight) {
      //   doc.addImage(dataURL, 'JPEG', 0, 0, imgWidth, imgHeight);
      // }else {
      while (leftHeight > 0) {
        doc.addImage(dataURL, 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          doc.addPage();
        }
      }
      // }

      doc.save('output.pdf');
    })
      .catch(err => {
        console.log('err', err);
        console.error('截屏失败');
      })
  }

  function exportPDFAddHTML() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addHTML(card, 0, 0, {
      pagesplit: true,
      background: '#fff',
    })
      .then(() => {
        doc.save('addHtml.pdf');
      })
      .catch(err => {
        console.log('err', err);
        console.error('截屏失败');
      })
  }
  return (
    <div className="App">
      <div>

      </div>
      {/* 操作栏 */}
      <Row gutter={[16, 16]}>
        <Form layout='inline'>
          <Form.Item label='水印'>
            <Input allowClear value={waterMarker} onChange={handleChangeWaterMarker} />
          </Form.Item>
          <Form.Item label='纸张尺寸'>
            <Select onChange={handlePaperChange} value={paper}>
              <Option value='a4' >A4</Option>
              <Option value='b5' >B5</Option>
            </Select>
          </Form.Item>
          <Form.Item >
            <Button type='primary' onClick={exportPDF}>导出PDF</Button>
            <Button type='primary' onClick={exportPDFAddHTML} disabled >导出PDF-addHTML</Button>
          </Form.Item>
        </Form>
      </Row>

      <div style={{ width: papers[paper][1].w + 'pt'}} className='report-box' ref={getCardRef} >
        <div className='report-header'>
          <Row >
            <Col span={12}>
              <Title level={1} style={{ color: 'white' }}>产品报价单</Title>
            </Col>
            <Col span={12}  >
              <Text style={{ color: 'white' }}  >单号：889901213</Text> <br />
              <Text style={{ color: 'white' }} >报价日期：2020年12月22日</Text><br />
              <Text style={{ color: 'white' }} >报价单有效期：30天</Text><br />
            </Col>
          </Row>
        </div>
        <Card >
          <div>
          </div>
          <Descriptions bordered size='small'>
            <DescriptionItem label='报价单名称' span={3}>报价单名称</DescriptionItem>
            <DescriptionItem label='客户名称' span={2}>客户名称</DescriptionItem>
            <DescriptionItem label='地址' span={2}>客户的地址很长很长很长很长很长</DescriptionItem>

            <DescriptionItem label='联系人' span={2}>联系人</DescriptionItem>
            <DescriptionItem label='联系方式' span={2}>13255900215</DescriptionItem>
          </Descriptions>

          <Table size='small' columns={columns} pagination={null}></Table>
          <Table size='small' columns={columns} pagination={null}></Table>
          <Table size='small' columns={columns} pagination={null}></Table>


          <Descriptions bordered size='small'>
            <DescriptionItem label='总件数' span={2}>22件</DescriptionItem>
            <DescriptionItem label='总价格' span={2}> 31元</DescriptionItem>
            <DescriptionItem label='运费' span={2}>31元</DescriptionItem>
            <DescriptionItem label='人工费' span={2}>31元</DescriptionItem>

            <DescriptionItem label='总计'>131元</DescriptionItem>
            <DescriptionItem label='优惠价'>1元</DescriptionItem>
            <DescriptionItem label='大写'>壹佰叁拾元壹元</DescriptionItem>
            <DescriptionItem label='备注' span={4}>
              <Paragraph>
                Qui enim sed aut odit. Officia atque soluta vel qui labore. Sapiente aut a velit architecto voluptas aperiam.
                Ratione alias reiciendis dolor sequi delectus iusto et. Autem corrupti ullam doloribus nemo dolor enim dolorem dignissimos.
                Sed culpa maxime commodi quas eos odio ea itaque.Quas reiciendis dolore. Et aut sunt aut consequatur quia eum sed totam commodi.
                Ut rerum saepe debitis recusandae perferendis atque repellat ex ipsum. Porro eos esse hic et.
                Corrupti neque impedit molestiae voluptatem quo totam.
                Esse sed sed dolores. Aut iste provident nam non quia suscipit. Cumque vitae labore quasi illum sint.
                Perspiciatis praesentium molestias tempora. Quidem et deserunt.
              </Paragraph>
            </DescriptionItem>

          </Descriptions>

        </Card>
        <div className='report-bottom'>

          <Image
            width={200}
            height={200}
            src="error"
            fallback="data:image/png;base64,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"
          />
          <Title level={2} style={{ color: 'white' }} >公司名称</Title><br />

        </div>
      </div>

    </div>
  );
}

export default App;
