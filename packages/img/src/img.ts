import sharp from "sharp"
import {optimize} from "svgo"
import {read} from "@eofol-utils/fs"

const IMAGE_PROCESSING_INCLUDE_METADATA = false

const processGeneral = (callback) => (filePath) => {
    const data = callback(sharp(filePath))
    const processed = IMAGE_PROCESSING_INCLUDE_METADATA ? data.withMetadata() : data
    return processed.toBuffer()
}

export const processJpeg = processGeneral((x) => x.jpeg(jpegOptions))

export const processPng = processGeneral((x) => x.png(pngOptions))

export const processGif = processGeneral((x) => x.gif(gifOptions))

export const processSvg = (filePath) => optimize(read(filePath).toString(), svgOptions(filePath)).data

const jpegOptions = { quality: 25, mozjpeg: true, force: true }

const pngOptions = { compressionLevel: 9, quality: 60, effort: 10, adaptiveFiltering: true, force: true }

const gifOptions = { force: true }

const svgOptions = (filePath) => ({
    path: filePath,
    multipass: true,
})
