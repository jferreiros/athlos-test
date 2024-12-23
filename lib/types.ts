export interface Accommodation {
  id: string;
  name: string;
  location: string;
  category: number;
  thumbnail: string;
  type: string;
  athlos_stamp: boolean;
  is_prioritary: boolean;
  num_of_rooms: number;
  photos: string[];
}

export interface AccommodationDetails extends Accommodation {
  address: string;
  description: string;
  photos: string[];
  contact_phone: string;
  contact_email: string;
}
