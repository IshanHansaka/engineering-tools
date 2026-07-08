export function getProjectFieldValue(
    item: any,
    fieldName: string
) {

    const field =
        item.fields?.find(
            (f: any) =>
                f.name.toLowerCase() ===
                fieldName.toLowerCase()
        );


    return field?.value;
}