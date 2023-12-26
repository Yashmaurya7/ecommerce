import React , {Fragment} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {
    const {user} = useSelector(state => state.user);
  return (
    <Fragment>
        <div className="profile-container flex flex-col">
            <h1 className=' text-[2rem] text-center'>My Profile</h1>
            <img src={user?.avatar.url ? user.avatar.url : '/logo192.png'} alt='profile' className=' w-20 m-4'/>
            <button className='p-4 bg-[#F85903] rounded-xl inline w-fit m-4'><Link to='/me/update'>Update Profile</Link></button>
            <div className=''>
                <button className='p-4 bg-[#F85903] rounded-xl m-4'><Link to='/orders' className=' block'>My Orders</Link></button>
                <button className='p-4 bg-[#F85903] rounded-xl'><Link to='/password/update'>Change Password</Link></button>
            </div>
        </div>
    </Fragment>
  )
}

export default Profile