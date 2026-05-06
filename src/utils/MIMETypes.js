export function getMIMEType({ fileName }) {

    console.log("fileName", fileName);
 
   // if (!!fileName === false || !fileName.includes(".")) return;

    let mimeType;
    //const ext = fileName.split(".")[1];
    const ext = "PNG";
    console.log("extext", ext);
    switch (ext) {
        case "pdf":
            mimeType = "appliction/pdf";
            break;
        case "PNG":
            mimeType = "image/png;base64";
            break;
        case "JPG":
            mimeType = "image/jpeg";
            break;
        case "jpg":
            mimeType = "image/jpeg";
    }
    return mimeType;
}