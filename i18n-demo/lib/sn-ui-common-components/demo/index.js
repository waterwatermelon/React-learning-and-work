
import React from "react";
import ReactDOM from "react-dom";
// import CustomTableOne from "./test/components/CustomeTableTest/CustomTableTest";
import ContentTabsLayoutTest from './test/layouts/ContentTabsLayoutTest';
import TwoColumnMainLayoutTest from "./test/layouts/TwoColumnMainLayoutTest/TwoColumnMainLayoutTest";
import CommonFormItemTest from './test/components/CommonFormItemTest/CommonFormItemTest';
ReactDOM.render(
  <div>
    <TwoColumnMainLayoutTest>
    <ContentTabsLayoutTest />
      {/* <CustomTableOne /> */}
      <CommonFormItemTest />

    </TwoColumnMainLayoutTest >
  </div>,
  document.getElementById("root"));
