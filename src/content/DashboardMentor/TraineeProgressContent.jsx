import { useParams } from "react-router-dom";
import { getActivityTrainee } from "../../services/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { BookOpen, ClipboardList, FileText, Download } from "lucide-react";

const TraineeProgressContent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfPreview, setPdfPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getActivityTrainee(id);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isPdfFile = (url) => {
    return url?.toLowerCase().endsWith(".pdf");
  };

  const handlePreviewPdf = (pdfUrl) => {
    setPdfPreview(pdfUrl);
  };

  const handleClosePreview = () => {
    setPdfPreview(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-teal-600">
        📚 Trainee Progress
      </h1>

      {/* PDF Preview Modal */}
      {pdfPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center bg-gray-100 p-4 sticky top-0">
              <h2 className="font-bold">PDF Preview</h2>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="h-[80vh]">
              <iframe
                src={pdfPreview}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
            <div className="flex justify-end p-4 bg-gray-100 sticky bottom-0">
              <a
                href={pdfPreview}
                download
                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {data.train.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              <BookOpen className="w-5 h-5 text-teal-500" />
              Meeting:{" "}
              <span className="ml-1 font-semibold text-gray-900">
                {item.trainActivity.meeting}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
              <ClipboardList className="w-5 h-5 text-indigo-500" />
              Material:
              <span className="ml-1 font-semibold text-gray-900">
                {item.trainActivity.materialNameSyllabus}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FileText className="w-5 h-5 text-rose-500" />
              Task:
              <span className="ml-1 font-semibold text-gray-900">
                {isPdfFile(item.trainActivity.task) ? (
                  <div className="flex items-center gap-2">
                    <span>PDF Document</span>
                    <a
                      href={item.trainActivity.task}
                      download
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                ) : (
                  item.trainActivity.task
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraineeProgressContent;
