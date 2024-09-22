import { MdOutlineCameraAlt } from "react-icons/md";

const ProfilePicButton = () => {
  return (
    <div className="w-40 h-14 relative">

      <div className="h-14 w-14 rounded-full bg-blue-600 border-2 border-white">
        <img src="" alt="" />
      </div>

      <div className="flex h-6 gap-1 items-center absolute right-0 bottom-0 index-1 cursor-pointer">
        <div className="w-6 h-6 rounded-full shadow-sm shadow-gray-600 flex items-center justify-center bg-white">
          <MdOutlineCameraAlt className="bg-white text-emerald-700"/>
        </div>
        <p className="text-emerald-700 drop-shadow-[0_0.8px_1px_rgba(0,0,0,0.3)]">
          Carregar foto
        </p>
      </div>

    </div>
  );
}
 
export default ProfilePicButton;