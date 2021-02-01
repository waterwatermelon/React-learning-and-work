import { SFC } from 'react';
import React from 'react';


interface IProps {
  name: string,
}

const StatelessComponent: SFC<IProps> = (props) => {
  const name: string = props.name;
  return (<div>
    hello StatelessComponent: {name}
  </div>)
}

export default StatelessComponent;