import React, { useEffect, useRef } from "react"
import { LocationData } from "../types/types"

interface SuggestedAddressListProps {
  suggestedAddress: LocationData[]
  selectedAddressHandler: (address: LocationData) => void
  onClose: () => void
}

export const SuggestedAddressList: React.FC<SuggestedAddressListProps> = ({ suggestedAddress, selectedAddressHandler, onClose }) => {
  const ulRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ulRef.current && !ulRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return <ul ref={ulRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
    {suggestedAddress.map((address) =>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" key={address.extra.id}
        onClick={() => selectedAddressHandler(address)}>
        {address.formattedAddress}
      </li>
    )}
  </ul>
}