
import React from 'react';
import { Button, Result } from 'antd';
import { CommsayContext, useArrayContext, useMethodNameContext } from '../core/context';
import { InitListener } from '../core/listener';

interface InitDomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: () => any;
}

export const InitializeDom = ({ callback }: InitDomProps) => {
  const [isSubmit, setubmit] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const commsayContext = React.useContext(CommsayContext);
  const { dispatch } = useArrayContext();
  const { name } = useMethodNameContext();

  const handleSubmit = () => {
    setubmit(true)
    const result = callback();
    dispatch({ type: 'ADD', item: { name, result: { code: 0 } } });
    if (!result?.connect) {
      setErrMsg(String(result));
      return;
    }
    commsayContext?.setCommsay(result);
    // 注册监听
    InitListener(result, dispatch);
  };

  return (
    <div className="container">
      <div className='submit'>
        <Button type='primary' onClick={handleSubmit}>运行代码</Button>
      </div>
      <div className='view'>
        {isSubmit && <Result
          className='result'
          status={errMsg? 'error': 'success'}
          title={errMsg? '初始化失败': '初始化成功'}
          subTitle={errMsg? errMsg: ''}
        />}
      </div>
    </div>
  )
}

export const InitializeCode = `
// 初始化
const params = {
    appkey: '8w7jv4q77xuyy',
    naviServerURL: 'https://nav-cmsyqa.rongcloud.net',
    modules: [
      GroupChannelModule.setup(),
      OpenChannelModule.setup(),
    ]
}

const handleInit = () => {
    try {
        return CommsayChat.initialize(params);
    } catch (err) {
        return err;
    }
};

render(<InitializeDom
    callback={handleInit}
/>);
`

export default {
  InitializeCode
}