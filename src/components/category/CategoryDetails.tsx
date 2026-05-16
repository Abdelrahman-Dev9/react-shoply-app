import { Ban, Pencil } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  image: string;
};

type Props = {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
};

const CategoryDetails = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f5f5f5] w-full max-w-5xl rounded-[30px] p-8 relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute top-6 left-6 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl"
        >
          ×
        </button>

        {/* TITLE */}
        <h2 className="text-[24px] font-semibold text-center text-[#233B8E] mb-12">
          {selectedCategory.name}
        </h2>

        {/* IMAGE */}
        <div className="border-2 border-dashed border-gray-400 rounded-3xl p-10 flex justify-center items-center mb-12 min-h-[350px]">
          <img
            src={selectedCategory.image}
            alt={selectedCategory.name}
            className="w-[300px] h-[300px] object-contain"
          />
        </div>

        {/* CATEGORY NAME */}
        <div className="border-2 border-dashed border-gray-400 rounded-2xl p-6 mb-12">
          <p className="text-[16px] font-semibold">
            category name:{" "}
            <span className="text-gray-600 text-[16px] font-semibold">
              {selectedCategory.name}
            </span>
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6">
          <button className="flex items-center justify-center gap-3 border-2 border-[#233B8E] text-[#233B8E] px-10 py-5 rounded-2xl font-semibold w-full text-[16px]">
            <Ban size={13} />
            Delete category
          </button>

          <button className="flex items-center justify-center gap-3 bg-[#233B8E] text-white px-10 py-5 rounded-2xl font-semibold w-full text-[16px]">
            <Pencil size={13} />
            Edit category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
