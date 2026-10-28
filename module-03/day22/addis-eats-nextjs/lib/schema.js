export function validateOrder(data) {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = ["Please enter a valid name"];
    }

    if (!data.phone || !/^(\+?251|0)?9\d{8}$/.test(data.phone.replace(/\s+/g, ''))) {
        errors.phone = ["Use 09... or +2519..."];
    }

    if (!data.address || data.address.trim().length === 0) {
        errors.address = ["Please enter a delivery address"];
    }

    return {
        success: Object.keys(errors).length === 0,
        errors
    };
}