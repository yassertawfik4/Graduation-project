import bookMarkImage from "/public/images/bookmarkImage.png";
import { CiBookmark, CiClock2 } from "react-icons/ci";
import { FaArrowLeftLong, FaLocationDot, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import tailLogo from "/public/images/tailwind.png";
import { FaArrowRight } from "react-icons/fa";
import axiosInstance from "../../Api/axiosInstance";
import Swal from "sweetalert2";

function BookMarkPage() {
  // Sample data - in a real app this would come from API/context
  const [bookmarks, setBookmarks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  // You can toggle this to test empty state
  const [isEmpty, setIsEmpty] = useState(false);

  const handelGetBookMark = async () => {
    try {
      const response = await axiosInstance.get(
        `bookmarks?pageNumber=${currentPage}&pageSize=${cardsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      setBookmarks(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteBookmark = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#095544",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`Bookmarks/internships/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        });
        handelGetBookMark();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The internship has been deleted from your bookmarks",
          confirmButtonColor: "#095544",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#095544",
      });
    }
  };
  useEffect(() => {
    handelGetBookMark();
  }, [currentPage]);
  const BookmarkCard = ({ bookmark }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg mb-6 max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 my-2">
            <div>
              <img
                className="w-16 h-16"
                loading="lazy"
                decoding="async"
                src={bookmark.logo}
                alt={`${bookmark.company} logo`}
              />
            </div>
            <div>
              <h2 className="text-gray-900 font-bold font-roboto text-2xl">
                {bookmark.company}
              </h2>
              <p className="text-gray-700 font-roboto text-base font-bold">
                {bookmark.title}
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteBookmark(bookmark.id)}
          >
            <FaRegTrashCan size={24} className="cursor-pointer text-red-600" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 flex-wrap">
            <button className="bg-[#095544] flex items-center font-semibold rounded-lg gap-2 text-white px-3 py-2">
              <span>
                <CiClock2 size={20} />
              </span>
              {bookmark.isFullTime ? "Full Time" : "Part Time"}
            </button>
            <button className="bg-[#095544] flex items-center font-semibold rounded-lg gap-2 text-white px-3 py-2">
              <span>
                <FaLocationDot size={20} />
              </span>
              {bookmark.isRemote ? "Remote" : "On-site"}
            </button>
            <button className="bg-[#095544] flex items-center font-semibold rounded-lg gap-2 text-white px-3 py-2">
              {bookmark.status}
            </button>
          </div>

          <div className="flex items-center px-6 text-[16px] py-3 gap-3 text-white bg-[#095544] rounded-lg font-medium">
            <button className="font-semibold">Apply Now</button>
            <FaArrowRight />
          </div>
        </div>
      </div>
    );
  };

  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="flex justify-center gap-1 text-gray-900 mt-8">
        {/* Previous button */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`grid size-10 place-content-center rounded border ${
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer"
            } rtl:rotate-180`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            {number === currentPage ? (
              <div className="block size-10 rounded border border-[#095544] bg-[#095544] text-center text-sm/10 font-medium text-white">
                {number}
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage(number)}
                className="block size-10 rounded border border-gray-200 text-center text-sm/10 font-medium transition-colors hover:bg-gray-50"
              >
                {number}
              </button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`grid size-10 place-content-center rounded border ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer"
            } rtl:rotate-180`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-7xl px-4">
        {isEmpty || bookmarks.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-16">
            <img
              className="w-96 mb-6"
              src={bookMarkImage}
              loading="lazy"
              alt="bookMarkImage"
            />
            <div className="text-center">
              <h2 className="font-roboto text-3xl font-bold">
                No bookmarks yet?
              </h2>
              <p className="text-base text-gray-800 font-roboto mt-2">
                Time to start building your collection!
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="cursor-pointer border py-1 px-2 rounded-sm border-[#021B1A]">
                <FaArrowLeftLong size={20} />
              </span>
              <h1 className="text-3xl font-medium font-[roboto] text-[#021B1A]">
                All Saved
              </h1>
            </div>
            <div className="flex flex-col items-center">
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </div>

            {/* Pagination component */}
            {totalPages > 1 && <Pagination />}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookMarkPage;
