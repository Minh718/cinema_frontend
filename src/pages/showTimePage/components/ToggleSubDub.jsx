import React from "react";
import { TypeShowTime } from "../../../constants/TypeShowTime";

export default function ToggleSubDub({ value, onChange }) {
  const isSub = value === TypeShowTime.SUBTITLE;

  return (
    <div className="flex justify-center mb-2">
      <div className="inline-flex rounded-full bg-gray-200 p-1">
        <button
          onClick={() => onChange(TypeShowTime.SUBTITLE)}
          className={`px-4 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            isSub ? "bg-blue-500 text-white" : "text-gray-600"
          }`}
        >
          Sub
        </button>
        <button
          onClick={() => onChange(TypeShowTime.DUBBED)}
          className={`px-4 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            !isSub ? "bg-blue-500 text-white" : "text-gray-600"
          }`}
        >
          Dub
        </button>
      </div>
    </div>
  );
}
