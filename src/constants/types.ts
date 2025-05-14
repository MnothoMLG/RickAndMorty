export interface ICallBacks {
  onSuccess?: (msg: string) => void;
  onFailure?: (reason: string) => void;
}

export interface IGenericResponse {
  message: string;
}

export enum EToastTypes {
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum EButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export interface ToastConfig {
  type: EToastTypes;
  message: string;
  description?: string;
  topOffset?: number;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
