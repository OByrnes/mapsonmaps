

const GET_MARKERS = "maps/GET_USER";

const getMarkers = (markers) => ({
    type: GET_MARKERS,
    markers
})

export const getAllMarkers = () => async (dispatch) => {
    const response = await fetch(`/api/maps/markers`);
  
    if (response.ok) {
      const data = await response.json();
      dispatch(getMarkers(data));
    }
  };

let initialState= null
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case GET_MARKERS:
            return {markers: action.markers}
        default:
            return state;
    }
}