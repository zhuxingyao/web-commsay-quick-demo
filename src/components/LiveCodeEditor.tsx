import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as RongIMLib from '@rongcloud/imlib-next';
import CommsayChat from '@commsay/chat';
import { GroupChannel, GroupChannelModule } from '@commsay/chat/group-channel';
import { OpenChannel, OpenChannelModule } from '@commsay/chat/open-channel';
import { Button, Input, Divider } from 'antd';
import { themes } from 'prism-react-renderer';

import '../styles/components/LiveCodeEditor.css';

import { InitializeDom, InitializeCode } from './Initialize'
import { ConnectDom } from './Connect';

import React from 'react';
import { CodeContext, CommsayProvider, CommsayContext } from '../core/context';
import { RenderResult } from './RenderResult';


/**
 * React-Live 组件渲染
 * @returns 
 */
const InitLiveCode = () => {
  const commsayContext = React.useContext(CommsayContext)
  // React-live 的作用域
  const scope = {
    Button,
    RongIMLib,
    Input,
    Divider,
    CommsayChat,
    GroupChannel,
    GroupChannelModule,
    OpenChannelModule,
    OpenChannel,
    commsay: commsayContext?.commsay,
    InitializeDom,
    ConnectDom,
    RenderResult,
  }
  const code = React.useContext(CodeContext) || InitializeCode;
  return (
    <CommsayProvider>
      <LiveProvider code={code} scope={ scope } noInline theme={themes.vsDark}>
        <div className="live-provider">
          <div className='live-editor-container'>
            <LiveEditor className="live-editor" />
          </div>
          <LivePreview className="live-preview" />
        </div>
        <LiveError className="live-error" />
      </LiveProvider>
    </CommsayProvider>
  );
}

export {
  InitLiveCode,
};
