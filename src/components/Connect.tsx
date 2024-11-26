
import React from 'react';
import { Button, Result } from 'antd';
import { CMSYResult } from '@commsay/chat';
import { CommsayContext, useArrayContext, useMethodNameContext  } from '../core/context';

interface InitDomProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (commsay: any) => Promise<CMSYResult<{ id: string; userName?: string | undefined; portraitUrl?: string | undefined; }>>;
}

export const ConnectDom = ({ callback }: InitDomProps) => {
  const [isSubmit, setubmit] = React.useState(false);
  const [connectCode, setConnectCode] = React.useState(0);
  const [userId, setUserId] = React.useState('');
  const commsayContext = React.useContext(CommsayContext);
  const { dispatch } = useArrayContext();
  const { name } = useMethodNameContext();

  const handleSubmit = async() => {
    if (!commsayContext?.commsay) return console.log('commsay is not ready');;
    const { code, data } = await callback(commsayContext?.commsay);

    dispatch({ type: 'ADD', item: { name, result: { code, data } } });
    setubmit(true);
    setConnectCode(code);
    if (code === 0 && data?.id) {
      setUserId(data.id)
    }
    console.log('res ===>', code, data);
  };

  return (
    <div className="container">
      <div className='submit'>
        <Button type='primary' onClick={handleSubmit}>运行代码</Button>
      </div>
      <div className='view'>
        {isSubmit && <Result
          className='result'
          status={connectCode !== 0? 'error': 'success'}
          title={connectCode !== 0? '连接失败': '连接成功'}
          subTitle={connectCode !== 0? `失败错误码：${connectCode}`: `用户 id：${userId} `}
        />}
        {!commsayContext?.commsay && <Result
          className='result'
          status='error'
          title='请先初始化'
        />}
      </div>
        
    </div>
  )
}

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

render(<ConnectDom
    callback={handleConnect}
/>);
`