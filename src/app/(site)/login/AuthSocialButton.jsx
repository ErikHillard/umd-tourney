export default function AuthSocialButton({ statement, icon, onClick }) {
  const Icon = icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
        "
    >
      <div className="flex flex-row flex-nowrap gap-3">
        <span>{statement}</span><Icon />
      </div>
    </button>
  );
}