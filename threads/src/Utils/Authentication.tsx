import { User } from "./types";

export function SignUpUser(users:User[],values: { username: string; email: string; password: string;})
{
    const newUser: User = { id: (users.length + 11).toString(), ...values };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return newUser;
}

export function LoginUser(user:User|undefined)
{
    localStorage.setItem("currentUser", JSON.stringify(user));
}