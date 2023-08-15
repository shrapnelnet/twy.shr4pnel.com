const getImages = async () => {
    const imageBuffer = await fetch("/api/getSlideshowImages")
    const imageArray = await imageBuffer.json()
    return imageArray
}

const imageArray = getImages()
    .then((images) => {
        const leftArrow = document.getElementById("left-arrow")
        const rightArrow = document.getElementById("right-arrow")
        const image = document.getElementById("slideshow")
        let currentIndex = 0
        
        leftArrow.addEventListener("click", () => {
            if (currentIndex === 0) {
                currentIndex = images.length - 1
                image.src = `/img/slideshow/${images[currentIndex]}`
            } else {
                currentIndex--
                image.src = `/img/slideshow/${images[currentIndex]}`
            }
        })

        rightArrow.addEventListener("click", () => {
            if (currentIndex === images.length - 1) {
                currentIndex = 0
                image.src = `/img/slideshow/${images[currentIndex]}`
            } else {
                currentIndex++
                image.src = `/img/slideshow/${images[currentIndex]}`
            }
        })
    })
    .catch((err) => {
        console.error(err)
    })