import {IAccount, IUserPrivateInfo} from "../Account";

export class ccAcount implements IAccount{
    isLogin(): boolean{
        return true
    }
    login (success: (id: string, isnew?: boolean, player?: IUserPrivateInfo) => void, failed?: () => void, target?: Object){
       if (success) {
            if (target) {
                success.call(target, "")
            } else {
                success("")
            }
        }
    }
    // openid(用户唯一标识)
    get openid(): string {
        return "11111111111111111"
    }

}