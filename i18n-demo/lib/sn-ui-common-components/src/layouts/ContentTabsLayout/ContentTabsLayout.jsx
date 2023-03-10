import React, { useState } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

/**
 *
 * 内容展示区的统一Tab组件
 * @export
 * @param {object} props
 * @param {array} props.tabList
 * @param {string} props.tabList[].key
 * @param {string} props.tabList[].title
 * @param {boolean} props.tabList[].cache
 * @param {Component} props.tabList[].Component
 * @returns
 */
export default function ContentTabsLayout(props) {
  const { tabList, style, ...tabProps } = props;
  const [activeKey, setActvieKey] = useState(tabList[0].key);

  const handleChangeTab = (key) => {
    setActvieKey(key);
  };
  return (
    <div style={{ padding: '8px 16px', ...style }}>
      <Tabs size="large" {...tabProps} onChange={handleChangeTab}>
        {
          tabList.map(item => {
            const { key, title, Component, cache, ...paneProps } = item;
            return (
              <TabPane key={key} tab={title} {...paneProps}>
                {

                  cache
                    ? <Component />
                    : activeKey === key && <Component />
                }
              </TabPane>
            );
          })
        }
      </Tabs>
    </div>
  );
}
