import React, { useEffect } from 'react'
import { ContentTabsLayout } from 'src';

function ComponentOne() {
  useEffect(() => { 
    console.log('Component one mount');
    return () => {
      console.log('Component one unmount');
    };
  }, []);
  return 'Component One';
}


function ComponentTwo() {
  useEffect(() => { 
    console.log('Component two mount');
    return () => {
      console.log('Component two unmount');
    };
  }, []);
  return 'Component Two';
}

function ComponentThree() {
  useEffect(() => { 
    console.log('Component three mount');
    return () => {
      console.log('Component three unmount');
    };
  }, []);
  return 'Component Three';
}


const tabList = [{
  key: 'one',
  title: 'one',  
  cache: true,
  Component: ComponentOne
}, {
  key: 'two',
  title: 'two',
  cache: false,
  Component: ComponentTwo
}, {
  key: 'three',
  title: 'three',
  cache: false,
  Component: ComponentThree
}];
export default function ContentTabsLayoutTest() {
  return (
    <ContentTabsLayout tabList={tabList} />
  )
}
