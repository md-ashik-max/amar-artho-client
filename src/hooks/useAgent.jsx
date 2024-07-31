import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAgent = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isAgent, isLoading: isAgentLoading } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/agent/${user.email}`);
            return res.data?.agent;
        },
        enabled: !!user?.email
    });

    return [isAgent, isAgentLoading];
};

export default useAgent;
