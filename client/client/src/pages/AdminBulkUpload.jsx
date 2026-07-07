import { useState } from "react";
import { Upload, FileSpreadsheet, Download } from "lucide-react";
import { bulkUploadProducts } from "../api/productApi";

export default function AdminBulkUpload() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;

    setFile(e.target.files[0]);

    setResult(null);

    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select an Excel file");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const { data } = await bulkUploadProducts(formData);

      setResult(data);

      setMessage(data.message);
    } catch (err) {
      console.log(err);

      setMessage(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-center mb-3">
          Bulk Product Upload
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Upload products using an Excel (.xlsx) file
        </p>
        {/* Upload Result */}


        {/* Upload Card */}

        <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 text-center bg-indigo-50">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
              <FileSpreadsheet size={40} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-3">Select Excel File</h2>

          <p className="text-gray-500 mb-6">Supported format: .xlsx</p>

          <input
            type="file"
            accept=".xlsx,.xls"
            id="excelFile"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="excelFile"
            className="cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            <Upload size={20} />
            Choose File
          </label>

          {file && (
            <div className="mt-6">
              <p className="text-green-600 font-semibold">Selected File</p>

              <p className="text-lg font-bold mt-2">{file.name}</p>

              <p className="text-gray-500 mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-8 w-full py-4 rounded-xl text-white font-bold text-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Uploading Products..." : "Upload Products"}
          </button>
        </div>

        {/* Summary */}

        {result && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-200">
              <h3 className="text-lg font-semibold text-gray-600">Uploaded</h3>

              <p className="text-5xl font-bold text-green-600 mt-3">
                {result.uploaded}
              </p>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 text-center border border-red-200">
              <h3 className="text-lg font-semibold text-gray-600">Skipped</h3>

              <p className="text-5xl font-bold text-red-600 mt-3">
                {result.skipped}
              </p>
            </div>
          </div>
        )}

        {/* Sample Excel */}

        <div className="mt-10 text-center">
          <a
            href="/sample-products.xlsx"
            download
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
          >
            <Download size={20} />
            Download Sample Excel
          </a>
        </div>
      </div>
    </div>
  );
}
