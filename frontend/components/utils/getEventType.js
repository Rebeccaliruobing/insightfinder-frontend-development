export const EventTypes = {
  General: 'general',
  Network: 'network',
  Disk: 'disk',
  Workload: 'workload',
  NewInstance: 'new_instance',
  InstanceDown: 'instance_down',
  HighCPU: 'high_cpu',
  Others: 'others',
};

export const getEventType = (text) => {
  text = text.toLowerCase();

  if (text.indexOf('- network') >= 0) {
    return EventTypes.Network;
  }
  if (text.indexOf('- disk') >= 0) {
    return EventTypes.Disk;
  }
  if (text.indexOf('- workload') >= 0) {
    return EventTypes.Workload;
  }
  if (text.indexOf('- new instance') >= 0) {
    return EventTypes.NewInstance;
  }
  if (text.indexOf('- instance down') >= 0) {
    return EventTypes.InstanceDown;
  }
  if (text.indexOf('- high cpu') >= 0) {
    return EventTypes.HighCPU;
  }
  if (text === 'others') {
    return EventTypes.Others;
  }

  return EventTypes.General;
};
