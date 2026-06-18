const fileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();

  let binary = '';

  new Uint8Array(arrayBuffer).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

export const uploadQuestionMedia = async (
  file: File,
  mediaType: 'image' | 'audio',
  adminToken: string
) => {
  const response = await fetch('/api/question-media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': adminToken,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      mediaType,
      fileBase64: await fileToBase64(file),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to upload media');
  }

  return data.url as string;
};
