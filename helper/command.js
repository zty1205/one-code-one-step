function classCommand(cmds, args) {
  let classFunc = cmds[0];
  let arg1 = args[0];
  const instance = new window[classFunc](...arg1);
  for (let i = 1; i < cmds.length; i++) {
    let cmd = cmds[i];
    let arg = args[i];
    let res = instance[cmd].apply(instance, arg);
    console.log(`${cmd}, ${arg} : `, res);
  }
  return instance;
}
