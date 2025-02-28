import NavbarMentor from "../components/NavbarMentor"
import SideBar from "../components/Sidebar"
import MateriPembelajaranContent from "../content/MyCourse/MateriPembelajaranContent"

const MateriPembelajaranLayout = () => {
    return (
        <div className="flex">
      <SideBar />
      <main className="flex-1 pt-0">
        <NavbarMentor />
        <MateriPembelajaranContent />
      </main>
    </div>
    )
}

export default MateriPembelajaranLayout