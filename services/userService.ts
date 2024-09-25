import { Book, User } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import bcrypt from "bcrypt";
import { tryToGetBook } from "../otherAPI/requestForOtherAPI.js";


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
      username: username,
      password: hashedPassword,
      books: []
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
  
    return userFind.id!; // just for typescript not to be mad
  };

export async function ifUserIdExists (userId: string) : Promise<number> {
    const myUsers = await readFromJsonFile();
    if(!myUsers){
        throw new Error("there is not users in the DB");
    }
    const userIndex = myUsers.findIndex((user) => user.id === userId);
    return userIndex;
  }

export async function createNewBook(title: string, userId: string) {
    // the details should be in the body not in the query...
    // maybe middleware for that..
    // maybe the service should get the whole book details and here to create it..

    try{

        const userIndex: number = await ifUserIdExists(userId);
        if(userIndex < 0){
            throw new Error(`user with id ${userId} not founded`);
        }

        const searchBook = await tryToGetBook(title);
        
        const newBook: Book = {
            title: searchBook.title,
            author: searchBook.author_name[0]
        };
        newBook.id = uuidv4();

        const myUsers: User[] = await readFromJsonFile();
        if(!myUsers){
            throw new Error("there isn't any users at all");
        }
        console.log(`userIndex = ${userIndex}, user in this index = ${myUsers[userIndex]}`);
        
        myUsers[userIndex].books.push(newBook);
        await writeUserToJsonFile(myUsers[userIndex]);

        const resultDetails = {
            bookDetails: `title: ${newBook.title}, author: ${newBook.author}`,
            bookId: newBook.id
        };
        return resultDetails; 
    }
    catch(error: any){
        throw new Error("hefhjfbhcdhjhj" + error.message);
    }
}