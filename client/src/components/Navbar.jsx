import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { FiAlignJustify } from "react-icons/fi";
import { setOpenSidebar } from '../redux/slices/authSlice';
import NotificationPanel from './NotificationPanel';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex navbar-padding justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0 border-b border-gray-200'>
      <div className='flex gap-4 items-center'>
       
        <button 
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          <FiAlignJustify />
        </button>

    
        <div className='hidden sm:flex w-64 md:w-96 items-center text-lg py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] side-link-pad'>
          <MdOutlineSearch className='text-gray-500 text-xl' />
          <input 
            type="text"
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800 text-base' 
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className='flex gap-3 items-center'>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;