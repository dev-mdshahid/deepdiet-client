"use server";

export const loginAction = async (data: FormData) => {
  console.log(data);
  try {
    const reponse = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await reponse.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
