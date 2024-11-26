import { ConnectionHandler } from '@commsay/chat';
import { OpenChannelHandler } from '@commsay/chat/open-channel';
import {
  GroupSubchannelHandler, GroupChannelHandler,
} from '@commsay/chat/group-channel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InitListener = (commsay: any, dispatch: any) => {

  if (!commsay) return null;
  // 初始化连接监听
  const connectHandler = new ConnectionHandler({
    onConnected: () => {
      dispatch({ type: 'ADD', item: { name: 'onConnected', result: { title: '连接成功' }}})
    },

    onConnecting: () => {
      dispatch({ type: 'ADD', item: { name: 'onConnecting', result: { title: '连接中' }}})
    },

    onDisconnected: (code) => {
      dispatch({ type: 'ADD', item: { name: 'onDisconnected', result: { code, title: '连接端口' }}})
    },

    onSuspended(code) {
      dispatch({ type: 'ADD', item: { name: 'onSuspended', result: { code, title: '尝试重新连接...' }}})
    },
  });
  commsay.addConnectionHandler('uniqueId', connectHandler);

  const openChannelHandler = new OpenChannelHandler({
    onMessageReceived(channel, messages) {
      dispatch({ 
        type: 'ADD', 
        item: { 
          name: `OC(${channel.id}) 收到 ${messages.length} 条新消息`, 
          result: { channel, messages } 
        } 
      })
    },
    onChannelUpdated(channel) {
      dispatch({ 
        type: 'ADD', 
        item: { 
          name: `OC(${channel.id}) 已更新`, 
          result: channel
        } 
      })
    },
    onChannelDeleted(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 已被删除`,
          result: channel
        }
      });
    },
    onUsersEntered(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 已加入`,
          result: {
            channel,
            members
          }
        }
      });
    },
    onUsersExited(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人退出`,
          result: {
            channel,
            users,
          },
        }
      });
    },
    onChannelFrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 已冻结`,
          result: {
            channel,
          },
        }
      });
    },
    onChannelUnfrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 已解除冻结`,
          result: channel,
        }
      });
    },
    onUsersBanned(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被封禁`,
          result: {
            channel,
            users,
          },
        }
      });
    },
    onUsersUnbanned(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被解封`,
          result: {
            channel,
            users,
          },
        }
      })
    },
    onUsersAddedToFrozenAllowList(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被加入冻结名单`,
          result: {
            channel,
            users,
          },
        }
      });
    },
    onUsersRemovedFromFrozenAllowList(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被移出冻结名单`,
          result: {
            channel,
            users,
          }
        }
      });
    },
    onUsersMuted(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被禁言`,
          result: {
            channel,
            users,
          }
        }
      });
    },
    onUsersUnmuted(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 有 ${users.length} 人被解除禁言`,
          result: {
            channel,
            users,
          }
        }
      });
    },
    onMetadataSynced(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 元数据同步完成`,
          result: {
            channel,
          }
        }
      });
    },
    onMetadataUpdated(channel, metadata) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 元数据更新`,
          result: {
            channel,
            metadata: metadata
          }
        }
      });
    },
    onMetadataDeleted(channel, keys) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 元数据被删除`,
          result: {
            channel,
            keys,
          }
        }
      });
    },
    onReenteredFail(channel, code) {
      dispatch({
        type: 'ADD',
        item: {
          name: `OC(${channel.id}) 重新加入失败`,
          result: {
            channel,
            code,
          }
        }
      });
    }
  });
  commsay.openChannel.addOpenChannelHandler('uniqueId', openChannelHandler);

  const subchannelHandler = new GroupSubchannelHandler({
    onMessageReceived(channel, messages) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})收到 ${messages.length} 条新消息`,
          result: {
            channel,
            messages,
          }
        }
      });
    },
    onMessageUpdated(channel, message) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})收到消息变更`,
          result: {
            channel,
            message,
          }
        }
      });
    },
    onMessageBlocked(channel, reviewInfo) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})收到消息拦截`,
          result: {
            channel,
            reviewInfo,
          }
        }
      });
    },
    onTypingStatusUpdated(channel, typingUsers) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})有 ${typingUsers.length} 人正在输入`,
          result: {
            channel,
            typingUsers,
          }
        }
      });
    },
    onMessageDeleted(channel, message) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})有消息被删除`,
          result: {
            channel,
            message,
          }
        }
      });
    },
    onMessageMetaUpdated(channel, message) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})有消息元数据变更`,
          result: {
            channel,
            message,
          }
        }
      });
    },
    onChannelCreated(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})已创建`,
          result: {
            channel,
          }
        }
      });
    },
    onChannelUpdated(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})已更新`,
          result: {
            channel,
          }
        },
      });
    },
    onChannelDeleted(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})被删除`,
          result: {
            channel,
          }
        }
      });
    },
    onAddMembers(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 新加入 ${members.length} 人`,
          result: {
            channel,
            members,
          }
        }
      });
    },
    onRemoveMembers(channel, userIds) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 移除 ${userIds.length} 人`,
          result: {
            channel,
            userIds,
          }
        }
      });
    },
    onChannelFrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})已冻结`,
          result: {
            channel,
          }
        }
      });
    },
    onChannelUnfrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id})已解除冻结`,
          result: {
            channel,
          }
        }
      });
    },
    onUsersMuted(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 用户被禁言`,
          result: {
            members
          }
        }
      });
    },
    onUsersUnmuted(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 用户解除禁言`,
          result: {
            members
          }
        }
      });
    },
    onUsersAddedToFrozenAllowList(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 用户加入冻结白名单`,
          result: {
            members
          }
        }
      });
    },
    onUsersRemovedFromFrozenAllowList(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 用户移出冻结白名单`,
          result: {
            members
          }
        }
      });
    },
    onReadStatusUpdated(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GSub(${channel.id} in ${channel.parentChannel.id}) 用户阅读状态更新`,
          result: {
            channel
          }
        }
      });
    },
  });
  commsay.groupChannel.addGroupSubchannelHandler('uniqueId', subchannelHandler);

  const handler: GroupChannelHandler = new GroupChannelHandler({
    onChannelSynced() {
      dispatch({
        type: 'ADD',
        item: {
          name: 'GC 缓存数据同步完成',
          result: {
            code: 0
          }
        },
      });
    },
    onUsersJoined(channel, info) {
      const { members, inviter } = info;
      const len = members.length;
      dispatch({
        type: 'ADD',
        item: {
          name: inviter
          ? `${len} 人被 ${inviter.id} 邀请加入GC(${channel.id})`
          : `GC(${channel.id})有 ${members.length} 人加入`,
          result: {
            channel,
            members,
            inviter
          }
        },
      });
    },
    onUsersLeft(channel, users) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})有 ${users.length} 人退出`,
          result: {
            channel,
            users
          }
        },
      });
    },
    onChannelCreated(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})已创建`,
          result: channel
        }
      });
    },
    onChannelUpdated(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})已更新`,
          result: channel
        }
      });
    },
    onChannelDeleted(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})已删除`,
          result: channel
        }
      });
    },
    onChannelFrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})已冻结`,
          result: channel
        }
      });
    },
    onChannelUnfrozen(channel) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id})已解冻`,
          result: channel
        }
      });
    },
    onUsersMuted(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id}) 用户被禁言`,
          result: members
        },
      });
    },
    onUsersUnmuted(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id}) 用户被解除禁言`,
          result: members
        },
      });
    },
    onUsersAddedToFrozenAllowList(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id}) 用户加入冻结白名单`,
          result: members
        }
      });
    },
    onUsersRemovedFromFrozenAllowList(channel, members) {
      dispatch({
        type: 'ADD',
        item: {
          name: `GC(${channel.id}) 用户移出冻结白名单`,
          result: members
        }
      });
    },
  });
  commsay.groupChannel.addGroupChannelHandler('uniqueId', handler);
};

