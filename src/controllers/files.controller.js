const controllers = {}

controllers.uploadFile = async (req, res) => {
  try {
    console.log("Controllers Upload")
    console.log("Datos del archivo: ", req.file)
    res.status(200).json({ filename: req.file.filename })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
} 

export default controllers