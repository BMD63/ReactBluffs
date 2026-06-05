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
          question.type === 'openText'
            ? question.answer
            : String(question.correctAnswer),
        aliases:
          question.type === 'openText' ? (question.aliases ?? null) : null,
        options: question.type === 'multipleChoice' ? question.options : null,
        category: question.category,
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
          question.type === 'openText'
            ? question.answer
            : String(question.correctAnswer),
        aliases:
          question.type === 'openText' ? (question.aliases ?? null) : null,
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

  console.time('[api/questions] total');
  console.log('[api/questions] method', request.method);

  const gameMode = request.query.gameMode;
  const category = request.query.category;

  let query = supabase.from('questions').select('*');

  if (typeof gameMode === 'string') {
    query = query.eq('game_mode', gameMode);
  }
  if (typeof category === 'string') {
    query = query.eq('category', category);
  }

  console.time('[api/questions] supabase select');

  const { data, error } = await query;

  console.timeEnd('[api/questions] supabase select');
  console.timeEnd('[api/questions] total');

  if (error) {
    response.status(500).json({
      error: error.message,
    });
    return;
  }

  response.status(200).json(data.map(mapQuestionRowToDto));
}
