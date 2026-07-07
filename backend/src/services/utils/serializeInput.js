function serializeValue(value, language) {

    if (typeof value === "string") {
        return `"${value}"`;
    }

    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }

    if (Array.isArray(value)) {

        switch (language) {

            case "cpp":
                return `{${value.join(", ")}}`;

            case "python":
                return `[${value.join(", ")}]`;

            case "java":
                return `new int[]{${value.join(", ")}}`;

            default:
                return JSON.stringify(value);

        }

    }

    return value;
}

function serializeInput(input, language) {

    return Object.values(input)
        .map(value => serializeValue(value, language))
        .join(", ");

}

module.exports = serializeInput;