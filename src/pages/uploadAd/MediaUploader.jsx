import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function MediaUploader({ setMedia }) {

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------- IMAGE DROP ---------- */

  const onDrop = useCallback((acceptedFiles) => {

    const newFiles = acceptedFiles.slice(0, 6 - images.length);

    const previews = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const updated = [...images, ...previews];

    setImages(updated);

    setMedia(prev => ({
      ...prev,
      images: updated.map(i => i.file)
    }));

  }, [images, setMedia]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop
  });

  /* ---------- REMOVE IMAGE ---------- */

  const removeImage = (index) => {

    const updated = images.filter((_, i) => i !== index);

    setImages(updated);

    setMedia(prev => ({
      ...prev,
      images: updated.map(i => i.file)
    }));

  };

  /* ---------- VALIDATION ---------- */

  const validateForm = () => {

    const newErrors = {};

    if (images.length === 0)
      newErrors.images = "At least one image is required";

    if (!audio)
      newErrors.audio = "Background music is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* ---------- EXPOSE VALIDATION TO PARENT ---------- */

  useEffect(() => {

    setMedia(prev => ({
      ...prev,
      validateForm
    }));

  }, [images, audio, setMedia]);

  return (

    <div className="space-y-10">

      {/* Drag Drop Zone */}

      <div
        {...getRootProps()}
        className={`grid grid-cols-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        ${isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"}
        ${errors.images ? "border-red-500" : ""}
        `}
      >

        <input {...getInputProps()} />

        <p className="text-gray-500">
          Drag & drop product images here
        </p>

      </div>

      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images}</p>
      )}

      {/* Image Preview Grid */}

      {images.length > 0 && (

        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 gap-3">

          {images.map((img, index) => (

            <div key={index} className="relative">

              <img
                src={img.preview}
                className="rounded-lg h-24 w-full object-cover"
              />

              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>

            </div>

          ))}

        </div>

      )}

      {/* Optional Video Upload */}

      <div>

        <p className="text-sm font-medium mb-1">
          Product Video
        </p>

        <input
          type="file"
          accept="video/*"
          className="w-full border p-4 rounded-lg border-blue-300 mt-2"
          onChange={(e) => {

            const file = e.target.files[0];

            setVideo(file);

            setMedia(prev => ({
              ...prev,
              video: file
            }));

          }}
        />

      </div>

      {/* Audio Upload */}

      <div>

        <p className="text-sm font-medium mb-1">
          Background Music <span className="text-red-500">*</span>
        </p>

        <input
          type="file"
          accept="audio/*"
          required
          className={`w-full border p-4 rounded-lg mt-2
          ${errors.audio ? "border-red-500" : "border-blue-300"}
          `}
          onChange={(e) => {

            const file = e.target.files[0];

            setAudio(file);

            setMedia(prev => ({
              ...prev,
              audio: file
            }));

          }}
        />

        {errors.audio && (
          <p className="text-red-500 text-sm">{errors.audio}</p>
        )}

      </div>

    </div>

  );

}