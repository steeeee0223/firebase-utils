import { User } from "firebase/auth";

type BaseItem = {
    /**
     * @field parent id of this file/folder
     * if the item has no parent, will set to `root`
     */
    parent: string;
    /**
     * @field the id of this file/folder
     */
    itemId: string;
    /**
     * @field the field to decide if it is a folder or a file
     */
    isFolder: boolean;
    /**
     * @field the name of this file/folder
     */
    name: string;
    /**
     * @field an array of names from its parent to `root`
     * @example ["root", ..., <parentName>]
     */
    path: string[];
    /**
     * @deprecated
     * @field description of this file/folder
     */
    desc?: string;
};

export type Folder = BaseItem & {
    isFolder: true;
    /**
     * @field an array of its first layer children, including folders or files
     */
    children?: DirectoryItem[];
};

export type File = BaseItem & {
    isFolder: false;
    /**
     * @field the file extension of this file
     */
    extension: string;
    /**
     * @field the content of the file
     */
    content: string;
};

export type DirectoryItem = Folder | File;

export type UploadFile = globalThis.File;
export type CreatedBy = Pick<User, "uid" | "displayName" | "email">;
export type Project = {
    projectId: string;
    name: string;
    template: string;
    tags: string[];
    createdBy: CreatedBy;
    lastModifiedAt: Date;
};
