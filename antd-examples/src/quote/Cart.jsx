import React, { Component, useState } from 'react'
import { Typography, Breadcrumb, Row, Col, InputNumber, Checkbox, Button, Input, Form, Tag, Empty } from 'antd';
import InvalidTag from './InvalidTag';
import './cart.css';
const { Title, Link, Paragraph } = Typography;
const borderBottom = {
  borderBottom: '1px solid #E8E8E8',
}
function isValid(product) {
  return product.state === 'ACTIVE';
}
function CartItem(props) {
  const { product } = props;
  const [amount, setAmount] = useState(1);
  function handleToggleCheckItem() {
    props.handleToggleCheckItem && props.handleToggleCheckItem(product.id);
  }
  function handleDeleteProduct() {
    props.handleDeleteProduct && props.handleDeleteProduct(product.id);
  }

  function addProductIntoCollection() {
    props.addProductIntoCollection && props.addProductIntoCollection(product.id);
  }
  function handleChangeProductNumber(number) {
    console.log('number', number);
  }

  return (
    <div style={{ ...borderBottom }} className='cart-item'>
      <div className='cart-item__checkbox'>
        {
          isValid(product) ?
            <Checkbox checked={product.checked} onChange={handleToggleCheckItem}></Checkbox>
            :
            <InvalidTag />
        }

      </div>
      <img alt='图片' src={product.imageUrl} className='cart-item__img' />
      <div className='cart-item__des'>
        <Paragraph ellipsis className='cart-item__name'>
          {product.name}
        </Paragraph>
        <p >
          {product.overview}
        </p>
      </div>
      <span className='cart-item__price'>
        &yen;{product.price}
      </span>
      {/* 
      1.输入小数 给出提示，不发起数据请求 
      2.输入整数 发起请求 请求期间不允许操作 请求成功，刷新购物车
    */}
      <InputNumber
        className='cart-item__amount'
        min={1}
        step={1}
        onChange={handleChangeProductNumber}
        disabled={!isValid(product)}
      />
      <span className='cart-item__totalPrice'>
        &yen;{product.price * product.amount}
      </span>
      <div className='cart-item__op'>

        <Link href="javascript:;" onClick={handleDeleteProduct}>删除</Link>

        <Link href="javascript:;" onClick={addProductIntoCollection}>加入收藏夹</Link>
      </div>
    </div>
  );
}
const mockCart = { id: 1, };
const mockProducts = [{
  id: 1,
  name: 'namenamenamenamenamInternational Usability Specialiste',
  amount: 1,
  overview: 'Assistant Jamaica Internal',
  price: 1200.00,
  imageUrl: 'http://lorempixel.com/640/480',
  state: 'OFFSHELVES'
}, {
  id: 22,
  name: 'n',
  amount: 1,
  overview: 'Internal',
  price: 120.00,
  imageUrl: 'http://lorempixel.com/640/480',
  state: 'ACTIVE'
}];
const totalAmount = 24;
const totalPrice = 1000;

export default function Cart(props) {
  // const [products, setProducts] = useState(mockProducts);
  const [products, setProducts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  function isAllChecked() {
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (!item.checked && isValid(item)) {
        setAllChecked(false);
        return false;
      }
    }
    setAllChecked(true);
    return true;
  }
  function handleToggleCheckItem(productId) {
    const productsTemp = products.slice();
    for (let i = 0; i < productsTemp.length; i++) {
      const item = productsTemp[i];
      if (item.id === productId) {
        item.checked = !item.checked;
      }
    }

    setProducts(productsTemp)
    isAllChecked();
  }
  function handleToggleCheckAll() {
    if (!products || products.length === 0) {
      return false;
    }
    const productsTemp = products.slice();
    for (let i = 0; i < productsTemp.length; i++) {
      const item = productsTemp[i];
      item.checked = !allChecked;
    }
    setAllChecked(!allChecked);
    setProducts(productsTemp);
  }

  function handleDeleteProducts() {
    const uid = 111;
    const productIds = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.checked) {
        productIds.push(product.id);
      }
    }
    console.log('delete products', productIds);
    const params = { uid, productIds };

  }
  return (
    <div style={{ position: 'relative' }}>

      <div style={{ ...borderBottom, paddingBottom: '20px', marginBottom: '14px' }}>
        <div style={{ padding: '16px 0' }}>
          <Breadcrumb >
            <Breadcrumb.Item>产品中心</Breadcrumb.Item>
            <Breadcrumb.Item>购物车</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Title level={4}>我的购物车</Title>
      </div>


      {products && products.length !== 0
        ?
        // <div >
        <>
          {products.map(product => {
            return <CartItem product={product} handleToggleCheckItem={handleToggleCheckItem} />
          })
          }
          <div className="cart-footer">
            <div className='cart-footer-left'>

              <span className='cart-footer__checkbox'>
                <Checkbox checked={allChecked} onChange={handleToggleCheckAll}></Checkbox>
              </span>
            全选 &nbsp;
            <Link onClick={handleDeleteProducts}>删除</Link>

            </div>
            <div className='cart-footer-right'>
              <span className='cart-footer__amount'>
                已选择 {totalAmount} 件商品
            </span>
              <span className='cart-totalprice__label'>
                总计:
            </span>
              <span className='cart-totalprice__value'>
                &yen; {totalPrice}
              </span>
              <Button className='cart__quote-btn'>生成报价单</Button>
            </div>

          </div>
        </>
        :
        <Empty description=''>
          购物车空空如也,快去 <Link type='text'>产品中心</Link> 选购产品
        </Empty>
      }

    </div>
  )
}
