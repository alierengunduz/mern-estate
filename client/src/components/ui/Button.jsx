import PropTypes from 'prop-types'
const Button = ({children}) => {
  return (
    <>
        <button className='bg-slate-600 text-white py-2 rounded-md hover:bg-slate-700 hover:translate-x-1 transition-all duration-300 '>
          {children}
        </button>
    </>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.string
}