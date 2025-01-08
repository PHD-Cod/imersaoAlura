import express from "express"
import routes from "./scr/routes/postsRoutes.js"

const app = express()
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
  console.log("Servidor escutando...")
});