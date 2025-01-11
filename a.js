const config = {
  core: {
    bridge: '无',
    fetch: '工厂函数',
    sensor: '基本',
    other: '工具和常量'
  },
  app: {
    bridge: 'uni + app的一些方法',
    fetch: '适配app',
    sensor: '适配app'
  },
  appV: {
    bridge: 'hook',
    建议: '和上门的依赖无关，单独引入，作为一个拓展包或增强包',
    建议2: 'VUE作为预依赖，'
  }
};

// core-e-app
const enhanceHybrid = (hybrid) => {
  const el = {};
  return {
    ...hybrid,
    ...el
  };
};
// gen 返回新的
// ehnance

// core-e-v
const genAppEventHooks = (hybrid) => {
  return {
    registerEvent: () => {},
    useEvent: () => {}
  };
};
