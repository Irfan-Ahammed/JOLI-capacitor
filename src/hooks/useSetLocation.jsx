import { setLocation } from '@/redux/locationSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function useSetLocation() {
    const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.locations); // Get locations from Redux

  useEffect(() => {
    const fetchLocationAPI = async () => {
      if (query.length > 2) {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          dispatch(setLocation(res.data));
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(setLocation([]));
      }
    };

    fetchLocationAPI();
  }, [query, dispatch]);

}

export default useSetLocation