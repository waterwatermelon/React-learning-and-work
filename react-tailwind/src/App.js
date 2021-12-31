
function App() {
  return (
    <div className='bg-gray-100 dark:bg-gray-800 p-4'>
      {/* header */}
      <div className='max-w-sm mx-auto bg-white shadow-md space-x-4 p-2 rounded-lg'>
        <span className='text-lg'>
          hello
        </span>
        <span className='text-gray-500'>tailwind</span>
        <button className='p-2 rounded-md hover:bg-black hover:text-white' >button</button>
      </div>
      {/* content TODO:布局 */}
      <div className='bg-red-200 p-2 mt-2 rounded-xl'>
        <img className='w-20 h-20 bg-black-800' />
        <div className=''>content</div>
      </div>

      <div className='mt-2'>
        <label className='text-gray-600 mr-1'>label</label>
        <input className='border-2 border-green-700 p-1 rounded-md focus:outline-none text-gray-700 '>
        </input>
      </div>

      <div className='mt-2'>
        <button className='bg-indigo-500 p-2 pt-1 pb-1 rounded-sm text-yellow-50 hover:cursor-pointer'>button</button>
        <button className='btn'>button</button>
      </div>
      <select className='bg-white focus:outline-none' >
        <option className=' '>1</option>
        <option>2</option>
      </select>
    </div>
  );
}

export default App;
