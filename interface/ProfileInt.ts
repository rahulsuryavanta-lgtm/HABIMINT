export interface SignInStep_Int {
    mark: "LOGIN" | "OTP"
    userData: Authenticate_Int
}

export interface Authenticate_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    email: string
    phone_code: string
    phone_number: string
    password: string
    google_id: string
    is_subscribe_newsletter: number
    deletedAt: string
}


export interface UserCookieData_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    email: string
    phone_code: string
    phone_number: string
    password: string
    login_token: string
    google_id: string
    deletedAt: string
    is_subscribe_newsletter: number
    CustomerAddresses: CustomerAddress_Int[]
}

export interface CustomerAddress_Int {
    id: number
    createdAt: string
    updatedAt: string
    customer_id: number
    address: string
    city: string
    pin_code: string
    state: string
    country: string
    latitude: string
    longitude: string
    is_default: number
    status: number
    deletedAt: string
    address_type: string
}

export interface AddressModal_Int {
    open: boolean;
    address: any;
    type: "ADD" | "EDIT";
}

export interface CartAddressModal_Int {
    open: boolean;
    address: CustomerAddress_Int[];
}