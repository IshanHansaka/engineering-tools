import process from "process";
import {
    getIterationValue,
    isCurrentIteration
} from "../services/iteration.service";
import { getFieldId } from "../services/projectField.service";
import { isRelease, belongsToFunction }
    from "../services/release.service";

export async function runTool(client: any, route: any) {
    const personalOwner = process.env.USERNAME;
    const personalProjectNumber = Number(process.env.PROJECT_ID);

    const fieldsResult = await client.callTool({
        name: "projects_list",
        arguments: {
            method: "list_project_fields",
            owner: personalOwner,
            project_number: personalProjectNumber
        }
    });

    const fieldsText =
        fieldsResult.content
            ?.map((c: any) => c.text)
            .join("\n") ?? "";

    const projectFields = JSON.parse(fieldsText);

    const iterationFieldId =
        getFieldId(
            projectFields.fields,
            "Iteration"
        );

    const result = await client.callTool({
        name: "projects_list",
        arguments: {
            method: "list_project_items",
            owner: personalOwner,
            project_number: personalProjectNumber,
            per_page: 50,
            fields: [iterationFieldId]
        }
    });


    const text = result.content?.map((c: any) => c.text).join("\n") ?? "";
    if (!text) return { error: "No data returned from MCP" };

    const rawData = JSON.parse(text);
    const items = rawData.items ?? [];

    const releases = items.filter(
        (item: any) => {

            const iteration =
                getIterationValue(item);


            return (
                isCurrentIteration(iteration)
                &&
                isRelease(item)
                &&
                (
                    !route.args.function ||
                    belongsToFunction(
                        item,
                        route.args.function
                    )
                )
            );
        }
    );

    return releases;
}
