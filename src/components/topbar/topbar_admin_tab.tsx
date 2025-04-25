interface Props {
  role: number | undefined;
}

const AdministratorTab: React.FC<Props> = ({ role }) => {
  if (role === null || role === 0) {
    return <div />;
  }
  return (
    <>
      <a
        href="/addStory"
        className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700"
      >
        Add Story
      </a>
      <a
        href="/addCategory"
        className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700"
      >
        Add Category
      </a>
    </>
  );
};

export default AdministratorTab;
