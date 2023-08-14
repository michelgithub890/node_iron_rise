import express from "express";
// mongo bd
import mongoose from "mongoose"
import cors from "cors";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
// journaux des requêtes HTTP
import morgan from "morgan"
import authRoutes from './routes/AuthRoutes.js'
import routineRoutes from './routes/RoutineRoutes.js'
import exerciseRoutes from './routes/ExercisesRoutes.js'
import workoutRoutes from './routes/WorkOutRoutes.js'
import statsRoutes from './routes/StatsRoutes.js'
import emailRoutes from './routes/EmailRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const mongoUrl=process.env.MONGODB

mongoose.connect(mongoUrl,{
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then(()=>{console.log('Connected to database')})
.catch(e=>console.log(e))

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json())
app.use(routes);

app.use(authRoutes)
app.use(routineRoutes)
app.use(exerciseRoutes)
app.use(workoutRoutes)
app.use(statsRoutes)
app.use(emailRoutes)


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


