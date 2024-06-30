// src/components/Navigation.js

import React from 'react';
import './Navigation.css';
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom";
import { Button, Menu } from 'antd/lib';
import { icons } from 'antd';
import { 
    ImportOutlined,
    FileImageOutlined,
    PieChartOutlined,
    HomeOutlined
} from '@ant-design/icons';


const { createRoot } = ReactDOM;
const {  useState  } = React;


const items = [
  {
    index: '1',
    icon: <HomeOutlined />,
    label: 'Home',
    path: '/',
  },
  {
    index: '2',
    icon: <FileImageOutlined />,
    label: 'Image Detection',
    path: '/image-detection',
  },
  {
    index: '3',
    icon: <ImportOutlined />,
    label: 'Upload Image',
    path: '/image-upload',
  },
  {
    index: '4',
    icon: <PieChartOutlined />,
    label: 'Statistic',
    path: '/statistic',
  }
].map((item, index) => {
    return {
      key: index,
      label: <Link to={item.path}>{item.label}</Link>,
      icon: item.icon,
    };
  });

function Navigation() {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: '100vh' }}>
      <Menu
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['0']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}

export default Navigation;
