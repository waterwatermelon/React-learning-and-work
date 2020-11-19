import React, { Component } from 'react';
import { Breadcrumb, Typography, Checkbox, Button, Row, Col, Pagination, Empty } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import InvalidTag from './InvalidTag';
import './collection.css'

const borderBottom = {
  borderBottom: '1px solid #E8E8E8',
}
const { Title, Link, Paragraph } = Typography;
function isValid(product) {
  return product.state === 'ACTIVE';
}
function CollectionItem(props) {
  const { product } = props;
  function toggleCheckProduct() {
    props.toggleCheckProduct && props.toggleCheckProduct(product.id);
  }
  function handleAddProductIntoCart() {
    const params = {
      productId: product.id,
      amount: 1,
      uid: 1,
    };
    // 添加成功或者失败 给出提示
  }

  function handleCancelCollect() {
    const params = {
      productId: product.id,
      uid: 1,
    };
    // 添加成功或者失败 给出提示
    // 刷新页面
  }
  return <div className='collection'>
    <div className="collection__checkbox">
      <Checkbox checked={product.checked} onClick={toggleCheckProduct} />
    </div>
    <img className='collection__pic' alt='{product.name}' />
    <div className="collection__des">
      <Paragraph className='collection__des-item collection__name' ellipsis>
        {product.name}
      </Paragraph>
      <Paragraph className='collection__des-item collection__overview' ellipsis>
        {product.overview}
      </Paragraph>
      {
        isValid(product)
          ?
          <div className='collection__des-item collection__price'>&yen;{product.price}</div>
          :
          <InvalidTag />
      }
    </div>
    <div className="collection__ops">

      <Button shape='circle' type='text' onClick={handleCancelCollect}>
        <HeartFilled style={{ color: '#C22121', fontSize: '24px' }} />
      </Button >
      {
        isValid(product) && <Button shape='circle' type='text' onClick={handleAddProductIntoCart}>
          <ShoppingCartOutlined style={{ color: '#1E2F4D', fontSize: '24px' }} />
        </Button>
      }

    </div>
  </div>
}
// TODO:
// 获取我的收藏
// 取消收藏
// 加入购物车
export default class Collection extends Component {
  constructor() {
    super();
    this.state = {
      products: [{
        id: 99,
        name: 'Manager',
        overview: 'deposit input one-to-one',
        price: 1,
        state: 'ACTIVE',
      }, {
        id: 68,
        name: 'Auto Loan AccountSMS invoiceAuto Loan AccountSMS invoiceAuto Loan AccountSMS invoiceAuto Loan AccountSMS invoice',
        overview: 'Auto Loan AccountSMS invoice Lead Interactions AnalystLead Interactions AnalystLead Interactions Analyst',
        price: 1,
        state: '',
      }, {
        id: 66,
        name: 'Argentine Peso',
        overview: 'monetize',
        price: 1,
        state: '',
      }, {
        id: 67,
        name: 'Argentine Peso',
        overview: 'monetize',
        price: 1,
        state: '',
      }, {
        id: 68,
        name: 'Argentine Peso',
        overview: 'monetize',
        price: 1,
        state: '',
      }, {
        id: 999,
        name: 'Argentine Peso',
        overview: 'monetize',
        price: 1,
        state: '',
      }],
      total: 12,
      page: 1,

    };
  }
  handleCancelCollectProducts = () => {
    const productIds = [];
    const products = this.state.products.slice();
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.checked) {
        productIds.push(product.id);
      }
    }
    console.log('cancel collect product', productIds);
    const param = { productIds, uid: 0 };
    // 提示 成功或失败
    // 成功刷新页面

  }
  toggleCheckProduct = (productId) => {
    const products = this.state.products.slice();
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.id === productId) {
        product.checked = !product.checked;
        break;
      }
    }
    this.setState({
      products,
    });
  }

  handleChangePage = (page) => {
    this.setState({
      page
    })
  }
  render() {
    return (
      <div>
        {/* TODO:面包屑+ 标题组件 */}
        <div style={{ ...borderBottom, paddingBottom: '20px', marginBottom: '14px' }}>
          <div style={{ padding: '16px 0' }}>
            <Breadcrumb >
              <Breadcrumb.Item>产品中心</Breadcrumb.Item>
              <Breadcrumb.Item>我的收藏</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Title level={4}>我的收藏</Title>
        </div>
        {
          this.state.products && this.state.products.length !== 0
            ?
            <div className="collection-box">
              <Button type='link' onClick={this.handleCancelCollectProducts}>取消收藏</Button>
              {
                this.state.products.map(item => {
                  return <CollectionItem product={item} toggleCheckProduct={this.toggleCheckProduct}></CollectionItem>;
                })
              }
              <Pagination
                showQuickJumper
                total={this.state.total}
                defaultCurrent={1}
                current={this.state.page}
                onChange={this.handleChangePage} />
            </div>
            :
            <Empty description=''> 这里空空如也，快去<Button type='link'>产品中心</Button>逛逛 </Empty>
        }

      </div>
    )
  }
}
