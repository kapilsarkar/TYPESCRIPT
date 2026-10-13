// ---------------------------------------------------------------
// Enums
// A group of named constants.
// A TypeScript special feature: not available in plain JavaScript
// (the compiler converts it into an object in the JS output).
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 1. Numeric enum
// Members hold numbers. You can set values yourself.
// If a member has no value, it auto-increments from the previous
// one: RIGHT becomes 31 (LEFT is 30 + 1).
// Without any values, numbering starts at 0.
// ---------------------------------------------------------------
enum Direction {
    UP = 10,
    DOWN = 20,
    LEFT = 30,
    RIGHT,
}

// ---------------------------------------------------------------
// 2. const enum
// Same as an enum, but fully removed at compile time: usages are
// replaced by the actual values. Faster and smaller output, but no
// enum object exists at runtime (so you cannot loop over it).
// Here the string values are used (a string enum).
// ---------------------------------------------------------------
const enum Name {
    firstName = "Kapil",
    lastName = "Sarkar"
}

console.log(Name.firstName);
console.log(Name.lastName);

// ---------------------------------------------------------------
// 3. Using an enum as a parameter type
// `direction: Direction` allows only values from the Direction
// enum. This avoids typos and "magic numbers" like 10 or 20.
// ---------------------------------------------------------------
function getUserDirection(direction: Direction): void {

    if (direction === Direction.UP) {
        console.log("You are going UP");
    } else if (direction === Direction.DOWN) {
        console.log("You are going DOWN");
    } else if (direction === Direction.LEFT) {
        console.log("You are going LEFT");
    } else if (direction === Direction.RIGHT) {
        console.log("You are going RIGHT");
    } else {
        console.log("Invalid direction");
    }
}

getUserDirection(Direction.UP);

// ---------------------------------------------------------------
// 4. String enum
// Every member must be given a string value (no auto-increment).
// Values are readable in logs and debugging, so string enums are
// often preferred for things like statuses.
// ---------------------------------------------------------------
enum OrderStatus {
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED",
    PENDING = "PENDING",
}

// Only a valid OrderStatus can be passed in.
function generateMessageForUsers(status: OrderStatus): void {
    if (status === OrderStatus.DELIVERED) {
        console.log("SuccessFully Delivered");
    }
}

generateMessageForUsers(OrderStatus.DELIVERED);

// Accessing enum members: EnumName.MemberName gives its value.
console.log(Direction.UP);          // 10
console.log(Direction.DOWN);        // 20
console.log(OrderStatus.DELIVERED); // "DELIVERED"
console.log(OrderStatus.CANCELLED); // "CANCELLED"