import { createClient } from '@supabase/supabase-js';

import { checkAdmin } from './_lib/checkAdmin.js';
import { mapTournamentConfigRowToDto } from './_lib/mapTournamentConfigRowToDto.js';
import { tournamentConfigDtoSchema } from '../src/entities/tournament-config/api/tournamentConfigApi.schema.js';

import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'GET') {
    response.status(405).json({
      error: 'Method not allowed',
    });

    return;
  }

  const configId = request.query.id;

  if (typeof configId === 'string') {
    const { data, error } = await supabase
      .from('tournament_configs')
      .select('*')
      .eq('id', configId)
      .maybeSingle();

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(200).json(data ? mapTournamentConfigRowToDto(data) : null);

    return;
  }

  const { data, error } = await supabase.from('tournament_configs').select('*');

  if (error) {
    response.status(500).json({
      error: error.message,
    });

    return;
  }

  response.status(200).json(data.map(mapTournamentConfigRowToDto));
}
