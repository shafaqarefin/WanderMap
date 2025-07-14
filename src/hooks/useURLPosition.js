import { useSearchParams } from "react-router-dom";
import { normalizeLng } from "../utils/normalizeLng";

function useURLPosition() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = normalizeLng(Number(searchParams.get("lng")));

  return [lat, lng];
}

export default useURLPosition;
