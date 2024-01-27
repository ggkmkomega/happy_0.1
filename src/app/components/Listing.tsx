import { type listing } from "~/types";
type listingProps = {
  listing: listing;
};

export default function Listing({ listing }: listingProps) {
  const { name, description, address } = listing;

  return (
    <div className="text-white">
      <h5>{name}</h5>
      <h6>{address}</h6>
      <p>{description}</p>
    </div>
  );
}
