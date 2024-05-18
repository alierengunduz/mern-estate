

const MainContent = () => {
  return (
    <div className="h-[600px] flex gap-x-10  p-10">
        <div className="w-1/2 flex flex-col justify-between">
            <h1 className="font-bold text-4xl leading-relaxed">The Most Flexible  Theme For Real Estate</h1>
            <p className="font-normal text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit rerum maxime alias dignissimos dolores debitis, sapiente quisquam? Repellendus, exercitationem atque?
            </p>
                <a className="bg-gray-700 text-white w-24 p-3 rounded-md font-bold hover:translate-x-8 transition duration-300 text-center" href="">Show More</a>
                <div className="flex items-center gap-x-5">
                    <div className="flex flex-col items-center border p-3 border-gray-500 rounded-md shadow-lg gap-y-1">
                        <span className="font-bold text-2xl">43,000+</span>
                        <span>Professionals Choose Houzez</span>
                    </div>
                    <div className="flex flex-col items-center border p-3 border-gray-500 rounded-md shadow-lg gap-y-1">
                        <span className="font-bold text-2xl">2,100+</span>
                        <span>Top-Rated User Reviews</span>
                    </div>
                </div>
        </div>
        <div className="w-1/2">
            <img className="w-full h-full object-cover rounded-md" src="/images/slider3.png" alt="" />
        </div>
    </div>
  )
}

export default MainContent