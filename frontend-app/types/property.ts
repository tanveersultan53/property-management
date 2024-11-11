export interface Property {
    id?: number;
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_feet: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    property_type: 'HOUSE' | 'APARTMENT' | 'CONDO' | 'TOWNHOUSE';
    is_available: boolean;
    created_at?: string;
    updated_at?: string;
  }
  
  export const PROPERTY_TYPES = [
    { value: 'HOUSE', label: 'House' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'CONDO', label: 'Condo' },
    { value: 'TOWNHOUSE', label: 'Townhouse' },
  ];