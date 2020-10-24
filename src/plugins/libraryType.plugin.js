export default function() {
    const validLibraryTypes = ["object", 'function-sync', 'function-async'];
    let libraryType = "object";

    return {
        onInit(config) {

        },
        resolve(val) {
            if (val == 'object')
                return;
        }
    }
}