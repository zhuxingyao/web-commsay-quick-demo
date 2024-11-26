
import ReactJson from 'react-json-view';
import React from 'react';
import { Button, Result, Spin } from 'antd';
import { CommsayContext, useArrayContext, useMethodNameContext } from '../core/context';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setUser } from '../store/slices/userSlice';

export interface RenderResultProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: () => Promise<any>;  // 不定数量的回调函数
}
export const RenderResult = (props: RenderResultProps) => {
  const [jsonData, setJsonData] = React.useState< object | undefined>();
  const [isLoading, setLoading] = React.useState(false);
  const commsayContext = React.useContext(CommsayContext);
  const { dispatch } = useArrayContext();
  const dispatchUser = useDispatch<AppDispatch>();
  const { name } = useMethodNameContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCallback = async (callback: (commsayContext: any) => Promise<any>) => {
    if (!commsayContext?.commsay) return console.log('commsay is not ready');
    setLoading(true);
    const result = await callback(commsayContext?.commsay);
    console.log('result ===>', name, result);
    // 设置全局 userId
    if (name === '连接' && result?.data?.id) {
      dispatchUser(setUser({ id: result.data.id }))
    }
    dispatch({ type: 'ADD', item: { name, result } });
    setJsonData(JSON.parse(JSON.stringify(result))); // 存储每个 callback 的结果
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="submit">
        {Object.keys(props).map((key) => (
          <Button
            key={key}
            style={{ marginRight: '10px' }}
            type="primary"
            onClick={() => handleCallback(props[key])}
          >
            运行代码
          </Button>
        ))}
      </div>
      <div className='view'>
        {!commsayContext?.commsay && <Result
          className='result'
          status='error'
          title='请先初始化'
        />}
        {
          isLoading && commsayContext?.commsay && <Spin />
        }
        {
          !isLoading && jsonData && commsayContext?.commsay &&
          <div className='view-result'>
            <ReactJson name='result' displayDataTypes={false} style={{flex: 1, padding: '10px'}} src={jsonData} />
          </div>
        }
      </div>
    </div>
  );
};