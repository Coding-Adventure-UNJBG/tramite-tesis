import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"

function HomePage() {

  const { user } = useAuth()

  return (
    <>
      <Card>
        <div className="m-5 font-mono">
          <h2 className="text-lg">Bienvenido al sistema, {user?.nombre}</h2>
          <p className="mt-5">
            Tu herramienta de gestión de trámites de tesis, estamos aquí para simplificar y agilizar tu proceso de aprobación de proyectos y tesis.
          </p>
          <p>
            Explora el panel y comienza a administrar tus trámites de manera más eficiente.
          </p>
        </div>
      </Card>

    </>
  )
}

export default HomePage