import React, { Component } from 'react';
import './style/app.css';
import ChartBox from './layouts/ChartBox';
import PieChart from './PieChart';
// import title_icon from './images/title_icon.png';

class App extends Component {

  
  render() {
   
    return (
      <div className="app">

        <main className="main" >
          <div className="main-left">
            <ChartBox
              title={'本周通知查看统计'}
              style={{ height: '33%' }}>
              <PieChart />
            </ChartBox>

            <ChartBox
              title={'本周故障总体情况'}
              style={{ height: '33%' }}>
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
              {/* <NoticeWeekCount /> */}
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
