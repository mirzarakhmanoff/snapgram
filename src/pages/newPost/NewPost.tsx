import { useState, useRef } from "react";
import YourTopPost from "../../components/yourTopPost/YourTopPost";
import {
  useCreatePostMutation,
  useUploadFIleMutation,
} from "../../redux/api/file-api";

const NewPost = () => {
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFiles] = useUploadFIleMutation();
  const [createPost] = useCreatePostMutation();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleUpload();
    clearForm();
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const uploadResponse = await uploadFiles(formData).unwrap();
      const fileUrls = uploadResponse.files.map(
        (fileArr: any[]) => fileArr[0].url
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
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  const isFormValid =
    caption.trim() && location.trim() && altText.trim() && files.length > 0;

  return (
    <div className="ml-[270px] flex justify-between">
      <div className="min-h-screen bg-black flex justify-start w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 bg-gray-900 rounded-lg"
        >
          <h1 className="text-white text-2xl font-semibold mb-4">
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
            <div className="w-full bg-gray-800 p-6 rounded-md flex justify-center items-center relative">
              {files.length > 0 ? (
                <div className="flex gap-3 flex-col">
                  <div className="flex gap-3 items-center justify-center">
                    {files.map((file) => (
                      <img
                        className="w-[100px] h-[100px] object-cover"
                        key={file.name}
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 flex flex-col gap-3">
                  <p>Drag photos and videos here</p>
                  <p className="text-sm">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  <button
                    type="button"
                    onClick={handleSelectImage}
                    className=" bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Select Image
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                multiple
              />
            </div>

            {/* <button
              onClick={handleUpload}
              type="button"
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Upload
            </button> */}
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
              disabled={!isFormValid}
              className={`bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Share Post
            </button>
          </div>
        </form>
      </div>
      <YourTopPost />
    </div>
  );
};

export default NewPost;
