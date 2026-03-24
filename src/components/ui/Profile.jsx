// components/ProfileInfo.jsx

export default function ProfileInfo({ user }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.avatar || "/default-avatar.png"}
        referrerPolicy="no-referrer"
        className="w-8 h-8 rounded-full object-cover"
      />
      <p className="text-sm font-semibold">
        {user?.name || user?.email}
      </p>
    </div>
  );
}