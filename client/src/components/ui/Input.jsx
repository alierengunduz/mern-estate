import PropTypes from 'prop-types'

const Input = ({type,placeholder,name,id,onChange,value,defaultValue}) => {
  return (
    <>
        <input className='border py-3 rounded-md pl-2 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50
        ' name={name} defaultValue={defaultValue} type={type}  placeholder={placeholder} id={id} value={value} onChange={onChange} />
    </>
  )
}

export default Input

Input.propTypes = {
  type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    defaultValue: PropTypes.string
}