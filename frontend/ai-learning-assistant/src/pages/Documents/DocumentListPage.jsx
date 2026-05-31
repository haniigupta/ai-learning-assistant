import React, { useState, useEffect } from 'react';
import { Plus, Upload, FileText, } from 'lucide-react'
import toast from 'react-hot-toast'

import documentService from '../../services/documentService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import DocumentCard from '../../components/documents/DocumentCard';
import { useNavigate } from 'react-router-dom';

const DocumentListPage = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // state for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  // state for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchDocuments = async () => {
    
    try {
      const data = await documentService.getDocuments();
      setDocuments(data)

    } catch (error) {
      toast.error('Failed to fetch documents.')

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("please provide a title and select a file")
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle)

    try {
      await documentService.uploadDocument(formData);
      toast.success("document uploaded successfully!")
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    } catch (error) {
      toast.error(error.message || "Upload failed.")
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRequest = (doc) => {
    console.log("DELETE CLICKED", doc);

    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;
    setDeleting(true);
    try {
      await documentService.deleteDocument(selectedDoc._id);
      toast.success(`'${selectedDoc.title}' deleted.`);
      setIsDeleteModalOpen(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
    } catch (error) {
      toast.error(error.message || "failed to delete doc");
    } finally {
      setDeleting(false);
    }
  };

  const renderContent = () => {

    if (loading) {
      return <Spinner />;
    }

    if (documents.length === 0) {
      return (
        <div className="bg-gradient-to-br from-white to-slate-50 border border-dashed border-slate-300 rounded-[32px] p-16 text-center shadow-sm">

          <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-100 flex items-center justify-center mb-8">
            <FileText className="w-10 h-10 text-emerald-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Documents Yet
          </h2>

          <p className="text-gray-500 mb-8">
            Upload your first document to start learning with AI.
          </p>

          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-7 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <Upload className="w-5 h-5 mr-2" />
            Upload First Document
          </Button>

        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {documents.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="min-h-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

            <div className="flex-1">

              <p className="text-emerald-600 font-medium mb-2">
                Knowledge Base
              </p>

              <h1 className="text-5xl font-bold text-gray-900">
                My Documents
              </h1>

             

            </div>

            {documents.length > 0 && (
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-7 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                Upload Document
              </Button>
            )}
          </div>

          {/**document counter */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                Total Documents
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {documents.length}
              </h2>

            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

              <p className="text-sm text-slate-500">
                AI Search
              </p>

              <h2 className="text-2xl font-bold mt-3 text-emerald-600">
                Enabled
              </h2>

            </div>

            <button
  onClick={() => {
    if (documents.length > 0) {
      const latestDoc = documents[documents.length - 1];
      navigate(`/documents/${latestDoc._id}`);
    }
  }}
  className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>

  <p className="text-emerald-100">
    Ready To Learn
  </p>

  <h2 className="text-xl font-bold mt-2">
    Ask questions about your documents
  </h2>

</button>

          </div>

          {renderContent()}

          {isUploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

              <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold">
                    Upload Document
                  </h2>

                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>

                </div>

                <form onSubmit={handleUpload} className="space-y-4">

                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Document Title"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF File
                    </label>

                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-700
      file:mr-4
      file:py-2
      file:px-4
      file:rounded-lg
      file:border-0
      file:bg-emerald-50
      file:text-emerald-700
      hover:file:bg-emerald-100
      cursor-pointer"
                    />
                  </div>
                  {uploadFile && (
                    <p className="text-sm text-green-600">
                      Selected: {uploadFile.name}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-[#00d492] text-white"
                  >
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button>

                </form>

              </div>

            </div>
          )}

          {isDeleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">

                <h2 className="text-xl font-semibold mb-3">
                  Delete Document
                </h2>

                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete
                  <span className="font-semibold">
                    {" "}{selectedDoc?.title}
                  </span>?
                </p>

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setSelectedDoc(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleConfirmDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DocumentListPage;

