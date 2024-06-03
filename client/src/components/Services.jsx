import ServicesCard from "./ServicesCard"
import { FcServices,FcServiceMark,FcSelfServiceKiosk } from "react-icons/fc";
import { TbServicemark } from "react-icons/tb";

const Services = () => {
    const servicesData = [
        {
          id: 1,
          title: "CONSTRUCTION SERVICES",
          description: "fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
          icon: <FcServices size={65}/>
        },
        {
          id: 2,
          title: "BUILDING MODELING",
          description: "fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
          icon: <FcServiceMark size={65}/>
        },
        {
          id: 3,
          title: "PRE CONSTRUCTION",
          description: "fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
          icon: <FcSelfServiceKiosk size={65}/>
        },
        {
          id: 4,
          title: "MANAGEMENT",
          description: "fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
          icon: <TbServicemark size={65}/>
        },
      ]
  return (
    <main className="my-5">
        <div className="w-full sm:p-10 p-3 sm:h-[500px] flex flex-col items-center">
        <div className="flex flex-col gap-y-2 items-center my-5">
            <h1 className="font-bold text-4xl tracking-wide">Our Services</h1>
            <p className="font-medium">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, veritatis dolores asperiores id eligendi similique illo recusandae tempore fugiat numquam voluptates? Dolor officia aliquid natus ipsa modi rem, temporibus tempora, facere reiciendis porro aliquam repellat, quaerat odit consequuntur eligendi commodi.</p>
        </div>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {
                servicesData.map((data) => (
                    <ServicesCard key={data.id} data={data}/>
                ))
            }
        </div>
        </div>
    </main>
  )
}

export default Services