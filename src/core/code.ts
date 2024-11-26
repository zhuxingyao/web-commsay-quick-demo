export const ConnectCode = `
// 初始化
const params = {
    token: 'nwP36VzPPMRAKF9OPWHH6GT5pVJE+PemCg3AAXdOuRDJ7wgRseLMaEw6DV2jP2X1kO3DiDd9f0K8ivbn/cHpgQ==',
    userId: '211224',
}

const handleConnect = async(commsay) => {
    console.log('commsay ===>', commsay);  
    const result = await commsay.connect(params);
    console.log('connect result', result);
    return result;
};

render(<RenderResult
    callback={handleConnect}
/>);
`

//#region 超级群
/**
 * 创建超级群频道
 */
export const CreateSuperGroupChannel = `
// 创建 GroupChannel 
const paramsGroup = {
  id: 'SUPER_CHANNEL_ID',
  name: 'SUPER_CHANNEL_ID',
  isSuper: true,
  defaultSubchannelName: 'SUB_NAME',
};

const createSuperGroupChannel = async(commsay) => {
    console.log('commsay', commsay);
    const { groupChannel } = commsay;
    const result = await groupChannel.create(paramsGroup);
    console.log('SuperGroupChannel result', result);
    return result;
};

render(<RenderResult
    GroupChannel={createSuperGroupChannel}
/>);
`
/**
 * 创建子频道
 */
export const CreateSuperGroupSubChannel = `
// 创建 GroupChannel 
const params = {
  subchannelId: 'SUB_CHANNEL_ID',
  subchannelName: 'SUB_CHANNEL_ID',
  subchannelType: 0,
};

const createSuperGroupSubChannel = async(commsay) => {
    const { groupChannel } = commsay;
    const channel = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    if (channel.code !== 0 || !channel.data) return channel;

    const result = await channel.data.createSubchannel(params);
    console.log('CreateSuperGroupSubChannel result', result);
    return result;
};

render(<RenderResult
    GroupChannel={createSuperGroupSubChannel}
/>);
`
/**
 * 获取 SuperGroupSubchannel 成员列表
 */
export const GetGroupSubchannelMembers = `
const limit = 20;
const handleGetGroupSubchannelMembers = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('SUB_CHANNEL_ID_1');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const queryObj = channel.createMemberListQuery({ limit });
    const result = await queryObj.loadNextPage();
    console.log('getGroupSubchannelMembers result', result);
    return result;
}

render(<RenderResult
    callback={handleGetGroupSubchannelMembers}
/>);
`
/**
 * 添加私有子频道成员
 */
export const AddMembers = `
const userIds = ['211225', '211222']
const handleAddMembers = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('SUB_CHANNEL_ID_1');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.addMembers(userIds);
    console.log('addMembers result', result);
    return result;
}

render(<RenderResult
    callback={handleAddMembers}
/>);
`
/**
 * 移除私有子频道成员
 */
export const RemoveMembers = `
const userIds = ['211225']
const handleRmoveMembers = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('SUB_CHANNEL_ID_1');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.removeMembers(userIds);
    console.log('removeMembers result', result);
    return result;
}

render(<RenderResult
    callback={handleRmoveMembers}
/>);
`
/**
 * 获取本地指定超级群下的子频道列表
 */
export const getMyGroupSubchannelList = `
const params = {
    subchannelTypeFilter: 0,
    isUnreadOnly: false,
};
const handleGetMyGroupSubchannelList = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const query = channel.createMyGroupSubchannelListQuery(params);
    const result = await query.loadNextPage();
    console.log('getMyGroupSubchannelList result', result);
    return result;
}

render(<RenderResult
    callback={handleGetMyGroupSubchannelList}
/>);
`
//#endregion

//#region open channel
/**
 * 创建频道
 */
export const CreateOpenChannel = `
// 创建 OpenChannel
const paramsOpen = {
  id: 'OPEN_CHANNEL_ID',
  name: 'OPEN_CHANNEL_ID',
  destroyType: 0,
  survivalTime: 60, // 单位为分钟，仅当 destroyType 为 1 时有效
};

const createOpenChannel= async(commsay) => {
    const { openChannel } = commsay; 
    const result = await await openChannel.create(paramsOpen);
    console.log('OpenChannel result', result);
    return result;
};

render(<RenderResult
    OpenChannel={createOpenChannel}
/>);
`
/**
 * 更新 Open Channel
 */
export const UpdateOpenChannel = `
const params = {
    name: 'new name',
    destroyType: 1,
    survivalTime: 60,
};
const handleUpdateOpenChannel = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = channel.update(params);
    console.log('updateGroupChannel result', result);
    return result;
}

render(<RenderResult
    callback={handleUpdateOpenChannel}
/>)`

/**
 * 进入 Open Channel
 */
export const enterOpenChannel = `
const handleEnterOpenChannel = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = channel.enter();
    console.log('enterOpenChannel result', result);
    return result;
}

render(<RenderResult
    callback={handleEnterOpenChannel}
/>)`
/**
 * 退出 Open Channel
 */
export const exitOpenChannel = `
const handleExitOpenChannel = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = channel.exit();
    console.log('handleExitOpenChannel result', result);
    return result;
}

render(<RenderResult
    callback={handleExitOpenChannel}
/>)`

/**
 * 获取 openchannel 成员列表
 */
export const getOpenchannelMembers = `
const params = {
    limit: 20,
    reverse: false,
};
const handleGetOpenchannelMembers = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const queryObj = channel.createMemberListQuery(params);
    const result = await queryObj.loadNextPage();
    console.log('getOpenchannelMembers result', result);
    return result;
}

render(<RenderResult
    callback={handleGetOpenchannelMembers}
/>);
`
/**
 * 设置 openchannel kv
 */
export const setMetaData = `
const metadata = {
  key: 'value'
}
const params = {
  metadata,
}
const handleSetMetaData = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.setMetadata(params)
    console.log('setMetaData result', result);
    return result;
}

render(<RenderResult
    callback={handleSetMetaData}
/>);
`
/**
 * 删除 openchannel kv
 */
export const deleteMetaData = `
const keys = ['key1'];
const params = {
  metaDataKeys: keys,
}
const handleDeleteMetaData = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.deleteMetadata(params)
    console.log('deleteMetaData result', result);
    return result;
}

render(<RenderResult
    callback={handleDeleteMetaData}
/>);
`
/**
 * 获取指定 openchannel kv
 */
export const getMetaData = `
const keys = ['key1'];
const handleGetMetaData = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.getMetadata(keys)
    console.log('getMetaData result', result);
    return result;
}

render(<RenderResult
    callback={handleGetMetaData}
/>);
`
/**
 * 获取所有 openchannel kv
 */
export const getAllMetaData = `
const handleGetAllMetaData = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.getAllMetadata()
    console.log('getAllMetaData result', result);
    return result;
}

render(<RenderResult
    callback={handleGetAllMetaData}
/>);
`
/**
 * 删除 openchannel
 */
export const deleteOpenChannel = `
const handleDeleteChannel = async (commsay) => {
    const { openChannel } = commsay;
    const res = await openChannel.getChannel('OPEN_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.delete();
    console.log('delete result', result);
    return result;
}

render(<RenderResult
    callback={handleDeleteChannel}
/>);
`
/** 
 * 发送 open channel 文本消息
 */
export const sendTextMessage2OpenChannel = `
const handleSendTextMessage = async (commsay) => {
  const { openChannel } = commsay;
  const res = await openChannel.getChannel('OPEN_CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const channel = res.data;
  return new Promise((resolve, reject) => {
    const params = {
      content: 'TEXT_CONTENT',
    }

    channel.sendTextMessage(params)
      .onPending((message) => {
        console.log('send text message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send text message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send text message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendTextMessage}
/>);
`
/** 
 * 发送 open channel 文件消息
 */
export const sendFileMessage2OpenChannel = `
const handleSendFileMessage = async (commsay) => {
  const { openChannel } = commsay;
  const res = await openChannel.getChannel('OPEN_CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const channel = res.data;
  return new Promise((resolve, reject) => {
    const params = {
      file: 'file url'
    }

    channel.sendFileMessage(params)
      .onProgress((loaded, total, message) => {
        console.log('onProgress', loaded, total, message);
      })
      .onPending((message) => {
        console.log('send file message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send file message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send file message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendFileMessage}
/>);
`
/** 
 * 发送 open channel 自定义消息
 */
export const sendCustomMessage2OpenChannel = `
const handleSendCustomMessage = async (commsay) => {

  const { openChannel } = commsay;
  const res = await openChannel.getChannel('OPEN_CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const channel = res.data;
  return new Promise((resolve, reject) => {
    const params = {
      metadata: { key: 'value' },
      customType: 'customType',
      policy: 0,
    }

    channel.sendCustomMessage(params)
      .onPending((message) => {
        console.log('send custom message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send custom message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send custom message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendCustomMessage}
/>);
`
/**
 * 获取 open channel 历史消息
 */
export const getMessageList2OpenChannel = `  
const params = {
  messageTimestampTo: 0,
  limit: 20,
  reverse: false
}
const handleGetPreviousMessageList = async (commsay) => {
  const { openChannel } = commsay;
  const res = await openChannel.getChannel('OPEN_CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const channel = res.data;
  const query = await channel.createPreviousMessageListQuery(params)
  if (!query.loadNextPage) return query;

  const result = await query.loadNextPage();
  console.log('get previous message list', result);
  return result;
}

render(<RenderResult
    callback={handleGetPreviousMessageList}
/>);
`

/**
 * open channel 消息撤回
 */
// export const deleteMessage2OpenChannel = `
// const handleDeleteMessage = async (commsay) => {
//   const message = {
//     UId: '',
//     createdAt: '',
//   }
//   const { openChannel } = commsay;
//   const res = await openChannel.getChannel('OPEN_CHANNEL_ID');
//   console.log('get channel result', res);
//   if (res.code !== 0 || !res.data) return res;

//   const channel = res.data;
//   const result = await channel.deleteMessage(message)
//   return result;
// }

// render(<RenderResult
//     callback={handleDeleteMessage}
// />);
// `

//#endregion

//#region 频道相关
/**
 * 创建频道
 */
export const CreateChannelCode = `
// 创建 GroupChannel 
const paramsGroup = {
  id: 'CHANNEL_ID',
  name: 'NAME'
};

const createGroupChannel = async(commsay) => {
    console.log('commsay', commsay);
    const { groupChannel } = commsay;
    const result = await groupChannel.create(paramsGroup);
    console.log('groupChannel result', result);
    return result;
};

render(<RenderResult
    GroupChannel={createGroupChannel}
/>);
`
/**
 * 邀请用户
 */
export const InviteCode = `
// 邀请用户
const params = {
  userIds: ["John", "Brandon", "Harry", "Jay"]
}

const handleInvite = async(commsay) => {
    const { groupChannel } = commsay;
    const channel = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', channel);
    if (channel.code !== 0 || !channel.data) return channel;

    const { data } = channel;
    const result = await data.invite(params);
    console.log('invite result', result);
    return result;
};

render(<RenderResult
    callback={handleInvite}
/>);
`
/**
 * 加入 channel
 */
export const JoinChannel = `
const handleJoin = async(commsay) => {
    const { groupChannel } = commsay;
    const channel = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', channel);
    if (channel.code !== 0 || !channel.data) return channel;

    const { data } = channel;
    const result = await data.join();
    console.log('join result', result);
    return result;
};

render(<RenderResult
    callback={handleJoin}
/>);
`
/**
 * 离开 channel
 */
export const LeaveChannel = `
const handleLeave = async(commsay) => {
    const { groupChannel } = commsay;
    const channel = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', channel);
    if (channel.code !== 0 || !channel.data) return channel;

    const { data } = channel;
    const result = await data.leave();
    console.log('leave result', result);
    return result;
};

render(<RenderResult
    callback={handleLeave}
/>);
`
/**
 * 获取 GroupChannel 列表
 */
export const GetGroupChannelList = `
const params = {
  orderType : 0,
  limit: 20,
  isUnreadOnly: false
}
const handleGetGroupChannelList = async (commsay) => {
    const { groupChannel } = commsay;
    const query = groupChannel.createMyGroupChannelListQuery(params);
    if (!query.loadNextPage) return query;

    const result = await query.loadNextPage();
    console.log('get group channel list', result);
    return result;
};

render(<RenderResult
    callback={handleGetGroupChannelList}
/>);
`
/**
 * 获取所有 groupchannel 的未读总数
 */
export const GetTotalUnreadMessageCount = `
const params = {
    isMentionedOnly: false
}
const handleGetTotalUnreadMessageCount = async (commsay) => {
    const { groupChannel } = commsay;
    const result = await groupChannel.getTotalUnreadMessageCount(params);
    console.log('getTotalUnreadMessageCount result', result);
    return result;
}

render(<RenderResult
    callback={handleGetTotalUnreadMessageCount}
/>);
`
/**
 * 获取指定 groupchannel 的未读总数
 */
export const GetUnreadMessageCount = `
const params = {
    isMentionedOnly: false
}
const handleGetUnreadMessageCount = async (commsay) => {
    const { groupChannel } = commsay;
    const channel = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', channel);
    if (channel.code !== 0 || !channel.data) return channel;

    const { data } = channel;
    const result = await data.getUnreadMessageCount(params);
    console.log('getUnreadMessageCount result', result);
    return result;
}

render(<RenderResult
    callback={handleGetUnreadMessageCount}
/>);
`
/**
 * 获取指定 Subchannel 未读数
 */
export const GetSubChannelUnreadMessageCount = `
const params = {
    isMentionedOnly: false
}
const handleGetSubChannelUnreadMessageCount = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('CMSYDefault');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.getSubChannelUnreadMessageCount(params);
    console.log('getSubChannelUnreadMessageCount result', result);
    return result;
}

render(<RenderResult
    callback={handleGetSubChannelUnreadMessageCount}
/>);
`
/**
 * 获取指定 groupchannel 的未读提醒消息摘要
 */
export const GetUnreadMentionedMessages = `
const params = {
    createdAt: 0,
    limit: 20
}
const handleGetUnreadMentionedMessages = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('CMSYDefault');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.getUnreadMentionedMessages(params);
    console.log('getUnreadMentionedMessages result', result);
    return result;
}

render(<RenderResult
    callback={handleGetUnreadMentionedMessages}
/>);
`
/**
 * 清除 channel 未读数
 */
export const MarkAsRead = `
const handleMarkAsRead = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('CMSYDefault');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.markAsRead();
    console.log('markAsRead result', result);
    return result;
}

render(<RenderResult
    callback={handleMarkAsRead}
/>);
`

/**
 * 获取指定 group subchannel 免打扰级别
 */
export const GetMyNotificationLevel = `
const handleGetMyNotificationLevel = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('CMSYDefault');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.getMyNotificationLevel();
    console.log('getMyNotificationLevel result', result);
    return result;
}

render(<RenderResult
    callback={handleGetMyNotificationLevel}
/>);
`
/**
 * 设置指定 group subchannel 免打扰级别
 */
export const SetMyNotificationLevel = `
const level = 1;
const handleSetMyNotificationLevel = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;
    const res2 = await res.data.getSubchannel('CMSYDefault');
    console.log('get subchannel', res2);
    if (res2.code !== 0 || !res2.data) return res2;

    const channel = res2.data;
    const result = await channel.setMyNotificationLevel(level);
    console.log('setMyNotificationLevel result', result);
    return result;
}

render(<RenderResult
    callback={handleSetMyNotificationLevel}
/>);
`
/**
 * 获取 GroupSubchannel 成员列表
 */
export const QueryGroupSubchannelMemberList = `
const limit = 20;
const handleGetMemberList = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const queryObj = await channel.createMemberListQuery({limit});
    console.log('get queryObj', queryObj);
    if (!queryObj || !queryObj.loadNextPage) return queryObj;
    const result = await queryObj.loadNextPage();
    console.log('query result', result);
    return result;
}

render(<RenderResult
    callback={handleGetMemberList}
/>);
`
/**
 * 删除 Groupchannel
 */
export const DeleteChannel = `
const handleDeleteChannel = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = await channel.delete();
    console.log('delete result', result);
    return result;
}

render(<RenderResult
    callback={handleDeleteChannel}
/>);
`
/**
 * 更新 Group Channel
 */
export const UpdateGroupChannel = `
const params = {
    name: 'new name',
};
const handleUpdateGroupChannel = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = channel.update(params);
    console.log('updateGroupChannel result', result);
    return result;
}

render(<RenderResult
    callback={handleUpdateGroupChannel}
/>);
`
/**
 * 更新 Group SubChannel
 */
export const UpdateGroupSubchannel = `
const params = {
    subchannelId: 'SUB_CHANNEL_ID',
    subchannelName: 'new name',
};
const handleUpdateGroupSubchannel = async (commsay) => {
    const { groupChannel } = commsay;
    const res = await groupChannel.getChannel('SUPER_CHANNEL_ID')
    console.log('get channel result', res);
    if (res.code !== 0 || !res.data) return res;

    const channel = res.data;
    const result = channel.updateSubchannel(params);
    console.log('updateGroupSubchannel result', result);
    return result;
}

render(<RenderResult
    callback={handleUpdateGroupSubchannel}
/>);
`
//#endregion

//#region 消息相关
/** 
 * 发送文本消息
 */
export const sendTextMessage = `
const handleSendTextMessage = async (commsay) => {
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  return new Promise((resolve, reject) => {
    const params = {
      content: 'TEXT_CONTENT',
      mentionedUserIds: [],
      mentionType: 1,
      mentionedMessage: '@all',
      directedUserIds: []
    }

    channel.sendTextMessage(params)
      .onPending((message) => {
        console.log('send text message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send text message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send text message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendTextMessage}
/>);
`
/** 
 * 发送文件消息
 */
export const sendFileMessage = `
const handleSendFileMessage = async (commsay) => {
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  return new Promise((resolve, reject) => {
    const params = {
      file: 'file url'
    }

    channel.sendFileMessage(params)
      .onProgress((loaded, total, message) => {
        console.log('onProgress', loaded, total, message);
      })
      .onPending((message) => {
        console.log('send file message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send file message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send file message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendFileMessage}
/>);
`
/** 
 * 发送自定义消息
 */
export const sendCustomMessage = `
const handleSendCustomMessage = async (commsay) => {
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  return new Promise((resolve, reject) => {
    const params = {
      metadata: { key: 'value' },
      customType: 'customType',
      policy: 0,
    }

    channel.sendCustomMessage(params)
      .onPending((message) => {
        console.log('send custom message pending', message);
      })
      .onSucceeded((message) => {
        console.log('send custom message succeed', message);
        resolve(message);
      })
      .onFailed((code, data) => {
        console.log('send custom message fail', code, data);
        resolve({code, data});
      })
  });
}

render(<RenderResult
    callback={handleSendCustomMessage}
/>);
`
/**
 * 获取频道历史消息
 */
export const GetPreviousMessageList = `
const params = {
  messageTimestampTo: 0,
  limit: 20,
  reverse: false
}
const handleGetPreviousMessageList = async (commsay) => {

  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const query = await channel.createPreviousMessageListQuery(params)
  if (!query.loadNextPage) return query;

  const result = await query.loadNextPage();
  console.log('get previous message list', result);
  return result;
}

render(<RenderResult
    callback={handleGetPreviousMessageList}
/>);
`

/**
 * 获取会话中第一条未读消息
 */
export const GetFirstUnreadMessageInfo = `
const handleGetFirstUnreadMessageInfo = async (commsay) => {

  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const result = await channel.getFirstUnreadMessageInfo()
  return result;
}

render(<RenderResult
    callback={handleGetFirstUnreadMessageInfo}
/>);
`

/**
 * 消息撤回
 */
export const DeleteMessage = `
const handleDeleteMessage = async (commsay) => {
  const message = {
    UId: '',
    createdAt: '',
  }
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const result = await channel.deleteMessage(message)
  return result;
}

render(<RenderResult
    callback={handleDeleteMessage}
/>);
`

/**
 * 按消息删除本端消息
 */
export const DeleteUnidirectionalMessages = `
const handleDeleteMessages = async (commsay) => {
  const message = [{
    UId: '',
    createdAt: '',
    senderUserId: '',
  }]
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const result = await channel.deleteUnidirectionalMessages(message)
  return result;
}

render(<RenderResult
    callback={handleDeleteMessages}
/>);
`

/**
 * 按时间戳删除本端消息
 */
export const DeleteUnidirectionalMessagesWithTimestamp = `
const handleDeleteMessagesWithTimestamp = async (commsay) => {
  const timestamp = 0
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const result = await channel.deleteUnidirectionalMessagesWithTimestamp(timestamp)
  return result;
}

render(<RenderResult
    callback={handleDeleteMessagesWithTimestamp}
/>);
`

/**
 * 更新消息
 */
export const UpdateTextMessage = `
const handleUpdateTextMessage = async (commsay) => {
  const { groupChannel } = commsay;
  const res = await groupChannel.getChannel('CHANNEL_ID');
  console.log('get channel result', res);
  if (res.code !== 0 || !res.data) return res;

  const res2 = await res.data.getSubchannel('CMSYDefault');
  console.log('get subchannel', res2);
  if (res2.code !== 0 || !res2.data) return res2;

  const channel = res2.data;
  const message = {
    UId: '',
    channelId: 'CMSYDefault',
    channelType: 1,
  }
  const option = {
    content: '',
    data: '',
  }
  const result = await channel.updateTextMessage(message, option)
  return result;
}

render(<RenderResult
    callback={handleUpdateTextMessage}
/>);
`
//#endregion


export default { 
  ConnectCode,
  CreateChannelCode, InviteCode, GetGroupChannelList,
  sendTextMessage, sendFileMessage, sendCustomMessage,
  GetPreviousMessageList, GetFirstUnreadMessageInfo, DeleteMessage,
  DeleteUnidirectionalMessages, DeleteUnidirectionalMessagesWithTimestamp,
  UpdateTextMessage, GetTotalUnreadMessageCount, GetUnreadMessageCount,
  GetUnreadMentionedMessages, MarkAsRead, GetMyNotificationLevel, SetMyNotificationLevel,
  JoinChannel, LeaveChannel, QueryGroupSubchannelMemberList, DeleteChannel,
  CreateSuperGroupChannel, CreateSuperGroupSubChannel, CreateOpenChannel,
  GetGroupSubchannelMembers, AddMembers, RemoveMembers, getMyGroupSubchannelList,
  UpdateGroupChannel, UpdateGroupSubchannel, GetSubChannelUnreadMessageCount, UpdateOpenChannel, enterOpenChannel, exitOpenChannel, getOpenchannelMembers, setMetaData, deleteMetaData, getMetaData, getAllMetaData, deleteOpenChannel, sendTextMessage2OpenChannel, sendFileMessage2OpenChannel, sendCustomMessage2OpenChannel, getMessageList2OpenChannel
}