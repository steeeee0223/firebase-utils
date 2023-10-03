import { createAsyncThunk, Update } from "@reduxjs/toolkit";
// import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

import { sampleProjects } from "@/data";
import { getRefId } from "@/lib/file";
import { CreatedBy, Project } from "./project";
import { ProjectState, projectSelector } from "./project.slice";
import {
    createProject,
    deleteFiles,
    deleteFolders,
    deleteProjects,
    getFiles,
    getFolders,
    getProjects,
    updateProject,
} from "@/lib/db";
import { deleteRef, renameRef } from "@/lib/db/storage";
// import { configureTemplateAsync } from "../directory";

export const createProjectAsync = createAsyncThunk<
    Project,
    { user: CreatedBy; data: any }
>("project/createProjectAsync", async ({ user, data }, { dispatch }) => {
    const project = await createProject({ ...data, createdBy: user });
    //projectsDB.create({ ...data, createdBy: user });

    /** Fetch default files from Sandpack templates */
    // const { SANDBOX_TEMPLATES } = await import("@codesandbox/sandpack-react");
    // const { files } =
    //     SANDBOX_TEMPLATES[data.template as SandpackPredefinedTemplate];

    // dispatch(configureTemplateAsync({ project, files: [] }));
    return project;
});

export const getProjectsAsync = createAsyncThunk(
    "project/getProjectsAsync",
    async (userId: string) => {
        const projects = await getProjects(userId);
        return projects.concat(sampleProjects);
    }
);

export const deleteProjectsAsync = createAsyncThunk<
    string[],
    {
        userId: string;
        projectIds: string[];
    },
    {
        state: { project: ProjectState };
    }
>("project/deleteProjectsAsync", async ({ projectIds }, { getState }) => {
    await deleteProjects(projectIds);
    projectSelector
        .selectAll(getState().project)
        .filter(({ projectId }) => projectIds.includes(projectId))
        .forEach(async (project) => {
            const { projectId } = project;

            /** delete folders from Firebase */
            const folderIds = (await getFolders(projectId)).map(
                ({ itemId }) => itemId
            );
            await deleteFolders(folderIds);

            /** delete files from Firebase */
            const files = await getFiles(projectId);
            const fileIds = files.map(({ itemId }) => itemId);
            await deleteFiles(fileIds);

            /** delete files from FireStore */
            const refPath = getRefId(project);
            await deleteRef(refPath);
        });

    return projectIds;
});

export const renameProjectAsync = createAsyncThunk<
    Update<Project>,
    { projectId: string; name: string },
    {
        state: { project: ProjectState };
    }
>("project/renameProjectAsync", async ({ projectId, name }, { getState }) => {
    await updateProject(projectId, { name });

    const { name: srcName } = projectSelector.selectById(
        getState().project,
        projectId
    )!;
    await renameRef(`${srcName}-${projectId}`, `${name}-${projectId}`, true);
    return { id: projectId, changes: { name } };
});
