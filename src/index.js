import app from './app.js'
import sequelize from './config/db.js'

sequelize //conexion a la base de datos
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})