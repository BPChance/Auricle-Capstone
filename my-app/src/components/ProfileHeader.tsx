interface ProfileHeaderProps {
  username: string;
  email?: string;
  loading: boolean;
}

export const ProfileHeader = ({ username, email, loading }: ProfileHeaderProps) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      {loading ? "Loading..." : username || "User"}
    </h1>
    <p className="text-gray-400 text-sm">
      {email || "No email"}
    </p>
  </div>
);