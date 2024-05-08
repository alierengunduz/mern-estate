import PropTypes from 'prop-types'

const Input = ({text,placeholder,name}) => {
  return (
    <>
        <input className='border py-3 rounded-md pl-2 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50
        ' name={name} type={text}  placeholder={placeholder} />
    </>
  )
}

export default Input

Input.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string
}