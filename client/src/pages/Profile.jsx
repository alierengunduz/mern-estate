import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {useSelector} from 'react-redux'
const Profile = () => {
  const {user} = useSelector(state => state.user)
  const {currentUser} = user
  console.log(currentUser);
  return (
    <div className="p-3 max-w-lg  mx-auto flex flex-col gap-y-2 items-center">
      <h1 className='text-3xl font-bold tracking-wide'>Profile</h1>
      <img className='w-20 h-20 object-cover rounded-full' src={currentUser?.rest.avatar} alt="profile" />
      <form className='flex flex-col gap-y-5 w-full mt-5'>
        <Input name="username" id="username"  type="text" placeholder="Username..."/>
        <Input name="email" id="email" type="email" placeholder="Email..."/>
        <Input name="password" id="password" type="password" placeholder="Password..."/>
        <Button type="submit">UPDATE</Button>
      </form>
      <div className='w-full flex items-center justify-between'>
        <span className='text-red-700 cursor-pointer hover:underline transition duration-300'>Delete Account</span>
        <span className='text-red-700 cursor-pointer hover:underline transition duration-300'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile