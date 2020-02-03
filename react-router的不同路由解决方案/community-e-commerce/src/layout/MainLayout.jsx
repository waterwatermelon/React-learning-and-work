import React,{Component} from 'react';
import MenuTab from '../public/MenuTab';

/**
 * 布局组件 内容区域最小高度占据可视区高度
 * @class MainLayout
 * @extends {Component}
 */
class MainLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            tabsHeight:'.64rem'
        }
    }
    render(){
        return(
            <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',paddingBottom:this.state.tabsHeight,boxSizing:'border-box'}}>
                <div style={{flex:'1',background:'#fcf',}}>
                    {this.props.children}
                </div>
                <MenuTab height={this.state.tabsHeight}/>
            </div>
        )
    }
}
export default MainLayout;