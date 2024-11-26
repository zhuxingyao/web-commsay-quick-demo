import React from 'react';
import { Collapse, Button, notification } from 'antd';
import ReactJson from 'react-json-view';
import { useArrayContext } from '../core/context';

const App: React.FC = () => {
  const { state } = useArrayContext();
  const [api, contextHolder] = notification.useNotification();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openNotification = (data: { title: string; content: any }) => {

    api.info({
      message: `${data.title}`,
      description: <ReactJson displayDataTypes={false} src={JSON.parse(JSON.stringify(data.content))}></ReactJson>,
      placement: 'bottomRight',
      // duration: null,
    });
  };
  

  return <div className='records-container'>
    {contextHolder}
    {state.length > 0 && <Collapse style={{ fontSize: '12px'}} bordered={false} size="small" items={state.map((item, index) => {
    return {
      key: `${index}`,
      label: item.name,
      children: <Button onClick={() => openNotification({ title: item.name, content: item.result })} size="small" color="default" style={{ fontSize: '12px'}} variant="solid">查看详情</Button>
    }
  })} />}
  </div>;
};

export default App;