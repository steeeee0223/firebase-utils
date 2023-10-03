import { useState } from "react";
import {
    createFile,
    createFolder,
    createProject,
    deleteFolders,
    deleteProjects,
    getFiles,
    getFolders,
    getProjects,
    updateProject,
} from "./lib/db";

const utils = {
    projectId: "test-project-id",
    userId: "VsSrCXoRwBdv1LOATqUdQD3IcF33",
};
const testUtils = {
    createProject: {
        name: "test",
        template: "react",
        tags: ["React"],
    },
    createFolder: {
        name: "test-folder",
        parent: "root",
        projectId: utils.projectId,
        path: ["root"],
    },
    createFile: {
        name: "test-file.txt",
        parent: "root",
        projectId: utils.projectId,
        path: ["root"],
    },
};
function App() {
    const [testProjectId, setTestProjectId] = useState(utils.projectId);

    const handleFireStoreGet = async () => {
        const projects = await getProjects(utils.userId);
        const folders = await getFolders(testProjectId);
        const files = await getFiles(testProjectId);
        console.log({ projects, folders, files });
    };

    const handleFireStoreCreate = async () => {
        const project = await createProject(testUtils.createProject);
        const folder = await createFolder(testUtils.createFolder);
        const file = await createFile(testUtils.createFile);
        console.log({ project, folder, file });
        setTestProjectId(project.projectId);
    };

    const handleFireStoreUpdate = async () => {
        const project = await updateProject(testProjectId, {
            name: "test-rename",
        });
        console.log({ project });
    };

    const handleFireStoreDelete = async () => {
        await deleteProjects([testProjectId]);
        const projects = await getProjects(utils.userId);
        const folders = await getFolders(testProjectId);
        await deleteFolders(folders.map(({ itemId }) => itemId));

        console.log({ projects, folders: await getFolders(testProjectId) });
    };

    return (
        <div>
            <h1>Firebase Utilities</h1>
            <h2>FireStore CRUD</h2>
            <pre>Testing UserId: {utils.userId}</pre>
            <pre>Testing ProjectId: {testProjectId}</pre>
            <button onClick={handleFireStoreGet}>Get</button>
            <button onClick={handleFireStoreCreate}>Add</button>
            <button onClick={handleFireStoreUpdate}>Update</button>
            <button onClick={handleFireStoreDelete}>Delete</button>
        </div>
    );
}

export default App;
