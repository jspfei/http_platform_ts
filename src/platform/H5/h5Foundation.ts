import {IFoundation} from "../Foundation";
import {param} from "../Parameters";
import {account} from "../Platform";
import {objectToHttplink} from "../../core/UtilityFunctions";

export   class ccFoundation implements IFoundation {
    // 存储
    setStorage(key: string, value: string) {

    }
    // 读取
    getStorage(key: string): string {

        return ""
    }
    // 删除
    removeStorage(key: string): string {
        let data: string =  ""
        return data
    }
    // 存储-服务器
    setStorageRemote(key: string, value: string, success?: () => void, failed?: () => void, target?: any) {
        let obj: any = {}
        obj.gameid = param.gameID
        obj.openid = account.openid
        obj.key = key
        obj.value = value
        this.httpRequest("", obj, param.urlSetStorage, undefined,
            (res) => {
                if (success) {
                    if (target) {
                        success.call(target, res)
                    } else {
                        success()
                    }
                }
            }, () => {
                if (failed) {
                    if (target) {
                        failed.call(target)
                    } else {
                        failed()
                    }
                }
            })
    }
    // 读取-服务器
    getStorageRemote(key: string, success?: (value: string) => void, failed?: () => void, target?: any) {
        let obj: any = {}
        obj.gameid = param.gameID
        obj.openid = account.openid
        obj.key = key
        this.httpRequest("", obj, param.urlGetStorage, undefined,
            (res) => {
                if (res.data) {
                    let value = res.data.value
                    if (success) {
                        if (target) {
                            success.call(target, value)
                        } else {
                            success(value)
                        }
                    }
                } else {
                    if (success) {
                        if (target) {
                            success.call(target, res)
                        } else {
                            success(res)
                        }
                    }
                }
            }, () => {
                if (failed) {
                    if (target) {
                        failed.call(target)
                    } else {
                        failed()
                    }
                }
            })
    }
    //网络连接
    httpRequest(action: string, kv: { [p: string]: any }, host?: string, method?: string, success?: (res: any) => void, failed?: () => void, target?: any): any {
        host = host || param.urlHTTPS
        method = method || param.urlMethod
        if (method.toLowerCase() === "get") {
            method = "GET"
        } else if (method.toLowerCase() === "post") {
            method = "POST"
        } else {
            // TODO:其他类型?咱也不需要哇
            method = "GET"
        }
        if (method === "GET") {
            let content = action + "?"
            let component = objectToHttplink(kv)
            content += component
            console.log(`get request :${host} with content:${content}`)
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var res = null
                        try {
                            res = xhr.responseText.length > 0 ? JSON.parse(xhr.responseText) : xhr.responseText;
                        }
                        catch (e) {
                            console.error(`严重错误!!!${e}`)
                        }
                        console.log(`http request success with target:${host} action:${action} content:${content} response:${JSON.stringify(res)}`)
                        if (success) {
                            if (target) {
                                success.call(target, { data: res })
                            } else {
                                success({ data: res })
                            }
                        }
                    } else {
                        console.error(`http request FAILED with target:${host} action:${action} content:${content} response:-----`)
                        if (failed) {
                            if (target) {
                                failed.call(target)
                            } else {
                                failed()
                            }
                        }
                    }
                }
            }
            xhr.open("GET", `${host}/${content}`, true)
            xhr.send()
        } else if (method === "POST") {
            let content = objectToHttplink(kv)//JSON.stringify(kv)
            console.log(`post request!!!!!`)
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var res = null
                        try {
                            res = xhr.responseText.length > 0 ? JSON.parse(xhr.responseText) : xhr.responseText;
                        }
                        catch (e) {
                            console.error(`严重错误!!!${e}`)
                        }
                        console.log(`http request success with target:${host} action:${action} content:${content} response:${JSON.stringify(res)}`)
                        if (success) {
                            if (target) {
                                success.call(target, { data: res })
                            } else {
                                success({ data: res })
                            }
                        }
                    } else {
                        console.error(`http request FAILED with target:${host} action:${action} content:${content} response:-----`)
                        if (failed) {
                            if (target) {
                                failed.call(target)
                            } else {
                                failed()
                            }
                        }
                    }
                }
            }
            xhr.open("POST", `${host}/${action}`, true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(content)
        }

    }

    initialize(): any {
    }


}