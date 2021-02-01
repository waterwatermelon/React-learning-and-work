import React from 'react';

interface IProps {
  color: string,
  size: string,
}

interface IState {
  count: number
}

/**
 *
 * 有状态的组件
 * @class StateComponent
 * @extends {React.Component<IProps, IState>}
 */
class StateComponent extends React.Component<IProps, IState> {
  public state = {
    count: 1,
  }

  public render() {
  return <div>hello count : { this.state.count}</div>
  }

  public componentDidMount() {
    this.setState({ count: 2});
  }
}

export default StateComponent;