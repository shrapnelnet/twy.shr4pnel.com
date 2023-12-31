import express from "express"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import fs from "fs"
import path from "path"
const app = express()
const port = 3000
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.static("static"))
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"]
        }
    }
}))

function getImages() {
    return fs.readdirSync(path.resolve("./static/img/slideshow"))
}

function getPageImages() {
    return fs.readdirSync(path.resolve("./static/img"))
    .filter((item) => item.includes(".png"))
    .map((item) => {
        item = `/img/${item}`
        return item
    })
}

app.get("/", (_req, res) => {
    const images = getImages()
    const fullImagePathArray = images.map((item) => {return `/img/slideshow/${item}`})
    const pageImages = getPageImages()
    res.render("index.pug", { initialImgSrc: `/img/slideshow/${images[0]}`, pageImages, slideshow: fullImagePathArray})
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