
export function validateBDPhoneNumber(phoneNumber) {
    const bdPhoneRegex = /^(?:\+880)1[3-9]\d{8}$/;
    return bdPhoneRegex.test(phoneNumber);
}
export function validateBloodGroup(bloodGroup) {
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/;
    return bloodGroupRegex.test(bloodGroup);
}