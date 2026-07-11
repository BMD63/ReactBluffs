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
  if (request.method === 'POST') {
    if (!checkAdmin(request, response)) {
      return;
    }

    const parsedConfig = tournamentConfigDtoSchema.safeParse(request.body);

    if (!parsedConfig.success) {
      response.status(400).json({
        error: 'Invalid tournament config payload',
        details: parsedConfig.error.issues,
      });

      return;
    }

    const config = parsedConfig.data;

    const { data, error } = await supabase
      .from('tournament_configs')
      .insert({
        id: config.id,
        title: config.title,
        description: config.description,
        rounds: config.rounds,
      })
      .select()
      .single();

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(201).json(mapTournamentConfigRowToDto(data));

    return;
  }

  if (request.method === 'PUT') {
    if (!checkAdmin(request, response)) {
      return;
    }

    const parsedConfig = tournamentConfigDtoSchema.safeParse(request.body);

    if (!parsedConfig.success) {
      response.status(400).json({
        error: 'Invalid tournament config payload',
        details: parsedConfig.error.issues,
      });

      return;
    }

    const config = parsedConfig.data;

    const { data, error } = await supabase
      .from('tournament_configs')
      .update({
        title: config.title,
        description: config.description,
        rounds: config.rounds,
      })
      .eq('id', config.id)
      .select()
      .single();

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(200).json(mapTournamentConfigRowToDto(data));

    return;
  }

  if (request.method === 'DELETE') {
    if (!checkAdmin(request, response)) {
      return;
    }

    const configId = request.query.id;

    if (typeof configId !== 'string') {
      response.status(400).json({
        error: 'Tournament config id is required',
      });

      return;
    }

    const { error } = await supabase
      .from('tournament_configs')
      .delete()
      .eq('id', configId);

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(204).end();

    return;
  }

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
