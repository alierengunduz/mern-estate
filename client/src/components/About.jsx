import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div className="w-full sm:h-[600px] sm:p-10 p-3">
        <div className="h-full flex sm:flex-row flex-col gap-x-10">
            <div className="sm:w-1/2 w-full flex flex-col items-center justify-start gap-y-10 shadow-lg p-5 border-dotted border-8">
                <h1 className='font-bold text-4xl tracking-wider'>About Us</h1>
                <p className='leading-relaxed text-lg'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don`t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All but the majority have suffered alteration in some form, by injected humour, or randomised words which don`t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text</p>
                <Link target='_top' to={'/search'} className='bg-yellow-500 text-white py-3  font-bold px-10 rounded-md '>Read More</Link>
            </div>
            <div className="sm:w-1/2 w-full h-full">
                <img src="/images/slider3.png" alt="" className="h-full object-cover" />
            </div>
        </div>
    </div>
  )
}

export default About