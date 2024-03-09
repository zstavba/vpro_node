import { get } from "http";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserInformation } from "../entity/UserInformation";
import { ZipCode } from "../entity/ZipCode";
import { Counrty } from "../entity/Country";
import { Folder } from "../entity/Folder";
import * as bcrypt from 'bcrypt';
import * as fs from 'fs'; 
import FolderFun from "../functions/FolderFunc";
import { error } from "console";

enum FolderType {
    MERITVE = 'meritve',
    TEHNOLOGIJA = 'tehnologija',
    KONTROLNI_PLAN = 'kontrolni plan',
    NAPAKE = 'vdrževalci napake',
    USERS = 'USERS',
    DEFAULT = 'null',
}

class UserController {

    get =   async (req:any, res:any, next:any) => {
        try {
            const users = await AppDataSource.manager.find(User);

            return res.status(200).json(users);
    
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }

    getUserWithInfo = async (req:any, res:any, next: any) => {
        try {
            const userInfo = await AppDataSource.getRepository(UserInformation)
                                                .createQueryBuilder("UserInformation")
                                                .leftJoinAndSelect('UserInformation.user','User')
                                                .getMany();
            
            return res.status(200).json(userInfo);

        } catch(error) {
            return res.status(401).json(error);
        }
    }

    getFiveCostumers = async (req: any , res:any, next: any) => {
        try {
            let getFive = await AppDataSource.getRepository(UserInformation)
                                             .createQueryBuilder('UI')
                                             .leftJoinAndSelect('UI.user',"User")
                                             .skip(1)
                                             .take(5)
                                             .getMany();

            return res.status(200).json(getFive);

        } catch(error){
            return res.status(401).json({
                message: error.message
            });
        }
    }


    getUserByType = async (req:any, res:any, next: any) => {
        try {
            const getByType = await AppDataSource.getRepository(UserInformation)
                                                 .createQueryBuilder('UserInformation')
                                                 .where({
                                                    user_type: req.params.type
                                                 })
                                                 .leftJoinAndSelect('UserInformation.user','User')
                                                 .getMany();

            return res.status(200).json(getByType);
        } catch (error: any) {
            return res.status(400).json(error)
        }
    }

    gtetUserById = async (req:any, res:any, next: any) => {
        try {
            let findUser = await AppDataSource.manager.findBy(User, {
                id: req.params.id
            })

            if(findUser == undefined || findUser == null)
                throw new Error("Error: Iskan uporabnik ni bil najden, ali pa je odjavljen iz sistema.")

            return res.status(200).json(findUser[0]);

        } catch (error){
            return res.status(400).json(error)
        }
    }

    gerUserInformationById = async (req:any, res:any, next:any) => {
        try {        
            let INFO = await AppDataSource.getRepository(UserInformation)
                                          .createQueryBuilder('UserInformation')
                                          .leftJoinAndSelect('UserInformation.user','User')
                                          .select(['UserInformation', 'User'])
                                          .where('User.id = :userId', { userId: req.params.id })
                                          .getMany();
                                          
            if(INFO == undefined || INFO == null)
                throw new Error('Napaka: Iskan uporabnik ni bil najeden, ali pa je odjavljen iz sistema !');

            return res.status(200).json(INFO[0]);

        } catch(error) {
            return res.status(400).json(error)
        }
    }

    login = async (req, res, next) => {
        try {
            let user = req.body;
            const saltRounds = 10;
            let bcryptPassword = await bcrypt.hash(user['password'], saltRounds);
            let foundUser = await AppDataSource.manager.findBy(User, { username: user['username'] });

            if (!foundUser) {
                throw new Error("Error: User not found");
            }
        
            let foundUserIndex = foundUser.findIndex(u => bcrypt.compareSync(user['password'], u.password));

            if (foundUserIndex === -1) {
                throw new Error("Error: Incorrect password");
            }

            req.session.user = foundUser;

            //console.log(req.session.user);

            return await req.session.save((err) => {
                if(err)
                    throw new Error(`Error: ${err}`)

                if(req.session.user != undefined || req.session.user != null){
                    res.json(foundUser);
                } else {
                    res.json("Napaka: Prijava ni bila uspešna !");
                }   
                    
            });
    

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
        next()

    }


    createNewUser = async (req:any, res:any, next:any) => {
        try {
            const data = req.body;
            const files = req.files;
            const saltPassword = 10;

            let user: User = new User();
            user.firstName = data.user_first_name;
            user.lastName = data.user_last_name;
            user.username = data.user_username;

            let password = await bcrypt.hash(data.user_password, saltPassword);
            user.password = password;      
            user.email = data.user_email;
            user.sex = data.user_sex;
         
            await AppDataSource.manager.save(user);

            let UserInfo: UserInformation = new UserInformation();
            let address = data.user_address.split(',');
            let SplitZipCode = address[1].split(' ');
            let zipcode = await AppDataSource.manager.findBy(ZipCode, {
                attribute: SplitZipCode[1]
            });

            UserInfo.zip_code = zipcode[0];

            let splitCountry = address[2].split(' ')[1].toUpperCase();
            let country = await AppDataSource.manager.findBy(Counrty, {
                name: splitCountry
            });

            UserInfo.country = country[0];
            UserInfo.emsho = data.user_emsho;
            UserInfo.phone_number = data.user_phone_number;
            UserInfo.adress = address[0];
            UserInfo.tax_number = data.user_tax_number;
            UserInfo.user_type = data.user_type;


            let FolderMap: Folder = new Folder();
            FolderMap.title = "users";
            FolderMap.created_at = new Date();
            FolderMap.type = FolderType.USERS;
            FolderMap.fk_user_id = user;

            let path: string = `${process.cwd()}/src/assets/users/${user.username}/profile`;
            let new_path: string = '';
            if(fs.existsSync(path)){
                
                for(let file of files) {
                    new_path = `${path}/${file.path.split('/')[8]}`;
                    fs.rename(file.path, new_path, (error: any) => {
                        if(error)
                            throw new Error(`Napaka: ${error.message}`);
                    });
                    UserInfo.profile_image = file.path.split('/')[8];
                }                
            }
            fs.mkdirSync(path, {recursive: true});
            for(let file of files) {
                new_path = `${path}/${file.path.split('/')[8]}`;
                fs.rename(file.path, new_path, (error: any) => {
                    if(error)
                        throw new Error(`Napaka: ${error.message}`);
                });

                UserInfo.profile_image = file.path.split('/')[8];
            }


            await AppDataSource.manager.save(UserInfo);


            return res.status(200).json("Podatki novega uporabnika so bili uspešno shranjeni !");
        } catch(error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

}

export default UserController;