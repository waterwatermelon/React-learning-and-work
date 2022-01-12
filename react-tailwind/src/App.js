
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
      <div className='bg-gray-200 p-2 rounded m-2'>
        <article className='prose'>
          <h3>吹梦到西洲</h3>
          <span>作者</span>
          <p>海水梦悠悠，我愁君亦愁。</p>
          <p>南风知我意，吹梦到西洲。</p>

          <ul>
            <li>1</li>
            <li>12</li>
          </ul>
          <code>
            code here...
          </code>
        </article>
      </div>
      <div className='bg-gray-200 m-2 p-2 rounded'>
        <ul className='list-disc list-inside'>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
      {/* content TODO:布局 */}
      <div className='bg-red-200 bg-stripes bg-stripes-white p-2 mt-2 rounded-xl'>
        <img className='w-20 h-20 bg-black-800' />
        <div className=''>content</div>
      </div>

      <div className='bg-orange-200 mt-2 p-2 rounded'>
        <div>

          <label className='text-gray-600 mr-1'>label</label>
          <input className='border-2 border-green-700 p-1 rounded-md focus:outline-none text-gray-700 '>
          </input>
        </div>
        <div>

          <label>checkbox </label>
          <input type='checkbox' className='text-pink-400 rounded' />
        </div>
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

      <div className='container bg-gray-200 space-x-4 rounded p-2'>
        <div className='bg-pink-400 inline-block rounded p-2'>inline block</div>
        <div className='bg-pink-400 inline-block rounded p-2'>inline block</div>
      </div>

      <h4>九宫格-网格布局</h4>
      <div className='grid grid-cols-3 gap-4 bg-green-200 mt-2 p-4'>
        <div className='bg-orange-200'>1</div>
        <div className='bg-orange-200'>2</div>
        <div className='bg-orange-200'>3</div>
        <div className='bg-orange-200'>4</div>
        <div className='bg-orange-200 col-span-2'>5</div>
        <div className='bg-orange-200'>6</div>
        <div className='bg-orange-200'>7</div>
        <div className='bg-orange-200'>8</div>
        <div className='bg-orange-200'>9</div>
      </div>

      <div className='grid grid-cols-6 gap-4 bg-blue-200 mt-2 p-4'>
        <div className='bg-orange-200 col-start-2'>1</div>
        <div className='bg-orange-200'>2</div>
        <div className='bg-orange-200'>3</div>
        <div className='bg-orange-200 col-start-3 col-end-6'>4</div>
        <div className='bg-orange-200 col-span-2'>5</div>
        <div className='bg-orange-200'>6</div>
      </div>
    </div>
  );
}

export default App;
