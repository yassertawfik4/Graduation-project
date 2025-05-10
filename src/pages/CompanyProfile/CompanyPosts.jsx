import { Link } from "react-router-dom";

function CompanyPosts({ company }) {
  return (
    <div className="border border-[#C9C9C9] rounded-lg p-4 bg-white shadow-sm">
      {company?.internships ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent posts</h2>
            <a href="#" className="text-[16px] font-bold font-[roboto]">
              Show all &rarr;
            </a>
          </div>

          <div className="space-y-3">
            {/* Post 1 */}
            {company?.internships?.map((item) => (
              <div
                key={item.id}
                className="border-x border-[#C9C9C9] shadow-md rounded-lg p-4 grid grid-cols-4 items-center"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900">{item?.title}</h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {item?.type}
                  </p>
                </div>
                <div
                  className={`flex items-center text-sm font-medium ${
                    item?.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  {item?.isActive ? "Active" : "Inactive"}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 18.433C3 16.4308 4.45485 14.7254 6.43204 14.4098L6.61013 14.3814C8.19336 14.1287 9.80664 14.1287 11.3899 14.3814L11.568 14.4098C13.5451 14.7254 15 16.4308 15 18.433C15 19.2984 14.2984 20 13.433 20H4.56697C3.70156 20 3 19.2984 3 18.433Z"
                      stroke="#363853"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12.5 7.5C12.5 9.433 10.933 11 9 11C7.067 11 5.5 9.433 5.5 7.5C5.5 5.567 7.067 4 9 4C10.933 4 12.5 5.567 12.5 7.5Z"
                      stroke="#363853"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 11C16.933 11 18.5 9.433 18.5 7.5C18.5 5.567 16.933 4 15 4M17.3899 20H19.433C20.2984 20 21 19.2984 21 18.433C21 16.4308 19.5451 14.7254 17.568 14.4098V14.4098C17.4494 14.3909 17.3293 14.3814 17.2093 14.3814C16.8895 14.3814 16.7902 14.3814 16.2412 14.3814"
                      stroke="#363853"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {item.applicationCount} Applications
                </div>
                <div className="text-right">
                  <Link
                    to={`/internShip/${item.id}/application`}
                    className="bg-[#095544] text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                  >
                    View Applications
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No Internships</p>
        </div>
      )}
    </div>
  );
}

export default CompanyPosts;
