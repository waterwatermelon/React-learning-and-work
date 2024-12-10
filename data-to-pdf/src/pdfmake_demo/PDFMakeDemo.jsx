import React, { useEffect } from 'react'
// 引入 pdfmake 库
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'antd';
/**
 * FIXME: 中文乱码
 * @returns 
 */
export default function PDFMakeDemo() {
  const handleOpen = () => {
    // 创建文档定义
    const documentDefinition = {
      // watermark: 'starnet co.ltd',
      header: [{
        text: '-------------header--------------',
        fontSize: 18,
        bold: true,
        background: '#2A73A4',
        color: '#fff',
        height: 200,
      }, {
        text: '-------header-------',
        background: '#2A73A4',
        fontSize: 16,
        color: '#fff',
      }],
      footer: '-------------footer--------------',
      content: [
        { text: 'Hello, PDFMake!', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        {
          margin: [0, 0, 0, 10],
          table: {
            headerRows: 1,

            body: [
              [{ text: '序号', bold: true }, { text: '产品名称', bold: true }, { text: '规格型号', bold: true ,},{ text: '数量', bold: true ,},{ text: '单价', bold: true ,},],
              ['John Doe', 25, 'USA','',''],
              ['John Doe', 25, 'USA','',''],
              ['John Doe', 25, 'USA','',''], 
              ['END', 0, 'END','',''],
            ],
          },
        },
        {
          margin: [0, 0, 0, 10],
          table: {
            body: [
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['END', 0, 'END'],
            ],
          },
        },
        {
          margin: [0, 0, 0, 10],
          table: {
            body: [
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['Name', 'Age', 'Country'],
              ['John Doe', 25, 'USA'],
              ['Jane Doe', 30, 'Canada'],
              ['END', 0, 'END'],
            ],
          },
        },
        /*引入图片*/
        // { image: 'data:image/jpeg;base64,...', width: 100, height: 100 },
      ],
    };

    // 创建PDF文档
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    // 下载PDF文件
    // pdfDocGenerator.download('example.pdf');
    // 打开pdf文件
    pdfDocGenerator.open();
  };
  useEffect(() => {

    // 注册字体
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;


  }, []);
  return (
    <div>
      <h2>
        PDFMakeDemo
      </h2>
      <Button type='primary' onClick={handleOpen}>open</Button>
    </div>
  )
}
