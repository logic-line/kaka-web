import config from "@/config";

export const UploadnewFilePromise = async function (newFile: any): Promise<string> {
    // make new form data
    let newformData = new FormData();
    newformData.append('method', 'POST');
    newformData.append('file', newFile);
    newformData.append('Content-Type', 'multipart/form-data');

    // Fetch post
    let filePathPromise = fetch(config.fileManagerUrl+'/upload', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: newformData,
    })
        .then((response) => response.json())
        .then((data) => {
            return data.path.toString(); // Convert to string
        })
        .catch((error) => {
            return '';
        });
    const path = await filePathPromise;
    return path;
};

export const GetFileHash = function(filepath:string):string {
    var regex = /\/get\/([^/]+)$/;
    var match = filepath.match(regex);

    if (match) {
        var desiredPart = match[1];
        return desiredPart
    } else {
        
    }
    return ""
}

export const DeleteFile = function (fileHash: string) {
    fetch(config.fileManagerUrl+'/delete/' + fileHash)
        .then((response) => {
            if (response.ok) {
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .catch((error) => {
        });
}

export default {
    UploadnewFilePromise,
    GetFileHash,
    DeleteFile,
  };