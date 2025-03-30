interface Props {
  role: string | undefined;
}

const AdministratorTab: React.FC<Props> = ({ role }) => {
  if (role == null || role !== "Administrator") {
    return <div />;
  }
  return (
    <a
      href="/addStory"
      className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700"
    >
      Add Story
    </a>
  );
};

export default AdministratorTab;
