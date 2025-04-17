export interface UserPayload {
    id: number,
    name: string,
    role: "CUSTOMER" | "EVENT_ORGANIZER"
}

export interface UserRegister {
    name: string,
    email: string,
    password: string,
    role : 'CUSTOMER' | 'EVENT_ORGANIZER',
    refferalCode? : string
}