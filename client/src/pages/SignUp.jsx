import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {Link} from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-3 max-w-lg  mx-auto'>
      <h1 className='font-bold text-4xl tracking-wide text-center my-5'>Sign Up</h1>
      <form className='flex flex-col gap-y-5 border-2 p-10 w-full rounded-md shadow-sm shadow-white'>
        <Input text="text" placeholder="Enter your name" name="name" />
        <Input text="email" placeholder="Enter your email" name="email" />
        <Input text="password" placeholder="Enter your password" name="password" />
        <Button className='bg-blue-600 text-white py-2'>
          Sign Up
        </Button>
      </form>
      <div>
        <p className='text-center mt-5'>Already have an account? <Link to='/sign-in' className='text-blue-600'>Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp