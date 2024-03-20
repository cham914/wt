export function verifyCreditCardNumber(cardNumber: string): boolean {
    // Remove any non-digit characters
    const sanitizedNumber: string = cardNumber.replace(/\D/g, '');

    // Check if the number is of valid length
    if (sanitizedNumber.length !== 16) {
        return false;
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(sanitizedNumber)) {
        return false;
    }

    // Luhn algorithm check
    let sum = 0;
    let double = false;
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedNumber.charAt(i), 10);
        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        double = !double;
    }
    return sum % 10 === 0;
}
