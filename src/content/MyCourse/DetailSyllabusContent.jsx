const DetailSyllabusContent = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Judul</h2>
      <input 
        type="text" 
        className="w-full p-2 border rounded-lg mb-4" 
        placeholder="Pertemuan ke-1" 
        readOnly
      />
      
      <h2 className="text-xl font-bold mb-2">Materi Pembelajaran</h2>
      <div className="w-full p-4 border rounded-lg bg-gray-100 mb-4">
        Membuat Website Menggunakan HTML CSS
      </div>
      
      <h2 className="text-xl font-bold mb-2">Tugas</h2>
      <div className="w-full p-4 border rounded-lg bg-gray-100">
        Membuat Layout Sederhana mengenai profile diri
      </div>
    </div>
  );
};

export default DetailSyllabusContent;
