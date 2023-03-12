import Modal from 'react-awesome-modal';

export const LoginSection = ({ closeModal, open }) => <Modal
  visible={open}
  width="400"
  height="300"
  effect="fadeInUp"

>
  <div className='bg-[#ffffff] flex flex-col justify-center'>
    <div className="bg-black w-full  ">
      <div className='flex flex-row text-gray-400 py-2'>
        <h2 className='text-2xl dark:text-white font-bold text-end items-center  ml-40'>SIGN IN <span onClick={closeModal} className="ml-14 "> X</span></h2>

      </div>

    </div>
    <form className='max-w-[400px] w-full mx-auto rounded-lg bg-[#ffffff] p-8 px-8'>

      <div className='flex flex-col text-gray-400 py-2'>
        <label>Username</label>
        <input className='rounded-lg bg-[#fffff] mt-2 p-2 focus:border-blue-500 focus:bg-[#ffffff]0 outline' type="text" />
      </div>
      <div className='flex flex-col text-gray-400 py-2'>
        <label>Password</label>
        <input className='rounded-lg bg-[#fffff] mt-2 p-2 focus:border-blue-500 focus:bg-[#ffffff]0 outline' type="password" />
      </div>
      {/* <div className='flex justify-between text-gray-400 py-2'>
        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>

      </div> */}
      <button className='w-50 my-3 py-2 px-4 bg-[#9352B3] shadow-lg text-white font-semibold rounded-lg'>SIGN IN</button>
      <div className='flex justify-between text-gray-400 py-2'>
      </div>

    </form>
  </div>
</Modal>