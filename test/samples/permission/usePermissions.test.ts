import { renderHook, waitFor } from "@testing-library/react";
import { usePermissions } from "./usePermissions";

describe("usePermissions", () => {
    test("returns isLoading true while the component is loading", async () => {
        const { result } = renderHook(() =>
            usePermissions("1234-fake-4567-uuid")
        );
        expect(result.current.isLoading).toEqual(true);
        expect(result.current.permissions).toEqual([]);

        await waitFor(() => expect(result.current.isLoading).toEqual(false));

        expect(result.current.permissions).toEqual(["read", "write", "create"]);
    });
});
