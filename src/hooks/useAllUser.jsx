import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllUser = () => {
    const axiosSecure = useAxiosSecure();
  
    const { data: allUser, isLoading, error, refetch } = useQuery({
      queryKey: ['allUser'],
      queryFn: async () => {
        const res = await axiosSecure.get("/users/all");
        return res.data;
      },
    });
  
    return [allUser, isLoading, error, refetch];
  };

export default useAllUser;