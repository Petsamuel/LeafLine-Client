import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import Favorite from "../Favorite/Favorite";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  // const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const getToken = localStorage.getItem("userInfo");
    const token = getToken ? getToken.replace(/["']/g, "") : "";

    fetch(`${apiBaseDomain}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          toast.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiBaseDomain]);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgba(106, 89, 187, 0.888)",
  };

  if (loading) {
    return (
      <div>
        {" "}
        <ClipLoader
          color={"rgba(106, 89, 187, 0.888)"}
          loading={loading}
          cssOverride={override}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!userData) {
    // Handle the case when userData is still null (optional)
    return null;
  }

  // Once data is available, render the user profile
  return (
    <div>
      <div className="flex justify-center mb-4">
        <img
          src={userData.avatar}
          alt={userData.full_name}
          className="w-32 h-32 rounded-full border-4"
        />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">
        {userData.isVerified && (
          <div className="flex items-center justify-center">
            <span className="mr-1 mb-3">{userData.full_name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="text-blue-500" // Apply blue color using a CSS class
            >
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
          </div>
        )}
      </h2>
      <Favorite />
    </div>
  );
}

export default Profile;
