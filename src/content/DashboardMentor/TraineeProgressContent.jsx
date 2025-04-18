import { useParams } from "react-router-dom";
import { getActivityTrainee } from "../../services/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { BookOpen, ClipboardList, FileText } from "lucide-react";

const TraineeProgressContent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getActivityTrainee(id);
        setData(res.data);
        console.log("DATA trainee:", res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
                {item.trainActivity.task}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraineeProgressContent;
