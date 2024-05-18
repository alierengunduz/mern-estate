import {Link} from 'react-router-dom'

const FindEstate = () => {
  return (

        <div className='flex flex-col gap-6 p-5'>
        <h1 className='text-slate-700 font-bold text-6xl'>
        Find the <span className='border-2 border-gray-700 rounded-md border-double shadow-md shadow-gray-400'>perfect</span>  home you`re looking for...
        </h1>
        <p className='text-gray-400 text-base'>
        Welcome to our real estate platform, where your dream home is just a few clicks away. Whether you`re searching for a cozy rental apartment in the heart of the city or a spacious house in the suburbs, we have a diverse selection of properties to meet your needs. Explore detailed listings, view high-quality photos, and connect with trusted agents to make your home buying or renting experience smooth and hassle-free. Start your journey to finding the perfect home with us today.
        </p>
        <Link
          to={'/search'}
          className='text-xl text-gray-600 font-bold group hover:text-gray-100 hover:bg-gray-700 rounded-lg p-2 text-center transition duration-300 w-1/5'
        >
          <span>Let`s get started...</span>
        </Link>
      </div>
  )
}

export default FindEstate