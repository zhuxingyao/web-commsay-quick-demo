import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
// import { setUser, clearUser } from '../store/slices/userSlice';
const Header: React.FC = () => {

  const user = useSelector((state: RootState) => state.user);

  return (
    <header className='header'>
      <a href="/" target="_blank" rel="noopener noreferrer">
        <img className='header-logo' src="./logo.png" alt="logo" />
      </a>
      <h1 className='header-title'>
        Comsay Quick Demo
        {
          user.id && (
            <span className='header-user'>
              当前用户：{user.id}
            </span>
          )
        }
        {
          !user.id && (
            <span className='header-user'>
              未连接 commsay 服务....
            </span>
          )
        }
      </h1>

    </header>
  );
}

export default Header;