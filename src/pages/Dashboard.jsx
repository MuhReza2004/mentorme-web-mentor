import SideBar from "../components/Sidebar";

const Dashboard = () => (
    <div className="bg-gray-100">
        <div className="flex">
            <SideBar />
            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">My Activity</h2>
                    {/* <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Create Ads
                    </button> */}
                </div>
                <div className="grid grid-flow-col gap-6 overflow-x-auto">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
                        <img
                            src="/src/assets/Icon/Maskot.png"
                            alt="Course 1"
                            className="w-full h-[200px] object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">Pemrograman Web</h3>
                            <p className="mt-2 text-gray-600">Nama Trainee: Mahmud</p>
                            <p className="mt-2 text-gray-600">1 / 4 Lessons</p>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                            <p className="mt-2 text-right text-gray-600">25%</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
                        <img
                            src="/src/assets/Icon/Maskot.png"
                            alt="Course 2"
                            className="flex items-center w-full h-[200px] object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">Pemrograman Web</h3>
                            <p className="mt-2 text-gray-600">Nama Trainee: Mahmud</p>
                            <p className="mt-2 text-gray-600">2 / 4 Lessons</p>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                            <p className="mt-2 text-right text-gray-600">50%</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
                        <img
                            src="/src/assets/Icon/Maskot.png"
                            alt="Course 3"
                            className="w-full h-[200px] object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">Pemrograman Web</h3>
                            <p className="mt-2 text-gray-600">Nama Trainee: Mahmud</p>
                            <p className="mt-2 text-gray-600">3 / 4 Lessons</p>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="mt-2 text-right text-gray-600">75%</p>
                        </div>
                    </div>
                    {/* Add more cards as needed */}
                </div>
            </main>
        </div>
    </div>
);

export default Dashboard;
