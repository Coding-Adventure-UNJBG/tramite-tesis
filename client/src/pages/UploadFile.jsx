import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import Card from "../components/Card"
import { useNavigate } from 'react-router-dom'
function UploadFile() {

  const { upload } = useAuth() //de momento lo puse por aqui
  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (values) => {
    console.log("form ==> ", values)
    const formData = new FormData()
    formData.append('file', values.file[0])
    const res = await upload(formData)
    if (res.data) navigate('/')
  })

  return (
    <Card>

      <div className='p-5'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col max-w-sm space-y-3 '>
          <input type="file" className='input-style' {...register("file", { required: true })} />
          <p class="mt-1 text-sm text-gray-500 " id="file_input_help">PNG, JPG or PDF (MAX. 10MB).</p>
          {errors.file && (
            <p className="bg-red-500 text-white font-bold text-center p-1.5">Sube una imagen ps</p>
          )}
          <button className='button-style'>Subir</button>
        </form>
      </div>
    </Card>
  )
}

export default UploadFile