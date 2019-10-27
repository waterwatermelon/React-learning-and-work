import React,{Component} from 'react';
// class Title extends Component{
//     static defaultProps={
//         title:''
//     }
//     render(){
//         return (
//             <h2 className="title">
//                 {this.props.title}
//             </h2>
//         )
//     }
// }
function Title(props){
    return(
        <div className='title'>
            {props.title}
        </div>
    );
}
export default Title;