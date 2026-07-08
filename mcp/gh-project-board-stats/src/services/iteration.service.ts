import { getProjectFieldValue }
    from "./projectItem.service";


export function getIterationValue(item: any) {

    return getProjectFieldValue(
        item,
        "Iteration"
    );
}

export function isCurrentIteration(
    iteration: any
) {

    if (!iteration) {
        return false;
    }

    const today = new Date();

    const start = new Date(
        iteration.start_date
    );

    const end = new Date(start);

    end.setDate(
        start.getDate() + iteration.duration - 1
    );


    return (
        today >= start &&
        today <= end
    );
}