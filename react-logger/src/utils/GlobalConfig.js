const GlobalConfig = {
  // endpoint: '/v100' /*    服务器地址 */,
  endpoint: '/v100' /*    服务器地址 */,
  socketAddress: '/call/socketaddress',
  action: {
    makeCall: '/call/makecall',
    answerCall: '/call/answercall',
    hangupCall: '/call/hangupcall',
    videoLayout: '/call/video_layout',
    bfcp: '/call/bfcp',
    dtmf: '/call/dtmf',
    recording: '/call/recording',
    statistics: '/call/statistics',
    avChange: '/call/av_change',
  },
  calllog: {
    search: '/calllog/search',
  },
  config: {
    set: '/config/set',
    get: '/config/get',
    setNet: '/config/set_net',
    getNet: '/config/get_net',
    setRing: '/config/set_ring',
    getRing: '/config/get_ring',
    getMaxRingVolume: '/config/max_ring_volume',
    getMaxConfVolume: '/config/max_conf_volume',
  },
  account: {
    add: '/account/add',
    delete: '/account/delete',
    modify: '/account/modify',
    search: '/account/search',
    setcur: '/account/setcur',
    getcur: '/account/getcur',
  },
  device: {
    uiInitState: '/device/ui_init_state',
    setCurrentCamera: '/device/set_camera',
    cameraState: '/device/camera_ctr_state',
    ptz: '/device/ptz',
    getLocation: '/device/location_get',
    saveLocation: '/device/location_save',
    delLocation: '/device/location_del',
    loadLocation: '/device/location_load',
    getVoiceDb: '/device/voice_db',
    micTest: '/device/mic_test',
    netTest: '/device/net_test',
    speakerTest: '/device/speaker_test',
    getSys: '/device/get_sys',
    getStatus: '/device/getstatus',
    volume: '/device/volume',
    isVt50Device: '/device/is_vt50',
    rebootDevice: '/device/reboot_device',
    rmuState: '/device/rmu_state',
    autotest: '/device/autotest',
  },
  contact: {
    add: '/contact/add',
    delete: '/contact/delete',
    modify: '/contact/modify',
    getLocal: '/contact/search',
    getRemote: '/contact/remote_search',
    getRemoteCompany: '/contact/remote_company',
  },
  tool: {
    playRing: '/tool/play_ring',
    privateCode: '/tool/private_code',
    rmu: '/tool/rmu',
  },
};

export default GlobalConfig;
