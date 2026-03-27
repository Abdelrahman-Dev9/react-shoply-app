import { Plus, Search } from "lucide-react";
import { useState } from "react";
import car1 from "../../assets/car1.png";
import car2 from "../../assets/car2.png";
import car3 from "../../assets/car3.png";

const categories = [
  { id: 1, name: "Computer Science", image: car1 },
  { id: 2, name: "Information System", image: car2 },
  { id: 3, name: "Cyber Security", image: car3 },
];

export default function CategoryPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 mx-3">
          <h2 className="text-[#1e3a8a] font-bold text-xl">Categories</h2>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white flex-1">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search category"
              className="flex-1 text-sm outline-none bg-transparent text-gray-700"
            />
          </div>

          <button className="ml-auto flex items-center gap-2 bg-[#1e3a8a] text-white p-2 rounded-xl text-[14px] cursor-pointer">
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-700 text-[13px]">
                <th className="text-left pb-3 pl-4 font-semibold">
                  Category Image
                </th>
                <th className="text-left pb-3 font-semibold">Category Name</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId;

                return (
                  <tr
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`border-t cursor-pointer transition-colors duration-200
                      ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}`}
                  >
                    <td className="pl-4 py-3">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-[120px] h-[120px] object-contain"
                      />
                    </td>
                    <td className="py-3 font-medium ">{category.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
