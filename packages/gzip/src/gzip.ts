const { read,write } = require("@eofol-util/fs")
const gzip = require("gzip-js")

const COMPRESS_GZIP_LEVEL = 9

const gzipOptions = {
    level: COMPRESS_GZIP_LEVEL,
}

const byteArrayToString = (bytes) => String.fromCharCode.apply(null, bytes)

export const zip = (sourcePath, targetPath, filename) => {
    write(
        targetPath,
        byteArrayToString(
            gzip.zip(read(sourcePath), {
                ...gzipOptions,
                name: filename,
                timestamp: parseInt((Date.now() / 1000).toString(), 10),
            }),
        ),
    )
}
