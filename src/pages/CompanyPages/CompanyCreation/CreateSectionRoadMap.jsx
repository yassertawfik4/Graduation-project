import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";
import { HiMiniXMark } from "react-icons/hi2";

function CreateSectionRoadMap() {
  const { roadMapId } = useParams();
  const [roadMapSections, setRoadMapSections] = useState([]);
  console.log("roadMapSections", roadMapSections);
  const [section, setSection] = useState({
    sectionTitle: "",
    sectionOrder: 1,
    items: [
      {
        title: "",
        resources: [
          {
            title: "",
            url: "",
            type: "",
          },
        ],
        order: 1,
      },
    ],
  });

  const handelGetRoadMap = async () => {
    try {
      const response = await axiosInstance.get(
        `Roadmap/${roadMapId}?includeSections=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      setRoadMapSections(response.data);
      // Set the section order based on existing sections
      if (response.data.sections && response.data.sections.length > 0) {
        const maxOrder = Math.max(
          ...response.data.sections.map((s) => s.order)
        );
        setSection((prev) => ({
          ...prev,
          sectionOrder: maxOrder + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, itemIndex, resourceIndex) => {
    const { name, value } = e.target;

    if (itemIndex === undefined) {
      // Section level change
      setSection({ ...section, [name]: value });
    } else if (resourceIndex === undefined) {
      // Item level change
      const updatedItems = [...section.items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [name]: value };
      setSection({ ...section, items: updatedItems });
    } else {
      // Resource level change
      const updatedItems = [...section.items];
      updatedItems[itemIndex].resources[resourceIndex] = {
        ...updatedItems[itemIndex].resources[resourceIndex],
        [name]: value,
      };
      setSection({ ...section, items: updatedItems });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading state
    Swal.fire({
      title: "Creating Section...",
      text: "Please wait while we process your request",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axiosInstance.post(
        `roadmap/${roadMapId}/sections-with-items`,
        section,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessUsertoken")}`,
          },
        }
      );
      handelGetRoadMap();
      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Section created successfully",
        confirmButtonColor: "#021B1A",
      });

      // Reset form after successful submission
      setSection({
        sectionTitle: "",
        sectionOrder: 1,
        items: [
          {
            title: "",
            resources: [
              {
                title: "",
                url: "",
                type: "",
              },
            ],
            order: 1,
          },
        ],
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to create section. Please try again.",
        confirmButtonColor: "#021B1A",
      });
    }
  };

  const addNewItem = () => {
    const newItem = {
      title: "",
      description: "",
      type: "",
      resources: [
        {
          title: "",
          url: "",
          type: "",
        },
      ],
      order: section.items.length + 1,
    };
    setSection({
      ...section,
      items: [...section.items, newItem],
    });
  };

  const addNewResource = (itemIndex) => {
    const updatedItems = [...section.items];
    updatedItems[itemIndex].resources.push({
      title: "",
      url: "",
      type: "",
    });
    setSection({ ...section, items: updatedItems });
  };
  const removeItem = (itemIndex) => {
    if (section.items.length === 1) return; // لا تحذف لو هو الوحيد
    setSection({
      ...section,
      items: section.items.filter((_, index) => index !== itemIndex),
    });
  };
  const removeResource = (itemIndex, resourceIndex) => {
    const updatedItems = [...section.items];
    if (updatedItems[itemIndex].resources.length === 1) return; // لا تحذف لو هو الوحيد

    updatedItems[itemIndex].resources = updatedItems[
      itemIndex
    ].resources.filter((_, index) => index !== resourceIndex);

    setSection({ ...section, items: updatedItems });
  };
  useEffect(() => {
    handelGetRoadMap();
  }, []);
  return (
    <div className="my-5">
      <div className="container mx-auto px-3 flex justify-center">
        <div className="w-[70%] shadow-lg py-10 px-12 border-b-8 border-l-8 border-[#095544] rounded-[24px]">
          <h2 className="text-[24px] text-[#021B1A] font-medium mb-6">
            Add Section
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Section Fields */}
            <div className="flex items-center gap-4 w-full my-3">
              <div className="flex flex-col gap-2 w-full">
                <label>Section Title *</label>
                <input
                  type="text"
                  name="sectionTitle"
                  className="border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none text-[#707D7D]"
                  value={section.sectionTitle}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter Section Title"
                  required
                />
              </div>
            </div>

            {/* Items */}
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="border border-[#F1F7F6] rounded-[8px] p-6 my-2.5"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[20px] font-medium">Item {item.order}</h3>
                  {section.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(itemIndex)}
                      className="font-bold cursor-pointer"
                      title="Remove Item"
                    >
                      <HiMiniXMark size={24} />
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  <div className="">
                    <div className="w-full">
                      <label>Title *</label>
                      <input
                        type="text"
                        name="title"
                        className="w-full border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none text-[#707D7D]"
                        value={item.title}
                        onChange={(e) => handleChange(e, itemIndex)}
                        placeholder="Enter Item Title"
                        required
                      />
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="mt-2">
                    <h4 className="text-[18px] font-medium mb-2">Resources</h4>
                    {item.resources.map((resource, resourceIndex) => (
                      <div
                        key={resourceIndex}
                        className="border border-[#F1F7F6] rounded-[8px] p-4 mb-3"
                      >
                        <div className="space-y-4 flex items-center w-full gap-4 relative">
                          {item.resources.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeResource(itemIndex, resourceIndex)
                              }
                              className="absolute cursor-pointer top-0 right-0 font-bold"
                              title="Remove Resource"
                            >
                              <HiMiniXMark size={24} />
                            </button>
                          )}
                          <div className="w-full">
                            <label>Resource Title *</label>
                            <input
                              type="text"
                              name="title"
                              className="w-full border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none text-[#707D7D]"
                              value={resource.title}
                              onChange={(e) =>
                                handleChange(e, itemIndex, resourceIndex)
                              }
                              placeholder="Enter Resource Title"
                              required
                            />
                          </div>

                          <div className="w-full">
                            <label>URL *</label>
                            <input
                              type="url"
                              name="url"
                              className="w-full border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none text-[#707D7D]"
                              value={resource.url}
                              onChange={(e) =>
                                handleChange(e, itemIndex, resourceIndex)
                              }
                              placeholder="Enter Resource URL"
                              required
                            />
                          </div>
                          <div className="w-full">
                            <label>Resource Type *</label>
                            <select
                              name="type"
                              className="w-full border border-[#F1F7F6] rounded-[8px] px-5 py-4 outline-none text-[#707D7D]"
                              value={resource.type}
                              onChange={(e) =>
                                handleChange(e, itemIndex, resourceIndex)
                              }
                              required
                            >
                              <option value="">Select Type</option>
                              <option value="Documentation">
                                Documentation
                              </option>
                              <option value="Video">Video</option>
                              <option value="Article">Article</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addNewResource(itemIndex)}
                      className="mt-2 bg-[#F1F7F6] cursor-pointer text-[#021B1A] px-6 py-2 rounded-[8px] hover:bg-[#E5EFED]"
                    >
                      Add Resource
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={addNewItem}
                className="bg-[#F1F7F6] text-[#021B1A] px-6 py-2 rounded-[8px] hover:bg-[#E5EFED]"
              >
                Add Item
              </button>
              <button
                type="submit"
                className="bg-[#021B1A] text-white px-6 py-2 rounded-[8px] hover:bg-[#032F2C]"
              >
                Create Section
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSectionRoadMap;
