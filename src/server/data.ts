"use server";

export const getStudents = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students`,
      {
        cache: "no-store",
      }
    ).then(async function (res) {
      const status = res.status;
      const data = await res.json();
      return { data, status };
    });
    return response;
  } catch {
    alert("Failed to fetch Students.");
  }
};

export const getStudent = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students/${id}`
    ).then(async function (res) {
      const status = res.status;
      const data = await res.json();
      return { data, status };
    });
    return response;
  } catch{
    alert("Failed to fetch Student.");
  }
};