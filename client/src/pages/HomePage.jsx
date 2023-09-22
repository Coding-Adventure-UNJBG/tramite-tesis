import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"

function HomePage() {
  return (
    <>
      <Card>
        <h2 className="mx-5 my-3 font-bold text-2xl">HomePage</h2>
      </Card>
      <Card>
        <h2 className="font-mono">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia saepe molestiae odit, deleniti fugit, facere earum ut impedit incidunt voluptatibus ipsum quis ex unde veritatis aut vel itaque consequatur soluta.</h2>
      </Card>

    </>
  )
}

export default HomePage