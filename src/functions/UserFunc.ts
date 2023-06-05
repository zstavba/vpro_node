import { RequestHandler } from "express";
import { request } from "http";
import { Session } from "inspector";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

class UserFunc extends Session {

    getUser = async <User>(userID: number): Promise<any> => {
        const getUser = await AppDataSource.manager.findBy(User, {
            id: userID
        });

        return getUser;
    }

    saveUser = async <User>(userData: any): Promise<any> => {

    }

    updateInformation = async <User>(userData: any): Promise<any> => {

    }

    deleteUser = async <User>(userID: number) : Promise<any> => {

    } 

    saveSession = <User>(requested: any): any | undefined => {
        
    }

    loggout = async  <User>(userID:number, request:any): Promise<any | undefined> => {

        return false;
    }


}

export default UserFunc;