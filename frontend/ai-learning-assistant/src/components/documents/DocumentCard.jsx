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
          <div className="flex items-center gap-1text-green-700 bg-green-100 border border-green-200 px-3 py-1 rounded-lg text-xs font-medium">
            <CheckCircle size={14} />
            Ready
          </div>
        );

      case "processing":
        return (
          <div className="flex items-center gap-1 text-yellow-700 bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-lg text-xs font-medium">
            <Clock size={14} />
            Processing
          </div>
        );

      case "failed":
        return (
          <div className="flex items-center gap-1 text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-lg text-xs font-medium">
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
      className="group bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300 transition-all duration-300 cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
          <FileText className="w-7 h-7 text-emerald-700" />
        </div>

        <button
          onClick={handleDelete}
          className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Document Info */}
      <h3 className="text-xl font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition">
        {document.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">

        <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
          PDF
        </span>

        <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
          AI Ready
        </span>

      </div>

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
      <div className="mt-5 pt-4 border-t border-slate-100">

  <div className="flex items-center justify-between">

    <span className="text-sm font-medium text-emerald-600">
      Open Workspace
    </span>

    <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
      →
    </span>

  </div>

</div>
    </div>
  );
};

export default DocumentCard;