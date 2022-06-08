import { Link } from "react-router-dom"
import { useGetCategoryQuery } from "../../app/services/categoryServices"
import Spinner from "../Spinner/Spinner"


type IProps = {
  catId: number
}
const SubCategory = ({ catId }: IProps) => {
  const { data: callouts, isLoading } = useGetCategoryQuery(catId)
  return (


    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto  lg:max-w-none">
        {isLoading && <Spinner />}
        {!isLoading &&
          <div className=" space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 md:gap-y-10">
            {callouts?.map((callout) => (
              <div key={callout.id} className="group relative cursor-pointer">
                <div className="  relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:translate-z-5 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={`http://localhost:8080/${callout.image}`}
                    alt={callout.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-bold text-center">
                  <Link to={`/product/${callout.id}`}>
                    <span className="absolute inset-0" />
                  </Link>
                  {callout.name}
                </h3>
              </div>
            ))}
          </div>
        }

      </div>
    </div>
  )
}

export default SubCategory