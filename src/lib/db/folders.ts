import { Folder } from "@/schemas";
import {
    BaseDBModel,
    UnpackFunction,
    create,
    del,
    get,
    update,
} from "./fireStore";

export interface FolderModel extends BaseDBModel {
    projectId: string;
    name: string;
    path: string[];
    parent: string;
}

const $foldersCollection = "folders";
const unpackFolder: UnpackFunction<Folder> = (doc) => {
    const { parent, name, path } = doc.data()!;
    const folder: Folder = {
        parent,
        name,
        path,
        itemId: doc.id,
        isFolder: true,
    };
    return folder;
};

export const getFolders = async (projectId: string) =>
    await get<Folder, FolderModel>($foldersCollection, unpackFolder, {
        projectId,
    });

export const createFolder = async (data: Partial<FolderModel>) =>
    await create<Folder, FolderModel>($foldersCollection, data, unpackFolder);

export const updateFolder = async (id: string, data: Partial<FolderModel>) =>
    await update<Folder, FolderModel>(
        $foldersCollection,
        id,
        data,
        unpackFolder
    );

export const deleteFolders = async (ids: string[]) =>
    await del($foldersCollection, ids);
