import express from "express"
import compression from "compression"
import cors from "cors"
import fs from "fs"
import path from "path"
const app = express()
const port = 3000
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.static("static"))

function getImages() {
    return fs.readdirSync(path.resolve("./static/img/slideshow"))
}

app.get("/", (_req, res) => {
    const images = getImages()
    res.render("index.pug", { initialImgSrc: `/img/slideshow/${images[0]}`})
})

app.get("/api/getSlideshowImages", (_req, res) => {
    const slideshowImages = getImages()
    return res.json(slideshowImages)
})

app.listen(port, (err) => {
    if (err)
        console.error(err)
    else 
        console.log(`Server running on port ${3000}`)
})