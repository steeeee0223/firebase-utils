import { usePermissions } from "./usePermissions";

interface Props {
    profileId: string;
}

const PermissionsContainer = ({ profileId }: Props) => {
    const { permissions, isLoading } = usePermissions(profileId);

    if (isLoading) return <div>Loading Permissions</div>;

    return (
        <ul>
            {permissions.map((p: string) => (
                <li key={p}>{p}</li>
            ))}
        </ul>
    );
};

export default PermissionsContainer;
