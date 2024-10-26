import { useState, useRef } from "react";
import YourTopPost from "../../components/yourTopPost/YourTopPost";
import {
  useCreatePostMutation,
  useUploadFIleMutation,
} from "../../redux/api/file-api";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const NewPost = () => {
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFiles, { isLoading }] = useUploadFIleMutation();
  const [createPost] = useCreatePostMutation();

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleUpload();
    navigate("/");
    clearForm();
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const uploadResponse = await uploadFiles(formData).unwrap();
      const fileUrls = uploadResponse.files.map(
        (fileArr: any, index: number) => ({
          url: fileArr?.[0].url,
          type: files[index].type.split("/")[0].toUpperCase(),
        })
      );

      await createPost({
        content: fileUrls,
        content_alt: altText,
        caption,
        location,
      }).unwrap();
    }
  };

  const clearForm = () => {
    setCaption("");
    setLocation("");
    setAltText("");
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isFormValid =
    caption.trim() && location.trim() && altText.trim() && files.length > 0;

  return (
    <div className="md:ml-[100px] flex justify-start overflow-hidden flex-wrap  lg:flex-nowrap ">
      <div className="md:min-h-screen bg-black flex  w-full p-4 md:p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg md:max-w-2xl p-6 bg-gray-900 rounded-lg"
        >
          <h1 className="text-white text-xl md:text-2xl font-semibold mb-4">
            Create a Post
          </h1>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md h-24"
              placeholder="Write your caption..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              Add Photos/Videos
            </label>
            <div className="w-full bg-gray-800 p-4 rounded-md flex justify-center items-center relative">
              {files.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {files.map((file, index) => (
                    <div key={file.name} className="relative">
                      <img
                        className="w-[80px] h-[80px] object-cover md:w-[100px] md:h-[100px]"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <AiOutlineClose size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 flex flex-col gap-2">
                  <p>Drag photos and videos here</p>
                  <p className="text-sm">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  <button
                    type="button"
                    onClick={handleSelectImage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Select Image
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Add Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md"
              placeholder="Location"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">
              Photo/Video Alt Text
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md"
              placeholder="Alt text for accessibility"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`bg-purple-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-purple-700 ${
                !isFormValid || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading && <FaSpinner className="animate-spin mr-2" />}
              {isLoading ? "Loading..." : "Share Post"}
            </button>
          </div>
        </form>
      </div>
      <YourTopPost />
    </div>
  );
};

export default NewPost;
