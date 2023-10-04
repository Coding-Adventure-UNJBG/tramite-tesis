const controllers = {}

controllers.uploadFile = async (req, res) => {
  try {
    console.log("Controllers Upload")
    console.log("Datos del archivo: ", req.file)
    res.status(200).send("File saved")
  } catch (error) {
    console.log(error)
  }
}

export default controllers