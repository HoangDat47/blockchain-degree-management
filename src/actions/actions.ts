"use server";

import { Students } from "@/types";
import {getStudent, putStudent } from "./data";

export const getStudentFromDB = async (id: number) => {
  const res = await getStudent(id);
  return res;
};

export const putStudentDB = async (data: Students) => {
  const res = await putStudent(data);
  return res;
};