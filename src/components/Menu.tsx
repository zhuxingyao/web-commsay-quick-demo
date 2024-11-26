import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useMethodNameContext } from '../core/context';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'Init & Connect',
    label: 'Init&Connec',
    children: [
      { key: 'InitializeCode', label: '初始化' },
      { key: 'ConnectCode', label: '连接' },
    ],
  },
  {
    key: 'Group Channel',
    label: 'Group Channel',
    children: [
      {
        key: 'Channel',
        label: 'Channel',
        children: [
          { key: 'CreateSuperGroupChannel', label: '创建超级群' },
          { key: 'CreateSuperGroupSubChannel', label: '创建超级群子频道' },
          { key: 'GetGroupSubchannelMembers', label: '获取私有频道成员' },
          { key: 'AddMembers', label: '添加私有频道成员' },
          { key: 'RemoveMembers', label: '移除私有频道成员' },
          { key: 'CreateChannelCode', label: '创建 GroupChannel' },
          { key: 'InviteCode', label: '邀请进群' },
          { key: 'JoinChannel', label: '加入群组' },
          { key: 'LeaveChannel', label: '离开群组' },
          { key: 'DeleteChannel', label: '删除群组' },
          { key: 'GetGroupChannelList', label: '获取 GroupChannel 列表' },
          { key: 'getMyGroupSubchannelList', label: '获取 GroupSubchannel 列表' },
          { key: 'GetTotalUnreadMessageCount', label: '获取所有 group 总未读数' },
          { key: 'GetUnreadMessageCount', label: '获取指定 group 总未读数' },
          { key: 'GetSubChannelUnreadMessageCount', label: '获取指定 Subchannel 未读数' },
          { key: 'GetUnreadMentionedMessages', label: '获取 channel 的未读提醒摘要' },
          { key: 'MarkAsRead', label: '清除 channel 未读数' },
          { key: 'GetMyNotificationLevel', label: '获取 channel 免打扰级别' },
          { key: 'SetMyNotificationLevel', label: '设置 channel 免打扰级别' },
          { key: 'QueryGroupSubchannelMemberList', label: '获取 channel 成员列表' },
          { key: 'UpdateGroupChannel', label: '更新 Group Channel' },
          { key: 'UpdateGroupSubchannel', label: '更新 Group SubChannel' },
        ],
      },
      {
        key: 'Message',
        label: 'Message',
        children: [
          { key: 'sendTextMessage', label: '发送文本消息' },
        { key: 'sendFileMessage', label: '发送文件消息' },
        { key: 'sendCustomMessage', label: '发送自定义消息' },
        { key: 'GetPreviousMessageList', label: '获取历史消息' },
        { key: 'GetFirstUnreadMessageInfo', label: '获取第一条未读消息' },
        { key: 'DeleteMessage', label: '消息撤回' },
        { key: 'DeleteUnidirectionalMessages', label: '按消息删除本端消息' },
        { key: 'DeleteUnidirectionalMessagesWithTimestamp', label: '按时间戳删除本端消息' },
        { key: 'UpdateTextMessage', label: '更新消息' },
        ]
      }
    ],
  },
  {
    key: 'Open Channel',
    label: 'Open Channel',
    children: [
      { key: 'CreateOpenChannel', label: '创建 open channel' },
      { key: 'UpdateOpenChannel', label: '更新 open channel' },
      { key: 'enterOpenChannel', label: '加入 open channel' },
      { key: 'exitOpenChannel', label: '退出 open channel' },
      { key: 'deleteOpenChannel', label: '删除 open channel' },
      { key: 'getOpenchannelMembers', label: '获取成员列表' },
      { key: 'setMetaData', label: '设置元数据' },
      { key: 'deleteMetaData', label: '删除元数据' },
      { key: 'getMetaData', label: '获取元数据' },
      { key: 'getAllMetaData', label: '获取所有元数据' },
      { key: 'sendTextMessage2OpenChannel', label: '发送文本消息' },
      { key: 'sendFileMessage2OpenChannel', label: '发送文件消息' },
      { key: 'sendCustomMessage2OpenChannel', label: '发送自定义消息' },
      { key: 'getMessageList2OpenChannel', label: '获取历史消息' },
      { key: 'deleteMessage2OpenChannel', label: '消息撤回' },
    ],
  },
];
interface AppProps {
  callback: (key: string) => void;
}
const App: React.FC<AppProps> = ({callback}) => {
  const { setName } = useMethodNameContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick: MenuProps['onClick'] = (e: any) => {
    console.log('click ', e.domEvent.target.innerText);
    setName(e.domEvent.target.innerText)
    callback(e.key)
  };

  return (
    <div style={{ 
      width: 256,
      overflowY: 'auto',
      padding: '0 10px',
    }}>
      <Menu
        onClick={(item) => onClick(item)}
        defaultSelectedKeys={['InitializeCode']}
        defaultOpenKeys={['Init & Connect']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default App;