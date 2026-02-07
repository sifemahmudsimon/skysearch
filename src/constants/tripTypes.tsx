export enum TripType {
    ROUNDTRIP = "roundtrip",
    ONEWAY = "oneway"
}

export const TripTypeLabels: Record<TripType, string> = {
    [TripType.ROUNDTRIP]: "Round Trip",
    [TripType.ONEWAY]: "One Way"
};

export enum TravelClass {
    ECONOMY = "ECONOMY",
    BUSINESS = "BUSINESS",
    FIRST = "FIRST",
}

export const TravelClassLabels: Record<TravelClass, string> = {
    [TravelClass.ECONOMY]: "Economy",
    [TravelClass.BUSINESS]: "Business",
    [TravelClass.FIRST]: "First",
};