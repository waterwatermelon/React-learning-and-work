import React from 'react'
import TreeTwo from './tree/TreeTwo'
import TreeOne from './tree/TreeOne'
import Zoom from './Zoom'
import Tree from './tree/Tree'

export default function Topo() {
  return (
    <div>

      <Tree direction={' '} />
      <TreeOne direction={'vertical'} />
      <TreeTwo direction={'vertical'} />
      <Zoom />

    </div>
  )
}
