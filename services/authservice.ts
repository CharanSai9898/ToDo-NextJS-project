 const BASE_URL = "https://go-assignment-7-production.up.railway.app/todos";


type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayLoad = {
  email:string;
  password:string;
}

export const signup = async (data: SignupPayload) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const login = async(data:LoginPayLoad) =>{
  const  response = await fetch (`${BASE_URL}/login`,{
    method:"POST",
    headers:{
      "content-Type":"application/json",
    },body:JSON.stringify(data),
  })
  return response.json();
}
