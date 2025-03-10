"use server";

import {getStudent} from "./data";

export const getStudentFromDB = async (id: number) => {
  const res = await getStudent(id);
  return res;
};