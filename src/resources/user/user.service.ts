import userModel from "@/resources/user/user.model";
import Token from "@/utils/token"

class UserService {
    private user = userModel
    
    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
    ): Promise<string | Error>{
        try {
            const user = await this.user.create({name,email,password,role});
            const accessToken = Token.createToken(user);
            return accessToken

        } catch (e) {
            throw new Error("Unable to create user")
        }
    }

    public async login(
        email:string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});

            if(!user){
                throw new Error("Unable to find user with this Email ")
            }
            
            if(await user.isValidPassword(password)){
                return Token.createToken(user)
            }
            else{
                throw new Error("Wrong credentials given")
            }
        } catch (e) {
            throw new Error("Wrong credentials given")
        }
    }
}

export default UserService