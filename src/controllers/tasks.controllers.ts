import { Request, Response } from 'express';
import { QueryArrayResult, QueryResult } from 'pg';

import pool from '../db';
import { Task } from '../models';

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryArrayResult = await pool.query('SELECT * FROM task');
    return res.status(200).json(response.rows);
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error}`);
  }
}

export const getTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = +req.params.id;
    const response: QueryResult = await pool.query(`SELECT * FROM task WHERE id = ${id}`);
    return res.status(200).json(response.rows);
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error}`);
  }
}

export const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description }: Task = req.body;
    const response: QueryResult = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return res.json(response.rows);
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error}`);
  }
}

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: number = +req.params.id;
    const { title, description }: Task = req.body;
    await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3', [title, description, id]);
    return res.json(`User ${id} Updated Successfully!`);
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error}`);
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = +req.params.id;
    await pool.query(`DELETE FROM task WHERE id = ${id}`);
    return res.json(`User ${id} Deleted Succesfully!`);
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error}`);
  }
}