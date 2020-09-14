import React, { useEffect } from 'react';
import { Provider } from 'overmind-react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Chart from './components/Chart'
import Filters from './components/Filters';
import { app, useActions, useAppState } from './overmind';

import './App.less';

function AppLoading() {
  const { csvLoading, csv } = useAppState();
  const actions = useActions();

  useEffect(() => {
    if(!csvLoading && !csv) actions.loadCsv();
  }, [csvLoading, csv, actions]);

  if(!csvLoading) return <></>;

  return (
    <div className="App-loading">
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  )
}

function App() {
  const location = useLocation();
  const actions = useActions();

  useEffect(() => {
    actions.setLocation(location);
  }, [location, actions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adverity Advertising Data ETL-V Challenge</h1>
      </header>
      <div className="App-content">
        <div className="App-content-left">
          <Filters />
        </div>
        <div className="App-content-right">
          <Chart />
        </div>
      </div>
      <AppLoading />
    </div>
  );
};

export default () => (
  <Provider value={app}>
    <Router>
      <App />
    </Router>
  </Provider>
);
