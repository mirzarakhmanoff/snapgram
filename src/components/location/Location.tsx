import { useState, useEffect } from "react";

interface GeoTyes {
  latitude: number;
  longitude: number;
  city: string;
}

// interface GeoHelperType {
//   types: string[];
// }
const LocationDisplay = () => {
  const [location, setLocation] = useState<GeoTyes>({
    latitude: 0,
    longitude: 0,
    city: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
          // Fetch the city name using the coordinates
          fetchCityName(latitude, longitude);
        },
        (err) => {
          setError("Unable to retrieve location");
          console.error("Error getting location: ", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  }, []);

  const fetchCityName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      console.log(data);

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown location";
      setLocation((prevState) => ({
        ...prevState,
        city,
      }));
    } catch (err) {
      setError("Failed to fetch city name");
      console.error("Error fetching city name: ", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h3>Your Location Information</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <>
          <p>
            <strong>Latitude:</strong> {location.latitude || "Fetching..."}
          </p>
          <p>
            <strong>Longitude:</strong> {location.longitude || "Fetching..."}
          </p>
          <p>
            <strong>City:</strong> {location.city || "Fetching..."}
          </p>
        </>
      )}
    </div>
  );
};

export default LocationDisplay;
