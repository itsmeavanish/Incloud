import { IoCloudUploadOutline } from "react-icons/io5";
import { Upload } from "../components/Upload";
const upload = [
  { name: "PDF", imageUrl: "./pdf.webp" },
  { name: "DOCX", imageUrl: "./docx.png" },
  { name: "XLSX", imageUrl: "./xlsx.png" },
  { name: "IMAGE", imageUrl: "./svg.webp" },
  { name: "VIDEO", imageUrl: "./video.png" },
];

export default function Media() {
  return (
    <div className="text-center p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <span className="font-semibold text-lg">Add Your Media</span>
        <span className="flex items-center mt-4 md:mt-0">
          <IoCloudUploadOutline size="1.5rem" />
          <button className="ml-2 text-blue-500 hover:underline focus:outline-none">
            Upload
          </button>
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {upload.map((item, index) => (
          <Upload items={item} key={index} />
        ))}
      </div>
    </div>
  );
}
