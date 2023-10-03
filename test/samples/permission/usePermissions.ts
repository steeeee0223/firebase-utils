import { useEffect, useState } from "react";
import fetchPermissions from "./fakeAPI";

export function usePermissions(profileId: string) {
    const [permissions, setPermissions] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const data = await fetchPermissions(profileId);
            setPermissions(data);
            setIsLoading(false);
        }
        fetch();
    }, [profileId]);

    return { permissions, isLoading };
}
