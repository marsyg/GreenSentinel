import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function MapComponent({
	searchType = "name",
	place = "bpit+rohini+new+delhi",
	coordinates = { lat: "27.1751", lng: "78.0421" },
}: any) {
	console.log(searchType, place, coordinates);
	return (
		<GoogleMapsEmbed
			apiKey="AIzaSyAxt1qSodP30NyXEPnAv_WBwl48uSLoS08"
			height={800}
			width="100%"
			// mode="place"
			// mode="view"
			// q="Brooklyn+Bridge,New+York,NY"
			// q="iiit+delhi+New+Delhi"
			// center={`${coordinates.lat},${coordinates.long}`}
			mode={searchType === "name" ? "place" : "view"}
			zoom="16"
			maptype="satellite"
			{...(searchType === "name"
				? { q: place }
				: { center: `${coordinates.lat},${coordinates.lng}` })}
		/>
	);
}
