import { useParams } from "react-router-dom";
import { getActivityTrainee } from "../../services/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const TraineeProgressContent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // <- Tambah state loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getActivityTrainee(id);
        setData(res.data);
        console.log("DATA:", res.data); // <- Log data yang diterima
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // <- Setelah data berhasil/gagal di-fetch
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />;
      </div>
    ); // <- Animasi loading kamu ditampilkan di sini
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Trainee Progress</h1>
      <div className="space-y-4">
        {data.train.map((item, index) => (
          <div key={index}>
            <p>
              <strong>Meeting:</strong> {item.trainActivity.meeting}
            </p>
            <p>
              <strong>Material:</strong>{" "}
              {item.trainActivity.materialNameSyllabus}
            </p>
            <p>
              <strong>Task:</strong> {item.trainActivity.task}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraineeProgressContent;
