import './App.css'
import Menu from './components/Menu';
import { InitLiveCode } from './components/LiveCodeEditor';
import { CodeContext, ArrayProvider, MethodNameProvider } from './core/context';
import React from 'react';
import Init from './components/Initialize';
import Records  from './components/Records'
import codeData from './core/code';

import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';

function App() {
  const [code, setCode] = React.useState<string>('');
  const handleCallback = (key: string) => {
    if (key === 'InitializeCode') {
      setCode(Init['InitializeCode'])
    } else if (key in codeData) {
      setCode(codeData[key as keyof typeof codeData]);
    } else {
      setCode(Init['InitializeCode'])
    }

  };

  return (
    <Provider store={store}>
      <Header></Header>
      <div className='main'>
        
        <MethodNameProvider>
          <ArrayProvider>
            <CodeContext.Provider value={code}>
              <Menu callback={handleCallback} />
              <div className='content'>
                <InitLiveCode />
                <div className='records'>
                  <Records />
                </div>
              </div>
            </CodeContext.Provider>
          </ArrayProvider>
        </MethodNameProvider>
        
      </div>
    </Provider>
  )
}

export default App
