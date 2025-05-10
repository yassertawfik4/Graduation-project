import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import companyApplication from "/public/images/companyApplication.png";
import { GoPlusCircle } from "react-icons/go";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import overview from "/public/images/overview.png";
import Swal from "sweetalert2";
const POSTS_PER_PAGE = 10;

function Overview() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const handelDeletePost = async (id) => {
    try {
      await axiosInstance.delete(`Internship/DeleteInternship/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
      Swal.fire({
        title: "Success",
        text: "Post deleted successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Post deleted failed",
        icon: "error",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `Company/posts?page=${currentPage}&pageSize=${POSTS_PER_PAGE}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "accessUsertoken"
              )}`,
            },
          }
        );

        console.log("API response:", response.data); // مفيد للديباغ
        setPosts(response.data.posts || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  return (
    <div>
      <div className="container mx-auto px-3">
        <div className="relative flex justify-center items-center">
          <img src={companyApplication} alt="companyApplication" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[700px]">
            <h1 className="text-[32px] font-bold mb-5 text-center text-white ">
              Connect Instantly with Qualified Candidates
            </h1>
            <ul className="flex flex-col gap-2 text-white list-disc px-16">
              <li className="text-[32px] font-medium">
                Find motivated students eager to learn{" "}
              </li>
              <li className="text-[32px] font-medium">
                Hire Your Next Great Team Member{" "}
              </li>
              <li className="text-[32px] font-medium">
                Shape the Next Generation{" "}
              </li>
            </ul>
            <div className="flex justify-center items-center my-4">
              <button className="bg-[#095544] px-14 py-3 text-white cursor-pointer text-[24px] font-bold">
                Add post
              </button>
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="flex justify-between items-center">
            <h2 className="text-[32px] font-medium text-[#021B1A]">
              Recent Posts
            </h2>
            <button className="bg-[#095544] px-8 py-3 flex items-center gap-2 text-white cursor-pointer text-[18px] font-bold rounded-[8px]">
              <GoPlusCircle />
              Create new post
            </button>
          </div>
        </div>
        <div className="overflow-x-auto my-10">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <table className="w-full divide-y-2 divide-gray-200">
              <thead className="bg-[#AACBC4] text-start">
                <tr className="*:font-medium *:text-[#021B1A] *:text-start">
                  <th className="px-3 py-2 whitespace-nowrap">POSTS</th>
                  <th className="px-3 py-2 whitespace-nowrap">STATUS</th>
                  <th className="px-3 py-2 whitespace-nowrap">APPLICATIONS</th>
                  <th className="px-3 py-2 whitespace-nowrap">TYPE</th>
                  <th className="px-3 py-2 whitespace-nowrap">
                    DAYS REMAINING
                  </th>
                  <th className="px-3 py-2 whitespace-nowrap">ACTIONS</th>
                  <th className="px-3 py-2 whitespace-nowrap">Delete</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <tr key={index} className="*:first:font-medium shadow-sm">
                      <td className="px-3 py-6 whitespace-nowrap">
                        {post.title}
                      </td>
                      <td className="px-3 py-9 whitespace-nowrap text-[#0BA02C] flex items-center  gap-1">
                        <IoIosCheckmarkCircleOutline size={21} /> {post.status}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap text-[#707D7D]">
                        {post.applicationCount} Applications
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap text-[#707D7D]">
                        {post.type}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap text-[#707D7D]">
                        {post.daysRemaining}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <Link
                          to={`/internShip/${post.id}/application`}
                          className="bg-[#095544] px-4 py-3 flex justify-center w-fit items-center gap-2 text-white cursor-pointer text-[18px] font-medium rounded-[8px]"
                        >
                          View Applications
                        </Link>
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap text-[#707D7D]">
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handelDeletePost(post.id);
                              }
                            });
                          }}
                          className="bg-[#095544] px-4 py-3 flex justify-center w-fit items-center gap-2 text-white cursor-pointer text-[18px] font-medium rounded-[8px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <td colSpan="7" className="py-6">
                    <div className="flex justify-center flex-col items-center">
                      <img src={overview} alt="overview" className="" />
                      <div className="flex flex-col items-center gap-2 my-3">
                        <h2 className="text-[#021B1A] text-[32px] font-bold">
                          No posts yet?
                        </h2>
                        <p className="text-[#707D7D] text-[24px] font-medium">
                          {" "}
                          Start creating content to see it here.
                        </p>
                      </div>
                    </div>
                  </td>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {currentPage !== 1 && (
          <div className="flex justify-center items-center gap-2 my-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-[#095544] ${
                currentPage === 1
                  ? "cursor-not-allowed"
                  : "bg-[#F1F7F6] cursor-pointer"
              }  w-12 h-12 rounded-[30px] flex justify-center items-center`}
            >
              <FaArrowLeftLong size={21} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-[#095544] text-white"
                    : "text-gray-600"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-[#095544] bg-[#F1F7F6] cursor-pointer w-12 h-12 rounded-[30px] flex justify-center items-center"
            >
              <FaArrowRightLong size={21} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
