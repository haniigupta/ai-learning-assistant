import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import moment from "moment";

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === undefined || bytes === null) return "N/A";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (document.status) {
      case "ready":
        return (
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-xs font-medium">
            <CheckCircle size={14} />
            Ready
          </div>
        );

      case "processing":
        return (
          <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg text-xs font-medium">
            <Clock size={14} />
            Processing
          </div>
        );

      case "failed":
        return (
          <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-lg text-xs font-medium">
            <AlertCircle size={14} />
            Failed
          </div>
        );

      default:
        return null;
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(document);
  };

  return (
    <div
      onClick={() => navigate(`/documents/${document._id}`)}
      className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-emerald-600" />
        </div>

        <button
          onClick={handleDelete}
          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Document Info */}
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition">
        {document.title}
      </h3>

      <p className="text-sm text-gray-500 truncate mb-4">
        {document.fileName}
      </p>

      {/* Status */}
      <div className="mb-4">{getStatusBadge()}</div>

      {/* Meta Info */}
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <span>Size</span>
          <span className="font-medium text-gray-700">
            {formatFileSize(document.fileSize)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Uploaded</span>
          <span className="font-medium text-gray-700">
            {moment(document.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;