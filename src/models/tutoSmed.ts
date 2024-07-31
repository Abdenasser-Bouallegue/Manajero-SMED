export interface tutoSMED {
  idTuto?: string;
  why: string;
  what: string;
  how: string;
  what_if: string;
  createdDate?: Date;
  image_how?:File;
  image_what?: File;
  url?: string | ArrayBuffer
}
