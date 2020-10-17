export default function() {
    const validLibraryTypes = ["object", 'function-sync', 'function-async'];
    let libraryType = "object";

    return {
        init(config) {

        },
        resolve(val) {
            if (val == 'object')
                return;
        }
    }
}