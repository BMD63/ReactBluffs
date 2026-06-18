import { createClient } from '@supabase/supabase-js';
import { checkAdmin } from './_lib/checkAdmin.js';

import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!checkAdmin(request, response)) {
    return;
  }

  const { fileName, contentType, mediaType, fileBase64 } = request.body;

  if (
    typeof fileName !== 'string' ||
    typeof contentType !== 'string' ||
    (mediaType !== 'image' && mediaType !== 'audio') ||
    typeof fileBase64 !== 'string'
  ) {
    response.status(400).json({ error: 'Invalid media payload' });
    return;
  }

  const fileBuffer = Buffer.from(fileBase64, 'base64');

  if (fileBuffer.byteLength > MAX_FILE_SIZE_BYTES) {
    response.status(400).json({ error: 'File is too large' });
    return;
  }

  const extension = fileName.split('.').pop() ?? 'bin';
  const filePath = `${mediaType}s/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from('question-media')
    .upload(filePath, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    response.status(500).json({ error: error.message });
    return;
  }

  const { data } = supabase.storage
    .from('question-media')
    .getPublicUrl(filePath);

  response.status(201).json({
    url: data.publicUrl,
    path: filePath,
  });
}
