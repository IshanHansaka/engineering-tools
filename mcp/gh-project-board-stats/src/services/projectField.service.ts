export function getFieldId(
    projectFields: any[],
    fieldName: string
): string {

    const field = projectFields.find(
        (f: any) =>
            f.name.toLowerCase() === fieldName.toLowerCase()
    );

    if (!field) {
        throw new Error(`Field '${fieldName}' not found.`);
    }

    return String(field.id);
}