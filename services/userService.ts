import { User } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import bcrypt from "bcrypt";


export const registerUser = async (username: string,password: string): Promise<string> => {
    const users: User[] = await readFromJsonFile();
    const existingUser = users.find((u) => u.username === username);
  
    if (existingUser) {
      throw new Error("Username already exists.");
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUserId: string = uuidv4();
    
    const newUser: User = {
      id: newUserId ,
      username,
      password: hashedPassword,
      books: [],
    };
  
    await writeUserToJsonFile(newUser);
    return newUserId;
  };
  
  export const authenticateUser = async (username: string, password: string): Promise<string> => {
    const users: User[] = await readFromJsonFile();
    const userFind = users.find((u) => u.username === username);
  
    if (!userFind) {
      throw new Error("Invalid username or password.");
    }
  
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }
  
    return userFind.id? userFind.id : ''; // just for typescript not to be mad
  };