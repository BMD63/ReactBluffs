import { createClient } from '@supabase/supabase-js';
import { checkAdmin } from './_lib/checkAdmin.js';
import { mapQuestionRowToDto } from './_lib/mapQuestionRowToDto.js';
import { createQuestionDtoSchema } from '../src/entities/question/api/questionApi.schema.js';

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

    const parsedQuestion = createQuestionDtoSchema.safeParse(request.body);

    if (!parsedQuestion.success) {
      response.status(400).json({
        error: 'Invalid question payload',
        details: parsedQuestion.error.issues,
      });

      return;
    }

    const question = parsedQuestion.data;

    const { data, error } = await supabase
      .from('questions')
      .insert({
        id: question.id,
        type: question.type,
        game_mode: question.gameMode,
        text: question.text,
        answer:
          question.type === 'openText' ||
          question.type === 'image' ||
          question.type === 'audio'
            ? question.answer
            : String(question.correctAnswer),
        aliases:
          question.type === 'openText' ||
          question.type === 'image' ||
          question.type === 'audio'
            ? (question.aliases ?? null)
            : null,
        options: question.type === 'multipleChoice' ? question.options : null,
        category: question.category,
        media_type:
          question.type === 'image' || question.type === 'audio'
            ? question.media.type
            : null,
        media_url:
          question.type === 'image' || question.type === 'audio'
            ? question.media.url
            : null,
        media_alt:
          question.type === 'image' || question.type === 'audio'
            ? (question.media.alt ?? null)
            : null,
      })
      .select()
      .single();

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(201).json(mapQuestionRowToDto(data));

    return;
  }

  if (request.method === 'DELETE') {
    if (!checkAdmin(request, response)) {
      return;
    }

    const id = request.query.id;

    if (typeof id !== 'string') {
      response.status(400).json({
        error: 'Question id is required',
      });

      return;
    }

    const { error } = await supabase.from('questions').delete().eq('id', id);

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(204).end();

    return;
  }

  if (request.method === 'PUT') {
    if (!checkAdmin(request, response)) {
      return;
    }

    const parsedQuestion = createQuestionDtoSchema.safeParse(request.body);

    if (!parsedQuestion.success) {
      response.status(400).json({
        error: 'Invalid question payload',
        details: parsedQuestion.error.issues,
      });

      return;
    }

    const question = parsedQuestion.data;

    const { data, error } = await supabase
      .from('questions')
      .update({
        type: question.type,
        game_mode: question.gameMode,
        text: question.text,
        answer:
          question.type === 'openText' ||
          question.type === 'image' ||
          question.type === 'audio'
            ? question.answer
            : String(question.correctAnswer),
        aliases:
          question.type === 'openText' ||
          question.type === 'image' ||
          question.type === 'audio'
            ? (question.aliases ?? null)
            : null,
        options: question.type === 'multipleChoice' ? question.options : null,
        category: question.category,
      })
      .eq('id', question.id)
      .select()
      .single();

    if (error) {
      response.status(500).json({
        error: error.message,
      });

      return;
    }

    response.status(200).json(mapQuestionRowToDto(data));

    return;
  }

  if (request.method !== 'GET') {
    response.status(405).json({
      error: 'Method not allowed',
    });

    return;
  }

  const gameMode = request.query.gameMode;
  const category = request.query.category;

  let query = supabase.from('questions').select('*');

  if (typeof gameMode === 'string') {
    query = query.eq('game_mode', gameMode);
  }
  if (typeof category === 'string') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    response.status(500).json({
      error: error.message,
    });
    return;
  }

  response.status(200).json(data.map(mapQuestionRowToDto));
}
