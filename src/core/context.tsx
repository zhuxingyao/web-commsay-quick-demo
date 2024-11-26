import React, { createContext, useState, useReducer, useContext } from 'react';
import { CommsayChatWith } from '@commsay/chat';
import { GroupChannelModuleBuilder } from '@commsay/chat/group-channel';
import { OpenChannelModuleBuilder } from '@commsay/chat/open-channel';

export const CodeContext = createContext('');

export const CommsayContext = createContext<{
  commsay: null | CommsayChatWith<[GroupChannelModuleBuilder, OpenChannelModuleBuilder]>;
  setCommsay: React.Dispatch<React.SetStateAction<null | CommsayChatWith<[GroupChannelModuleBuilder, OpenChannelModuleBuilder]>>>;
} | null>(null);
export const CommsayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commsay, setCommsay] = useState<null | CommsayChatWith<[GroupChannelModuleBuilder, OpenChannelModuleBuilder]>>(null);
  return <CommsayContext.Provider value={{ commsay, setCommsay }}>{children}</CommsayContext.Provider>;
};

export const useCommsayContext = () => {
  const context = useContext(CommsayContext);
  if (!context) {
    throw new Error('useCommsayContext must be used within a CommsayProvider');
  }
  return context;
};

const MethodNameContext = createContext<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);
export const MethodNameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('初始化');
  return <MethodNameContext.Provider value={{ name, setName }}>{children}</MethodNameContext.Provider>;
};

export const useMethodNameContext = () => {
  const context = useContext(MethodNameContext);
  if (!context) {
    throw new Error('useMethodNameContext must be used within a MethodNameProvider');
  }
  return context;
};



// 定义数组类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayItem = any; // 可以替换为任何你需要的类型
type ArrayState = ArrayItem[];

// 定义动作类型
type ArrayAction =
  | { type: 'ADD'; item: ArrayItem }
  | { type: 'REMOVE'; index: number }
  | { type: 'RESET' };

  // 创建 reducer
const arrayReducer = (state: ArrayState, action: ArrayAction): ArrayState => {
  switch (action.type) {
    case 'ADD':
      return [action.item, ...state];
    case 'REMOVE':
      return state.filter((_, index) => index !== action.index);
    case 'RESET':
      return [];
    default:
      throw new Error(`Unknown action type: ${(action as ArrayAction).type}`);
  }
};

// 创建 Context
const ArrayContext = createContext<{
  state: ArrayState;
  dispatch: React.Dispatch<ArrayAction>;
} | null>(null);

// 创建 Provider
export const ArrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(arrayReducer, []);

  return (
    <ArrayContext.Provider value={{ state, dispatch }}>
      {children}
    </ArrayContext.Provider>
  );
};

// 创建一个自定义 Hook 来使用 ArrayContext
export const useArrayContext = () => {
  const context = useContext(ArrayContext);
  if (!context) {
    throw new Error('useArrayContext must be used within an ArrayProvider');
  }
  return context;
};
