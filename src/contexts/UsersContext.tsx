import { useContext,createContext, ReactNode } from "react";
import { useQuery } from "react-query";

interface createContextType{
    users:User[] |undefined,
    isLoading:boolean,
    error:unknown
}
const UserContext=createContext<createContextType | undefined>(undefined)
 export const useUserContext=()=>{
    const context=useContext(UserContext)
    if(!context){
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context;
 }

 export const UsersProvider=({children}:{children:ReactNode})=>{
    const { data: users, isLoading, error } = useQuery<User[], Error>('users', async () => {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.users;
      });
    
      return (
        <UserContext.Provider value={{ users, isLoading, error }}>
          {children}
        </UserContext.Provider>
      );
 }