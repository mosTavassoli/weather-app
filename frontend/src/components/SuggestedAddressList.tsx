import React from "react"
import { LocationData } from "../types/types"

interface SuggestedAddressListProps {
  suggestedAddress: LocationData[]
  selectedAddressHandler: (address: LocationData) => void
}

export const SuggestedAddressList: React.FC<SuggestedAddressListProps> = ({ suggestedAddress, selectedAddressHandler }) => {
  return <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ">
    {suggestedAddress.map((address) =>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" key={address.extra.id}
        onClick={() => selectedAddressHandler(address)}>
        {address.formattedAddress}
      </li>
    )}
  </ul>
}