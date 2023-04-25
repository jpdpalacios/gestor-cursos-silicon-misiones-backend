const path = require('path');

const imageController = {
    showImageCourse: (req, res) => {
        try {
            let image = path.join(__dirname, "./../../../../public/images/courses", req.params.id);
            return res.sendFile(image);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Ocurrió un error al intentar mostrar la imagen.");
        }

    }
}

module.exports = imageController