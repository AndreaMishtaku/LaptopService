import CryptoJS from 'crypto-js';

class LocalStorageManager{
    public static setItem(key:string,value:string){
        const encryptedData = CryptoJS.AES.encrypt(value, process.env.REACT_APP_LOCAL_KEY).toString();
        localStorage.setItem(key,encryptedData);  
    }


    public static getItem(key:string){
        const item=localStorage.getItem(key);
        if(item){
            const decryptedData = CryptoJS.AES.decrypt(localStorage.getItem(key), process.env.REACT_APP_LOCAL_KEY).toString(CryptoJS.enc.Utf8);
            return decryptedData;
        }
        return null

    }

    public static removeItem(key:string){
        localStorage.removeItem(key);
    }
}

export default LocalStorageManager;