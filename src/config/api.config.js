export const IS_DEV = __DEV__;
export const IS_PRODUCTION = !IS_DEV;

export const DEV_ENV = {
  API_DOMAIN: 'http://192.168.1.11:3000',
}

//We will build the project with development values while we dont have API in production, for that 
//reason the values are the same in both environments
export const PRODUCTION_ENV = {
  API_DOMAIN: 'http://192.168.1.11:3000', 
}

export const ENVIRONMENT = IS_DEV ? DEV_ENV : PRODUCTION_ENV

export const API_URL = ENVIRONMENT.API_DOMAIN 