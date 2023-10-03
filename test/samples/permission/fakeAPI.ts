const permissionsMap: Record<string, Array<string>> = {
    "1234-fake-4567-uuid": ["read", "write", "create"],
    "4839-fake-9344-uuid": ["read"],
};

export default async function fetchPermissions(
    profileId: string
): Promise<Array<string>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(permissionsMap[profileId]);
        }, 100);
    });
}
