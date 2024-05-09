export interface Accommodation {
    id: number;
    city_id: number;
    name: string;
    description: string;
    featured: number; // ili boolean, zavisno od toga kako ga tretirate
    imageUrl: string;
    priceFrom: number;
    numberOfNights: number;
    available: number; // ili boolean
    priceListImageUrl: string;
    notIncluded: string | null;
  }
 