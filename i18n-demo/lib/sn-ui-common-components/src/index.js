import React from "react";
import Button from './components/Button/Button.jsx';
import AntdButton from './components/AntdButton/AntdButton.jsx';
import CustomTable from './components/CustomTable/CustomTable';
import CommonFormItem from './components/CommonForm/CommonFormItem';
import { SearchBox } from './components/CustomTool/CustomTool';
import Menus from './components/Menus';
import TwoColumnMainLayout from 'src/layouts/TwoColumnMainLayout/TwoColumnMainLayout';
import { ContentTabsLayout } from 'src/layouts/ContentTabsLayout';
import NotFound from 'src/pages/NotFound';
import NotPermission from 'src/pages/NotPermission';
if (process.env.NODE_ENV === 'development') {
  require('./index.css');
}

export { Button };
export { AntdButton };
export { SearchBox };
export { CustomTable };
export { CommonFormItem };
export { Menus };
export { TwoColumnMainLayout };
export { ContentTabsLayout };
export { NotFound };
export { NotPermission };
