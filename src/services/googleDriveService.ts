export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

export const listDriveFiles = async (accessToken: string): Promise<DriveFileItem[]> => {
  const query = encodeURIComponent("trashed=false and (name contains 'VAAS' or name contains 'Crash' or name contains 'Accident' or mimeType = 'application/json' or mimeType = 'text/plain')");
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=modifiedTime desc&pageSize=25&fields=files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink)`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to fetch files from Google Drive');
  }

  const data = await response.json();
  return data.files || [];
};

export const uploadReportToDrive = async (
  accessToken: string,
  fileName: string,
  fileContent: string,
  mimeType: string = 'application/json'
): Promise<DriveFileItem> => {
  const metadata = {
    name: fileName,
    mimeType: mimeType,
    description: 'Vehicle Accident Alarm System (VAAS) Emergency Telematics Backup'
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    fileContent +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to upload file to Google Drive');
  }

  return await response.json();
};

export const deleteFileFromDrive = async (
  accessToken: string,
  fileId: string
): Promise<void> => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to delete file from Google Drive');
  }
};
