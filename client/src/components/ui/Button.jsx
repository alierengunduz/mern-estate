import PropTypes from 'prop-types'
const Button = ({children,type,disabled,onClick,color,height}) => {
  return (
    <>
        <button onClick={onClick}  type={type} disabled={disabled}
        className={`${color} text-white py-2 uppercase rounded-md p-2 hover:bg-opacity-80 hover:translate-x-1 transition-all duration-300 h-${height}`}>
          {children}
        </button>
    </>
  )
}

export default Button

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.string
}