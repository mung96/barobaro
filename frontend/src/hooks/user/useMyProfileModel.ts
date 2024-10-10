// import { getProfile } from "@/apis/profileApi";
// import { useProfileSet } from "@/store/useMyProfile";
// import { useEffect } from "react";

// export const useMyProfileModel = () =>{
//     const setProfile = useProfileSet();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const profileResponse = await getProfile();

//         setProfile({
//           id: decoded.sub!,
//           profileImage: profileResponse.data.body.profileImage,
//           nickname: profileResponse.data.body.nickname,
//           phoneNumber: profileResponse.data.body.phoneNumber,
//           email: profileResponse.data.body.email,
//           name: profileResponse.data.body.name,
//           isAuthenticated: profileResponse.data.body.isAuthenticated,
//         });
//       } catch (error) {
//         if (error instanceof AxiosError) {
//           alert(error.response?.data.header.message);
//         }
//       }
//     };
//     fetchData();
//   }, []);
// }

// export default useMyProfileModel;
