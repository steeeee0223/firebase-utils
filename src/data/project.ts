import { CreatedBy, Project } from "@/schemas";
type Template = {
    value: string;
    label: string;
    image?: string;
};

export const tableTitle = "Projects";

export const projectTemplates: Template[] = [
    { value: "static", label: "Blank" },
    { value: "angular", label: "Angular" },
    { value: "solid", label: "Solid" },
    { value: "test-ts", label: "Test Typescript" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla-ts", label: "Vanilla Typescript" },
    { value: "node", label: "NodeJS" },
    { value: "nextjs", label: "Next.js" },
    { value: "vite", label: "Vite" },
    { value: "vite-react", label: "React" },
    { value: "vite-react-ts", label: "React Typescript" },
    { value: "vite-vue", label: "Vue" },
    { value: "vite-vue-ts", label: "Vue Typescript" },
    { value: "vite-svelte", label: "Svelte" },
    { value: "vite-svelte-ts", label: "Svelte Typescript" },
    { value: "astro", label: "Astro" },
];

function createData(
    projectId: string,
    name: string,
    template: Template
): Project {
    return {
        projectId,
        name,
        tags: [template.label],
        template: template.value,
        createdBy: sampleUser,
        lastModifiedAt: new Date(),
    };
}
export const sampleUser: CreatedBy = {
    uid: "admin",
    email: "admin@example.com",
    displayName: "Admin",
};

export const sampleProjects: Project[] = [
    createData("1", "Sample React", { label: "React", value: "react" }),
    createData("2", "Sample Node", { label: "NodeJs", value: "node" }),
    createData("3", "Sample React Typescript", {
        label: "React TypeScript",
        value: "react-ts",
    }),
];
