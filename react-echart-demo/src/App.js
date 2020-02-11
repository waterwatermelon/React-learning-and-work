import React, { Component } from 'react';
import './style/app.css';
import ChartBox from './layouts/ChartBox';

import title_icon from './images/title_icon.png';

class App extends Component {

  constructor(props) {
    super(props); 
  }
  render() {
   
    return (
      <div className="app">
        <div className="app-title" >
          <img className="app-title-icon" src={title_icon} />
          <span className="app-title-text">头部</span>
        </div>

        <main className="main" >
          <div className="main-left">
            <ChartBox
              title={'本周通知查看统计'}
              style={{ height: '33%' }}>
              <NoticeWeekCount />
            </ChartBox>

            <ChartBox
              title={'本周故障总体情况'}
              style={{ height: '33%' }}>
              {/* <MalWeekCount /> */}
            </ChartBox>

            <ChartBox title={'实时故障信息'} style={{ height: '33%' }}>
              {/* <MalliveBar /> */}
            </ChartBox>
          </div>
        
          <div className="main-middle" >
            
          </div>
         
          <div className="main-right">
            <ChartBox
              title={'本周通知查看统计'}
              style={{ height: '33%' }}>
              <NoticeWeekCount />
            </ChartBox>

            <ChartBox
              title={'本周故障总体情况'}
              style={{ height: '33%' }}>
              {/* <MalWeekCount /> */}
            </ChartBox>

            <ChartBox title={'实时故障信息'} style={{ height: '33%' }}>
              {/* <MalliveBar /> */}
            </ChartBox>
          </div>
        
        </main>

      </div>
    );
  }
}
// export default connect(mapStateToProps,mapDispatchToProps)(App);
export default App
