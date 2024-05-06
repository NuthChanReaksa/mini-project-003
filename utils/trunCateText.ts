export const trunCateText =
    (str: string) => {
    if (str.length < 25) {
        return str.substring(0, 25) +
            "...";
    }
}