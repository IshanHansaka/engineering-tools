import { getProjectFieldValue }
    from "./projectItem.service";


export function isRelease(item: any) {

    const labels =
        item.content?.labels ?? [];


    return labels.some(
        (label: string) =>
            label
                .toLowerCase()
                .includes("new feature")
    );
}

export function belongsToFunction(
    item: any,
    functionName: string
) {

    const functionValue =
        getProjectFieldValue(
            item,
            "Function"
        );


    if (!functionValue) {
        return false;
    }


    return (
        String(functionValue)
            .toLowerCase()
        ===
        functionName.toLowerCase()
    );
}