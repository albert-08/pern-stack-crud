import { NextFunction, Request, Response } from 'express';
import { QueryArrayResult, QueryResult } from 'pg';

import pool from '../db';
import { Task } from '../models';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: QueryArrayResult = await pool.query('SELECT * FROM task');
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const response: QueryResult = await pool.query(`SELECT * FROM task WHERE id = ${id}`);
    res.status(200).json(response.rows);
  } catch (error) {
    next(error);
  }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description }: Task = req.body;
    const response: QueryResult = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = +req.params.id;
    const { title, description }: Task = req.body;
    const response = await pool.query(
      'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    await pool.query(`DELETE FROM task WHERE id = ${id}`);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}