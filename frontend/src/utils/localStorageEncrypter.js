
import { EncryptStorage } from 'encrypt-storage'

export const UserProfileStorage = new EncryptStorage("POSTDEVENCRYPTION", {
    storageType: 'sessionStorage', // or 'sessionStorage'
    stateManagementUse: true, // Automatically update state when storage changes
    prefix: 'postdev_', // Adds a prefix to stored keys (useful for namespacing)
    encAlgorithm: 'AES', // Encryption algorithm (default is AES)
  });


 export const UserProfileStorageSetter = async(getterkey, value) => {
    UserProfileStorage.setItem(getterkey, value);
    return {status:201, message:"Succesfully updated ..."}
  };

 export const UserProfileStorageGetter = async(getterkey) => {
    return {
        status : 201,
        data : UserProfileStorage.getItem(getterkey),
        message : "Succesfull"
    }
  }

  export const RemoveData = async(getterkey) => {
    UserProfileStorage.removeItem(getterkey);
    return {
        status : 201,
        message : "Succesfull"
    }
  }