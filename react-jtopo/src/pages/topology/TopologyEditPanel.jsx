import { useState, useEffect } from 'react';
import { editor } from './jtopo-editor';
import network from './network.json';
import { Layout, Button, Collapse, Input, Upload } from 'antd';
import $ from 'jquery';
import './topology-panel.scss';
import './jtopo-editor.css';
import { Modal } from 'antd';
import { Form } from 'antd';
import { Select } from 'antd';
import { Divider } from 'antd';
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
export default function TopologyEditPanel() {

  const [helpVisible, setHelpVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  useEffect(() => {
    // 节点树中每个节点的拖放动作定义给拓扑图编辑器
    const nodes = $('[topo-div-type="topo-node"]');
    const nodeLength = nodes.length;
    for (let i = 0; i < nodeLength; i++) {
      console.log(`node[i]`, nodes[i]);
      const text = $(nodes[i]).find("span").eq(0).text();
      editor.drag(nodes[i], document.getElementById('topology-canvas'), text);
    }
    const jsonObj = network.data.topology_json;
    editor.init('guid', '', jsonObj);
  }, []);

  return (
    <div>
      <Layout>
        <Header className='header'>
          <div >
            <div class="layui-nav layui-layout-right">
              {/* <i class="fa fa-pencil-square-o toolbar-icon" aria-hidden="true" title="编辑"
                onClick="editor.utils.setEditMode()"></i>
              <i class="fa fa-arrows toolbar-icon" aria-hidden="true" title="全屏查看"
                onClick="editor.utils.showInFullScreen(editor.stage.canvas,'RequestFullScreen')"></i>
              <i class="fa fa-align-center toolbar-icon" aria-hidden="true" title="居中显示"
                onClick="editor.utils.showInCenter()"></i>
              <i class="fa fa-eye toolbar-icon" aria-hidden="true" title="预览"
                onClick="editor.utils.showPic()"></i>
              <i class="fa fa-floppy-o toolbar-icon" aria-hidden="true" title="保存"
                onClick="editor.saveTopology(true)"></i>
              <i class="fa fa-clipboard toolbar-icon" aria-hidden="true" title="复制"
                onClick="editor.utils.cloneSelectedNodes()"></i>
              <i class="fa fa-times toolbar-icon" aria-hidden="true" title="删除"
                onClick="editor.utils.deleteSelectedNodes()"></i>
              <i class="fa fa-trash-o toolbar-icon" aria-hidden="true" title="清空"
                onClick="editor.utils.clearTopology()"></i> 
                */}

              <Button class="fa fa-search-plus toolbar-icon" aria-hidden="true" title="放大"
                onClick={editor.utils.scalingBig}>放大</Button>
              <Button class="fa fa-search-minus toolbar-icon" aria-hidden="true" title="缩小"
                onClick={editor.utils.scalingSmall}>缩小</Button>
              <Button onClick={() => { setHelpVisible(true) }}> 帮助</Button>
              <Button onClick={() => { editor.saveTopology() }}>保存</Button>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider width='200'>
            <div className='sider'>
              <div className='device-list'>
                <Collapse accordion>
                  <Panel header='连线'>
                    <div class="layui-colla-content layui-show">
                      <table width="100%">
                        <tr>
                          <td width="100%" align="center">
                            <div  className='link-selected' topo-div-type="topo-link" topo-linktype="line"
                              draggable="false"
                              onClick={() => editor.lineType = 'line'}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/line.png" alt='直线' />
                              <br /><span>直线</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-link" topo-linktype="foldline"
                              draggable="false"
                              onClick={() => { editor.lineType = 'foldLine'; editor.config.direction = 'horizontal' }}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/foldline_horizontal.png" alt='折线(横向)' />
                              <br /><span>折线(横向)</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-link" topo-linktype="foldline"
                              draggable="false"
                              onClick={() => { editor.lineType = 'foldLine'; editor.config.direction = 'vertical'; }}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/foldline_vertical.png" alt='折线(纵向)' />
                              <br /><span>折线(纵向)</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-link" topo-linktype="flexline"
                              draggable="false"
                              onClick={() => { editor.lineType = 'flexLine'; editor.config.direction = 'horizontal'; }}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/flexline_horizontal.png" alt='二次折线(横向)' />
                              <br /><span>二次折线(横向)</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-link" topo-linktype="flexline"
                              draggable="false"
                              onClick={() => { editor.lineType = 'flexLine'; editor.config.direction = 'vertical'; }}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/flexline_vertical.png" alt='二次折线(纵向)' />
                              <br /><span>二次折线(纵向)</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-link" topo-linktype="curveline" draggable="false"
                              onClick={() => { editor.lineType = 'curveLine'; }}>
                              <img class="link-icon-style"
                                src="static/jtopo/img/line_curveline.png" alt='曲线' />
                              <br /><span>曲线</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                  </Panel>
                  <Panel header='网络设备' forceRender>
                    <div class="layui-colla-content">
                      <table width="100%">
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SWITCH" draggable="true"
                              title="直接面向用户连接或访问网络的交换机">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_access_switch.png" />
                              <br /><span>接入层交换机</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SWITCH" draggable="true"
                              title="多台接入层交换机的汇聚点">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_convergence_switch.png" />
                              <br /><span>汇聚层交换机</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SWITCH" draggable="true"
                              title="位于核心层（网络主干部分的交换机）">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_core_switch.png" />
                              <br /><span>核心交换机</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SWITCH" draggable="true"
                              title="无线网路的接入点（Access Point）">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_router.png" />
                              <br /><span>无线AP</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SWITCH" draggable="true"
                              title="路由器">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_ap.png" />
                              <br /><span>路由器</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Panel>
                  <Panel header='安全设备'>
                    <div class="layui-colla-content">
                      <table width="100%">
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true"
                              title="入侵防御系统">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_ips.png" />
                              <br /><span>IPS</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true"
                              title="Web应用防火墙">
                              <img class="node-icon-style" src="static/jtopo/img/icon_waf.png" />
                              <br /><span>WAF</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true"
                              title="防火墙">
                              <img class="node-icon-style" src="static/jtopo/img/icon_firewall.png" />
                              <br /><span>防火墙</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true"
                              title="漏洞扫描">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_xscan.png" />
                              <br /><span>漏洞扫描</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true"
                              title="负载均衡">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_balancing.png" />
                              <br /><span>负载均衡</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Panel>
                  <Panel header='服务器设备'>
                    <div class="layui-colla-content">
                      <table width="100%">
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SERVER" draggable="true"
                              title="网络服务器">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_server.png" />
                              <br /><span>服务器</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SERVER" draggable="true"
                              title="跳板机/堡垒机">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_proxy_server.png" />
                              <br /><span>代理服务器</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SERVER" draggable="true"
                              title="数据库节点，用于存储数据">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_data_server.png" />
                              <br /><span>数据库服务器</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="100%" align="center">
                            <div topo-div-type="topo-node" topo-nodetype="SERVER" draggable="true"
                              title="WEB服务器">
                              <img class="node-icon-style"
                                src="static/jtopo/img/icon_web_server.png" />
                              <br /><span>WEB服务器</span>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Panel>
                </Collapse>

                <Button onClick={() => { setAddVisible(true) }}>添加自定义设备</Button>
              </div>
              <div className='bar'>
                <span></span>
              </div>
            </div>
          </Sider>
          <Content>
            <div class="layui-col-md8">
              <div id="topology-body" class="topology-context">
                {/* 右键点击的菜单 */}
                {/* <div id="node-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-wrench menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>节点设置</span>
                  </div>
                  <div class="fa fa-th-large menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>应用布局</span>
                  </div>
                  <div class="fa fa-th-list menu-item" id="change-node-text-pos"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>文字位置</span>
                  </div>
                  <div class="fa fa-search-plus menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>放大(Shift+)</span>
                  </div>
                  <div class="fa fa-search-minus menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>缩小(Shift-)</span>
                  </div>
                  <div class="fa fa-rotate-right menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>顺时针旋转(Shift+U)</span>
                  </div>
                  <div class="fa fa-rotate-left menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>逆时针旋转(Shift+I)</span>
                  </div>
                  <div class="fa fa-times menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>删除节点(Delete)</span>
                  </div>
                  <div class="fa fa-files-o menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>复制节点(Shift+C)</span>
                  </div>
                  <div class="fa fa-mail-reply menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>撤销(Shift+Z)</span></div>
                  <div class="fa fa-mail-forward menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>重做(Shift+R)</span></div>
                </div>
                <div id="layout-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-minus-circle menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>取消布局</span>
                  </div>
                  <div class="fa fa-object-group menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>分组布局</span>
                  </div>
                  <div class="fa fa-share-alt menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>树形布局</span>
                  </div>
                  <div class="fa fa-dot-circle-o menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>圆形布局</span>
                  </div>
                </div>
                <div id="node-text-pos-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>顶部居左</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>顶部居中</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>顶部居右</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>中间居左</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>居中</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>中间居右</span></div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>底部居左</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>底部居中</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>底部居右</span>
                  </div>
                </div>
                <div id="line-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-wrench menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>连线设置</span>
                  </div>
                  <div class="fa fa-times menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>删除连线</span></div>
                </div>
                <div id="main-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-search-plus menu-item"
                    onClick="editor.utils.scalingBig()"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>放大(Shift+)</span>
                  </div>
                  <div class="fa fa-search-minus menu-item" onClick="editor.utils.scalingSmall()"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>缩小(Shift-)</span>
                  </div>
                  <div class="fa fa-trash-o menu-item" onClick="editor.utils.clearTopology();"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>清空(Shift+Y)</span>
                  </div>
                  <div class="fa fa-eye menu-item" onClick="editor.utils.showPic();"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>预览(Shift+P)</span>
                  </div>
                  <div class="fa fa-arrows menu-item"
                    onClick="editor.utils.showInFullScreen(editor.stage.canvas,'RequestFullScreen')"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>全屏查看(Shift+F)</span>
                  </div>
                  <div class="fa fa-align-center menu-item" onClick="editor.utils.showInCenter()"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>居中显示(Shift+G)</span>
                  </div>
                  <div class="fa fa-floppy-o menu-item" onClick="editor.saveTopology(true)"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>保存(Shift+S)</span>
                  </div>
                  <div class="fa fa-question-circle menu-item" onclick="alert('帮助文档')"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span id="showHelp">查看帮助(Shift+H)</span>
                  </div>
                  <div class="fa fa-info-circle menu-item"
                    onclick="window.open('json_view.html', '当前拓扑结构JSON展示', '').document.write(editor.stage.toJson())"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span id="showJSON">查看拓扑JSON结构</span></div>
                </div>
                <div id="group-mange-menu" class="right-click-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-pencil-square-o menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>新建分组</span>
                  </div>
                  <div class="fa fa-align-left menu-item" id="align-group"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>对齐方式</span>
                  </div>
                </div>
                <div class="right-click-menu" id="group-align-menu" style={{ zIndex: 9 }}>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>水平对齐</span>
                  </div>
                  <div class="menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>垂直对齐</span>
                  </div>
                </div>
                <div class="right-click-menu" id="container-mange-menu" style={{ zIndex: 9 }}>
                  <div class="fa fa-columns menu-item"
                    onMouseMove="this.style.backgroundColor='#c5e7f6'"
                    onMouseOut="this.style.backgroundColor=''">
                    <span>拆分</span>
                  </div>
                </div> */}

                <canvas class="topology-context" id="topology-canvas" width={300} height={800}>
                  您的浏览器不支持HTML5!
                </canvas>
              </div>
            </div>

          </Content>
          <Sider >
            <div className='detail'>
              <p>设备名称：<span id="node-name" >（鼠标悬浮节点查看）</span></p>
              <p>设备类型：</p>
              <p>设备状态：</p>
              <Divider />
              <p>还可以放置其他信息:</p>
              <p>比如结合highcharts放一些节点联动的图表信息</p>
            </div>
          </Sider>
        </Layout>
      </Layout>
      {/* 使用说明 */}
      <Modal title='使用说明' visible={helpVisible} onCancel={() => setHelpVisible(false)}>
        {/* TODO:OPT: */}
        <h5> 1.基本操作</h5>
        <ul>
          <li>
            <p>图元区操作</p>
            <p>选择连线：单击不同的连线就可以选择不同形态的连线进行操作.</p>
            <p>拖拽图元到编辑器：将鼠标移动到需要拖拽的图标,按下鼠标左键不放拖动鼠标,在编辑器空白处松开鼠标左键即完成一次拖拽操作.</p>
          </li>

          <li>
            <p>编辑器操作</p>
            <p>移动画布：在编辑器空白处按下鼠标左键不放,移动鼠标就可以对画布进行拖拽查看.</p>
            <p>缩放画布：将鼠标移动到画布所在区域,滚动鼠标滚轮就可以对画布进行缩放.</p>
            <p>右键菜单：在编辑器空白区域单击鼠标右键,即可看到功能菜单.</p>
            <p>移动节点：在节点上按下左键不放移动鼠标.默认情况下,移动节点时会显示一条十字线,方便节点对齐移动.</p>
            <p>拓扑图保存: 在编辑器空白区域右键点击"保存"或者在工具栏点击"保存"按钮完成拓扑图的保存操作.</p>
            <p>拓扑图清空: 在编辑器空白区域右键点击"清空"或者在工具栏点击"清空"按钮完成拓扑图的清空操作.注意:清空操作将删除数据库保存的节点信息和模板信息</p>
          </li>

          <li>
            <p>连线操作</p>
            <p>节点连线：左键单击节点，移动鼠标即可看到一条随鼠标移动的线条；在目标节点上点击鼠标左键即可完成一次连线.</p>
            <p>连线类型: 在左侧工具栏可以选择五种类型的连线,分别是:普通直线,折线和二次折线(每种折线分为横向和竖向的线).</p>
            <p>删除连线: 将鼠标移动到连线上单击鼠标右键,在弹出菜单上选择"删除连线"菜单或者在工具栏点击"删除"按钮</p>
            <p>设定连线文字: 将鼠标移动到连线上单击鼠标右键,在弹出菜单上选择"添加描述"菜单.然后在弹出的文本框中输入需要添加的文字信息.</p>
          </li>
          <li>
            <p>节点操作</p>
            <p>选择节点：按住Ctrl键不放，单击节点可以选择单个或者多个节点.</p>
            <p>删除节点：将鼠标移动到连线上单击鼠标右键,在弹出菜单上选择"删除节点"菜单或者在工具栏点击"删除"按钮.</p>
            <p>复制节点：将鼠标移动到连线上单击鼠标右键,在弹出菜单上选择"复制节点"菜单或者在工具栏点击"复制"按钮.</p>
            <p>移动节点：在节点上按下左键不放移动鼠标.默认情况下,移动节点时会显示一条十字线,方便节点对齐移动.</p>
            <p>对节点应用布局：系统对节点支持三种布局方式:圆形,树形,分组布局.对节点进行圆形布局,会对该节点所指向的所有节点按照一定的半径进行重排.
        同理,树形布局或对其指向的节点按照一定宽度的树结构进行重排.应用分组布局的时候,其指向的节点会按照该节点的移动进行同步位移.</p>
          </li>
        </ul>
        <h5> 2.属性面板操作</h5>
        <ul>
          <li>
            <p>打开设备图标对应的属性面板</p>
            <p>在需要操作的图标上双击鼠标,在右侧区域即可看到打开的属性面板页面</p>
          </li>
          <li>
            <p>设备属性的编辑和保存</p>
            <p>打开设备属性面板后可以编辑和保存该设备的相关属性</p>
          </li>
        </ul>
      </Modal>
      <Modal title='添加自定义设备' visible={addVisible} onCancel={() => { setAddVisible(false) }}>
        <Form >
          <Form.Item label='名称'>
            <Input />
          </Form.Item>
          <Form.Item label='图标'>
            <Upload >
              <Button >
                选择图片
            </Button>
            </Upload>
          </Form.Item>
          <Form.Item label='设备类型'>
            <Select options={[{ label: '安全设备' }, { label: '网络设备' },]} />
          </Form.Item>
        </Form>
      </Modal>
    </div >

  )
}
