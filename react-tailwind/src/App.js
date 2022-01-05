
function App() {
  return (
    <div className='bg-gray-100 dark:bg-gray-800 p-4'>
      {/* header */}
      <div className='max-w-sm mx-auto bg-white shadow-md space-x-4 p-2 rounded-lg'>
        <span className='text-lg text-gray-500 '>
          hello
        </span>
        <span className='print:text-red-400'>tailwind</span>
        <span className='text-orange-200'>orange-200</span>
        <span className='text-orange-300'>orange-300</span>
        <span className='text-orange-400'>orange-400</span>
        <span className='text-orange-500'>orange-500</span>
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
        <button className='bg-indigo-500 p-2 py-1 rounded-sm text-yellow-50 hover:cursor-pointer'>button</button>
        <button className='btn btn-default'>button</button>
        <button className='btn btn-blue'>button</button>
        <button className='btn btn-primary'>button</button>
      </div>
      <select className='bg-white focus:outline-none' >
        <option className=' '>1</option>
        <option>2</option>
      </select>
    </div>
  );
}

export default App;
