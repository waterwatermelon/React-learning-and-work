
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
      <h4>prose </h4>
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
      <h4>list</h4>
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

      <h4> flex</h4>
      <div className='flex flex-wrap content-center bg-pink-200 p-4 mt-4 h-40'>
        <div className='bg-orange-200 text-gray-600 w-1/3'>1</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>2</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>3</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>4</div>
      </div>

      <div className='flex flex-wrap items-center bg-blue-200 p-4 mt-4 h-40'>
        <div className='bg-orange-200 text-gray-600 w-1/3'>1</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>2</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>3</div>
        <div className='bg-orange-200 text-gray-600 w-1/3'>4</div>
      </div>
      <h4> flex + space</h4>
      <div className='flex bg-green-200 mt-4 p-4 rounded space-x-4'>
        <div className='w-20 h-20 bg-orange-200'>1</div>
        <div className='w-20 h-20 bg-orange-200'>2</div>
        <div className='w-20 h-20 bg-orange-200'>3</div>
        <div className='w-20 h-20 bg-orange-200'>4</div>
      </div>
      <h4>背景 background 渐变(最多三种颜色)</h4>
      <div className='mt-4 w-1/2 h-10 rounded bg-gradient-to-r from-blue-300 to-purple-400'></div>
      <div className='mt-4 w-1/2 h-10 rounded bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400'></div>
      <div className='mt-4 w-1/2 h-10 rounded bg-gradient-to-r from-blue-300 via-orange-300  to-purple-400'></div>
      <h4>border</h4>
      <div className='container grid grid-cols-12 gap-1 bg-gray-200 p-4'>
        <div className='bg-indigo-300 w-20 h-20 rounded'> rounded</div>
        <div className='bg-indigo-300 w-20 h-20 rounded-sm'>rounded-sm </div>
        <div className='bg-indigo-300 w-20 h-20 rounded-xl'>rounded-xl </div>
        <div className='bg-indigo-300 w-20 h-20 rounded-3xl'>rounded-3xl </div>
        <div className='bg-indigo-300 w-20 h-20 rounded-t'>rounded-t </div>
        <div className='bg-indigo-300 w-20 h-20 rounded-tl'>rounded-tl </div>
        <div className='bg-indigo-300 w-20 h-20 rounded-full'>rounded-full </div>
        <div className='bg-indigo-300 w-20 h-10 rounded-full'>rounded-full </div>
      </div>
      <div className='container grid grid-cols-12 gap-1 bg-gray-200 p-4'>
        <div className='bg-indigo-300 border-indigo-600 w-20 h-20 border-2'> border-2</div> 
        <div className='bg-indigo-300 border-indigo-600 w-20 h-20 border-l-2'> border-l-2</div> 
        <div className='bg-indigo-300 border-indigo-600 w-20 h-20 border-b-2'> border-b-2</div> 
        <div className='bg-indigo-300 border-indigo-600 w-20 h-20 border-4'> border-4</div> 
      </div>
      <div className='container grid grid-cols-12 bg-gray-200 p-4 divide-x-4 divide-orange-200'>
        <div className='bg-indigo-300 '> content</div> 
        <div className='bg-indigo-300 '> content</div> 
        <div className='bg-indigo-300 '> content</div> 
        <div className='bg-indigo-300 '> content</div> 
      </div>
      <div className='container grid grid-cols-12 gap-1 bg-gray-200 p-4 '>
        <div className='w-20 h-20 border-4 border-indigo-400 border-solid'> </div> 
        <div className='w-20 h-20 border-4 border-indigo-400 border-dashed'> </div> 
        <div className='w-20 h-20 border-4 border-indigo-400 border-dotted'> </div> 
        <div className='w-20 h-20 border-4 border-indigo-400 border-double'> </div> 
      </div>
      <div className='container grid grid-cols-12 gap-1 bg-gray-200 p-4 '>
        <div className='w-20 h-20 bg-indigo-400 ring-4'> ring-4</div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-0'>ring-offset-0 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-2'>ring-offset-2 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-4'>ring-offset-4 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-0 ring-offset-red-300'>ring-offset-red-300 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-2 ring-offset-red-300'>ring-offset-red-300 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-offset-4 ring-offset-red-300'>ring-offset-red-300 </div> 
        <div className='w-20 h-20 bg-indigo-400 ring-4 ring-orange-300'> ring-orange-300</div> 
        <div className='w-20 h-20 bg-indigo-400 ring-inset ring-4 ring-orange-300'>  ring-inset</div> 
      </div>
    </div>
  );
}

export default App;
