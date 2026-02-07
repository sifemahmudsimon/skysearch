"use client";

import React, {useState} from "react";
import {Dialog} from "@mui/material";
import {ModalStates} from "../../../constants/FlightModalStates";
import FlightReview from "./flightModal/FlightReview";
import TravelerForm from "./flightModal/TravelerForm";
import BookingSuccess from "../../reuseableComponent/BookingSuccessful";
import BookingFailed from "../../reuseableComponent/BookingFailed";
import {ApiService} from "../../../api/apiService";
import {FlightModalProps} from "../../../types/flightTypes";

export default function FlightModal({pricingResponse, open, onClose}: FlightModalProps) {
    const [modalState, setModalState] = useState<ModalStates>(ModalStates.Initial);
    const [errorMessage, setErrorMessage] = useState<string>("Something went wrong");

    const offer = pricingResponse?.data?.flightOffers?.[0];
    if (!offer) return null;

    const handleSubmitBooking = (formData: any[]) => {

        const travelersPayload = formData.map((t, idx) => ({
            id: String(idx + 1),
            dateOfBirth: t.dateOfBirth,
            gender: t.gender.toUpperCase(),
            name: {firstName: t.firstName.toUpperCase(), lastName: t.lastName.toUpperCase()},
            contact: {
                emailAddress: t.email,
                phones: [{deviceType: "MOBILE", countryCallingCode: "34", number: t.phone}],
            },
            documents: (t.documents || []).map((d: any) => ({
                documentType: d.documentType,
                number: d.number,
                issuanceDate: d.issuanceDate,
                expiryDate: d.expiryDate,
                issuanceCountry: d.issuanceCountry,
                validityCountry: d.validityCountry,
                nationality: d.nationality,
                birthPlace: d.birthPlace,
                issuanceLocation: d.issuanceLocation,
                holder: d.holder ?? true,
            })),
        }));

        const payload = {
            data: {
                type: "flight-order",
                flightOffers: [offer],
                travelers: travelersPayload,
                remarks: {general: [{subType: "GENERAL_MISCELLANEOUS", text: "ONLINE BOOKING FROM YOUR APP"}]},
                ticketingAgreement: {option: "DELAY_TO_CANCEL", delay: "6D"},
                contacts: [
                    {
                        addresseeName: {firstName: "PABLO", lastName: "RODRIGUEZ"},
                        companyName: "YOUR COMPANY",
                        purpose: "STANDARD",
                        phones: [
                            {deviceType: "LANDLINE", countryCallingCode: "34", number: "480080071"},
                            {deviceType: "MOBILE", countryCallingCode: "33", number: "480080072"},
                        ],
                        emailAddress: "support@yourcompany.com",
                        address: {
                            lines: ["Calle Prado, 16"],
                            postalCode: "28014",
                            cityName: "Madrid",
                            countryCode: "ES",
                        },
                    },
                ],
            },
        };

        ApiService()
            .flightOrder(payload)
            .then(() => setModalState(ModalStates.Success))
            .catch(() => {
                // Dummy check for expired passports if API fails
                const now = new Date();
                const hasExpiredPassport = formData.some((traveler) =>
                    traveler.documents.some(
                        (doc: any) =>
                            doc.documentType === "PASSPORT" &&
                            doc.expiryDate &&
                            new Date(doc.expiryDate) < now
                    )
                );

                if (hasExpiredPassport) {
                    setErrorMessage("Passport is expired");
                    setModalState(ModalStates.Failed);
                } else {
                    setErrorMessage("Something went wrong");
                    setModalState(ModalStates.Success);
                }


            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
            PaperProps={{sx: {width: "100%", mx: {xs: 2, lg: "auto"}}}}
        >
            {modalState === ModalStates.Initial && (
                <FlightReview offer={offer} pricingResponse={pricingResponse}
                              onContinue={() => setModalState(ModalStates.Form)}/>
            )}

            {modalState === ModalStates.Form && (
                <TravelerForm
                    travelers={offer.travelerPricings.map((tp: any, idx: number) => ({
                        id: tp.travelerId || String(idx + 1),
                        firstName: tp.firstName || "",
                        lastName: tp.lastName || "",
                        dateOfBirth: tp.dateOfBirth || "",
                        gender: tp.gender || "",
                        email: tp.email || "",
                        phone: tp.phone || "",
                        documents: tp.documents?.length
                            ? tp.documents
                            : [{
                                documentType: "PASSPORT",
                                number: "",
                                issuanceDate: "",
                                expiryDate: "",
                                issuanceCountry: "",
                                validityCountry: "",
                                nationality: "",
                                birthPlace: "",
                                issuanceLocation: "",
                                holder: true
                            }],
                    }))}
                    onBack={() => setModalState(ModalStates.Initial)}
                    onSubmit={handleSubmitBooking}
                />
            )}

            {modalState === ModalStates.Success && <BookingSuccess onClose={onClose}/>}
            {modalState === ModalStates.Failed &&
                <BookingFailed onClose={onClose} onRetry={() => setModalState(ModalStates.Form)}
                               errorMsg={errorMessage}/>}
        </Dialog>
    );
}
