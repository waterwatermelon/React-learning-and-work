import React,{Component} from 'react';
import MenuTab from '../public/MenuTab';
class MainLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            tabsHeight:'2rem'
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