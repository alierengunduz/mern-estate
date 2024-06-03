import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const ServicesCard = ({data}) => {




  return (
    <div className='shadow-lg p-5 flex flex-col justify-between border gap-y-5 hover:translate-x-2 transition hover:bg-purple-600 hover:text-white duration-300 group'>
        <div>
           {data.icon}
        </div>
        <div className='flex flex-col gap-y-2'>
          <h1 className='font-bold text-2xl'>{data.title}</h1>
          <p> {data.description} </p>
        </div>
        <div>
          <Link target='_top' to={'/search'} className='bg-yellow-600 text-white py-2  font-bold px-6 rounded-md group-hover:bg-yellow-400 transition duration-300'>Read More</Link>
        </div>
    </div>
  )
}

export default ServicesCard

ServicesCard.propTypes = {
    data: PropTypes.object
}