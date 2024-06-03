import { type LucideIcon } from "lucide-react";
import { Icons } from "~/_components/icons";

export interface Amenity {
  id: number;
  name: string;
  icon: LucideIcon;
}

export const amenities: Amenity[] = [
  {
    id: 1,
    name: "Wi-Fi",
    icon: Icons.wifi,
  },
  {
    id: 2,
    name: "TV",
    icon: Icons.tv,
  },
  {
    id: 3,
    name: "Kitchen",
    icon: Icons.kitchen,
  },
  {
    id: 4,
    name: "Air Conditioning",
    icon: Icons.ac,
  },
  {
    id: 5,
    name: "Heating",
    icon: Icons.heating,
  },
  {
    id: 6,
    name: "Free Parking",
    icon: Icons.parking,
  },
  {
    id: 7,
    name: "Gym",
    icon: Icons.gym,
  },
  {
    id: 8,
    name: "Pool",
    icon: Icons.pool,
  },
  {
    id: 9,
    name: "Garden",
    icon: Icons.Garden,
  },
  {
    id: 10,
    name: "Pet Friendly",
    icon: Icons.petFriendly,
  },
  {
    id: 11,
    name: "Smoking Area",
    icon: Icons.smoking,
  },
  {
    id: 12,
    name: "Handicap Spot",
    icon: Icons.wheelchair,
  },
  {
    id: 13,
    name: "Laundry",
    icon: Icons.laundry,
  },
];

export default amenities;
