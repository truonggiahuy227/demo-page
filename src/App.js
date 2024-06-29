// src/App.js

import React from "react";
import ReactDOM from 'react-dom'
import { Layout, Flex } from 'antd/lib';
import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import './App.css';
// import ImageUpload from './components/ImageUpload.jsx';
// import ImageDescription from './components/ImageDescription';
import Navigation from './components/Navigation';
import HeaderBar from "./components/Header";
import HomePage from "./pages/HomePage";
import ImageDetectionPage from "./pages/ImageDetectionPage";
import UploadingImagePage from "./pages/UploadImagePage";
import StatisticPage from "./pages/StatisticPage";

const { createRoot } = ReactDOM;
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  // color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  height: 'fit-content',
  // backgroundColor: '#4096ff',
  top: 0
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100vh',

};

function App() {
 
    return (
    <BrowserRouter>
      <Flex gap="middle" wrap>

        <Layout style={layoutStyle}>
          <Header style={headerStyle}><HeaderBar /></Header>
          <Layout >
            <Sider >
              <Navigation />
            </Sider>
            <Content style={{ overflow: "auto" }}>
              <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/image-detection" element={ <ImageDetectionPage /> }/>
                <Route path="/image-upload" element={ <UploadingImagePage /> } />
                <Route path="/statistic" element={ <StatisticPage /> } />
              </Routes>
            </Content>
          </Layout>
          
        </Layout>
      </Flex>
    </BrowserRouter>     
    );
}

export default App;
