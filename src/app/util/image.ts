
export async function fileToSrcURL(f: File): Promise<string | ArrayBuffer> {
  return new Promise<string | ArrayBuffer>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      return resolve(reader.result);
    };
    reader.readAsDataURL(f);
  });
}

export function blobToFile(theBlob: Blob, fileName: string): File {
  const b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return theBlob as File;
}
