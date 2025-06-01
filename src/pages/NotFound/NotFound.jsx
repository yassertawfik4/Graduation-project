import { Link } from "react-router-dom"
import errorPage from "/public/images/errorPage.png"
function NotFound() {
  return (
    <div className='h-screen '>
      <div className="container mx-auto px-3 flex items-center justify-center" >
        <div className="flex items-center gap-5 justify-between ">
        <div className="flex flex-col gap-5">
            <h2 className="font-medium text-[40px] text-[#021B1A]">Opps! Page not found</h2>
            <p className="text-[#707D7D] text-[16px]">Something went wrong. It&apos;s look like the link is broken or the  page is removed.</p>
            <div className="flex items-center gap-5">
            <Link to="/" className="bg-[#095544] cursor-pointer text-white px-5 py-2 rounded-md">Home</Link>
            <button onClick={() => window.history.back()} className="border border-[#095544] cursor-pointer text-[#095544] px-5 py-2 rounded-md">Go Back</button>
            </div>

            </div>
        <div>
        <img src={errorPage} alt="errorPage" />
        </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
