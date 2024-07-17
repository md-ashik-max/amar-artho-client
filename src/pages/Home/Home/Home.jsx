import useAdmin from "../../../hooks/useAdmin";
import useAllUser from "../../../hooks/useAllUser";



const Home = () => {
    const [isAdmin] = useAdmin();
    const [allUser,isLoading,error] = useAllUser();
    // console.log(allUser)
    return (
        <div className="min-h-screen flex justify-center items-center">
            {isAdmin ? <h1>This is admin home</h1> : <h1>home</h1>}
            {isLoading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>Error fetching users: {error.message}</p>
            ) : (
                allUser.map((user) => (
                    <h1 key={user._id}>{user.name}</h1>
                ))
            )}
        </div>
    );
};

export default Home;